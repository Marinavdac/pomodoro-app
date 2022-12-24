import { zeroToLeft } from "./zeroToLeft";

export function secondsToMinutes(seconds: number): string {
  const min = zeroToLeft((seconds / 60) % 60);
  const sec = zeroToLeft((seconds % 60) % 60);
  return `${min}:${sec}`
}
