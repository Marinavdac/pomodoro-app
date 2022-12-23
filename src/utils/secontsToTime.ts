export function secondsToTime(seconds: number): string {
  const zeroOnLeft = (n: number) => Math.floor(n).toString().padStart(2, '0');
  const min = zeroOnLeft(Math.floor(seconds / 60) % 60);
  const sec = zeroOnLeft(Math.floor(seconds % 60) % 60);
  return `${min}:${sec}`
}
