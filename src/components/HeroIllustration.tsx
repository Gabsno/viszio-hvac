/**
 * Hero illustration — premium AI-generated isometric mechanical-room scene
 * (chiller, AHU, ductwork) in the app's teal/cyan + warm-orange palette,
 * with a faint blueprint grid background. Generated via Gemini Nano Banana
 * and shipped as a PNG in /public/illustrations/. Loaded lazily.
 */
export function HeroIllustration({ className = '' }: { className?: string }) {
  const base = import.meta.env.BASE_URL;
  return (
    <img
      src={`${base}illustrations/hero-mechanical-room.png`}
      alt="Isometric illustration of a mechanical room with a chiller, air handling unit and ductwork."
      loading="lazy"
      className={className}
      width={1280}
      height={720}
    />
  );
}
