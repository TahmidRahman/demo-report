export function getInitialsFromName(name) {
  return name
    .split(' ')
    .map((str) => str.charAt(0).toUpperCase())
    .join('');
}
