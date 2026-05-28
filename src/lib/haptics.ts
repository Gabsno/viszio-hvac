// Lightweight haptic feedback helpers using the Web Vibration API.
// Silent no-op on browsers that don't support it (iOS Safari for now,
// most desktops). Respects the user's prefers-reduced-motion setting.

function reducedMotion(): boolean {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

function vibrate(pattern: number | number[]): void {
  if (reducedMotion()) return;
  try {
    navigator.vibrate?.(pattern);
  } catch {
    /* ignore */
  }
}

/** Short tap — used on correct answers, completed actions. */
export function tapSuccess(): void {
  vibrate(15);
}

/** Short double — used on wrong answers, errors. */
export function tapError(): void {
  vibrate([10, 40, 10]);
}

/** Long buzz — used on big rewards (level up, trophy unlock). */
export function tapReward(): void {
  vibrate([20, 30, 20, 30, 60]);
}

/** Subtle tick — used on navigation, item selection. */
export function tapClick(): void {
  vibrate(5);
}
