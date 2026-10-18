/**
 * Shared "the loader has opened" signal. The page intro (header slide-in, hero timeline) waits on it
 * so nothing plays unseen beneath the loading screen.
 */
let revealed = false;
const waiters = new Set<() => void>();

export function onReveal(fn: () => void) {
  if (revealed) fn();
  else waiters.add(fn);
  return () => void waiters.delete(fn);
}

export function reveal() {
  if (revealed) return;
  revealed = true;
  waiters.forEach((fn) => fn());
  waiters.clear();
}
