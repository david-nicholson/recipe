export default function stringSantiser(string) {
  if (!string) {
    return undefined;
  }
  return string.toLowerCase().replace(/[^\w-\s]/gi, '').replace(/ /gi, '-');
}
