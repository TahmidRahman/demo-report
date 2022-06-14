export function getInitialsFromName(firstName, lastName) {
  return [firstName, lastName]
    .map((str) => str.charAt(0).toUpperCase())
    .join('');
}

export function dateComparator(a, b) {
  if (new Date(a.created) > new Date(b.created)) {
    return 1;
  } else if (new Date(a.created) < new Date(b.created)) {
    return -1;
  } else {
    return 0;
  }
}

export function getGroupName(filterData) {
  if (filterData && !filterData.projectId && filterData.gatewayId) {
    return 'projectId';
  } else if (filterData && filterData.projectId && !filterData.gatewayId) {
    return 'gatewayId';
  } else {
    return '';
  }
}
