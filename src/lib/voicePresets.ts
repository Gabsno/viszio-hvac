// Voice presets combine an accent preference, speed and pitch into a named
// character. We try to pick a matching voice from the device's available
// voices at the moment the preset is applied — if the user's device doesn't
// have, say, an en-GB voice, the preset still applies its rate/pitch combo
// to the device default so the character still sounds distinct.

export type VoicePresetId =
  | 'narrator'
  | 'lecturer'
  | 'coach'
  | 'storyteller'
  | 'calm-guide'
  | 'bright-tutor';

export interface VoicePreset {
  id: VoicePresetId;
  label: string;
  description: string;
  // Ordered list of language codes to try.
  langPreference: string[];
  // Optional name-substring hints (case-insensitive) for picking a
  // particular voice within the matching language (e.g. male vs female).
  nameHints?: string[];
  rate: number;
  pitch: number;
}

export const VOICE_PRESETS: VoicePreset[] = [
  {
    id: 'narrator',
    label: 'Narrator (US)',
    description: 'Neutral American — balanced speed and pitch. The baseline.',
    langPreference: ['en-US', 'en'],
    rate: 1.0,
    pitch: 1.0,
  },
  {
    id: 'lecturer',
    label: 'Lecturer (UK)',
    description: 'British, slower and lower-pitched. Reads like a professor.',
    langPreference: ['en-GB', 'en'],
    nameHints: ['male', 'daniel', 'arthur', 'oliver', 'george'],
    rate: 0.88,
    pitch: 0.9,
  },
  {
    id: 'coach',
    label: 'Coach (US)',
    description: 'Faster, brighter American — energetic delivery for quick lessons.',
    langPreference: ['en-US', 'en'],
    nameHints: ['female', 'samantha', 'zira', 'jenny', 'aria'],
    rate: 1.18,
    pitch: 1.1,
  },
  {
    id: 'storyteller',
    label: 'Storyteller (UK)',
    description: 'British, normal pace, warmer higher pitch. Easy to follow.',
    langPreference: ['en-GB', 'en'],
    nameHints: ['female', 'kate', 'serena', 'martha', 'hazel'],
    rate: 1.0,
    pitch: 1.15,
  },
  {
    id: 'calm-guide',
    label: 'Calm Guide (AU)',
    description: 'Australian, slow and deep. Good for long focused reading.',
    langPreference: ['en-AU', 'en-GB', 'en'],
    rate: 0.82,
    pitch: 0.85,
  },
  {
    id: 'bright-tutor',
    label: 'Bright Tutor (IN)',
    description: 'Indian English, normal pace, slightly higher pitch. Clear consonants.',
    langPreference: ['en-IN', 'en-GB', 'en'],
    rate: 1.05,
    pitch: 1.1,
  },
];

export function getPreset(id: string): VoicePreset | undefined {
  return VOICE_PRESETS.find((p) => p.id === id);
}

// Pick the best available voice for a preset from the live voice list.
// Returns `${name}|${lang}` if a match is found, or '' to mean "use the
// system default with this preset's rate and pitch".
export function pickVoiceForPreset(
  preset: VoicePreset,
  voices: SpeechSynthesisVoice[],
): string {
  for (const lang of preset.langPreference) {
    const matching = voices.filter((v) =>
      v.lang.toLowerCase().startsWith(lang.toLowerCase()),
    );
    if (matching.length === 0) continue;
    if (preset.nameHints?.length) {
      for (const hint of preset.nameHints) {
        const found = matching.find((v) =>
          v.name.toLowerCase().includes(hint.toLowerCase()),
        );
        if (found) return `${found.name}|${found.lang}`;
      }
    }
    // Prefer local voices when multiple matches exist — they actually
    // sound distinct, online voices often collapse to a single default.
    const local = matching.find((v) => v.localService);
    const picked = local ?? matching[0];
    return `${picked.name}|${picked.lang}`;
  }
  return '';
}

// Check whether the current voice + rate + pitch match a known preset.
// We compare the language portion of the voice id (not the exact name)
// because the name match may have happened during preset selection and
// the lang is what carries the accent identity.
export function matchActivePreset(
  voiceId: string,
  rate: number,
  pitch: number,
): VoicePresetId | null {
  const voiceLang = voiceId.includes('|') ? voiceId.split('|')[1] : '';
  for (const p of VOICE_PRESETS) {
    if (Math.abs(p.rate - rate) > 0.01) continue;
    if (Math.abs(p.pitch - pitch) > 0.01) continue;
    if (!voiceLang) {
      // System default — only match presets that didn't pin a voice
      // (none of ours expect empty voice, so skip).
      continue;
    }
    const langOk = p.langPreference.some((l) =>
      voiceLang.toLowerCase().startsWith(l.toLowerCase()),
    );
    if (langOk) return p.id;
  }
  return null;
}
