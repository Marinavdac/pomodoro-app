import { zeroToLeft } from "./zeroToLeft";

export function secondsToTime(seconds: number): string {
  const hours = zeroToLeft(seconds / 3600);
  const min = zeroToLeft((seconds / 60) % 60);
  const sec = zeroToLeft((seconds % 60) % 60);
  return `${hours}:${min}:${sec}`;
}
