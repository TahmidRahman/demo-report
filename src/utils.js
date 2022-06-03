export function getInitialsFromName(firstName, lastName) {
  return [firstName, lastName]
    .map((str) => str.charAt(0).toUpperCase())
    .join('');
}
