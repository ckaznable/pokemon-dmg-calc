export function isValidNumberString (n: string): boolean {
  if(!n || +n < 0) {
    return false
  }

  if(isNaN(Number.parseInt(n))) {
    return false
  }

  return true
}