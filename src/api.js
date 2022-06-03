import { GATEWAY_URL, PROJECT_URL, REPORT_URL } from './contants';

export async function fetchAllGateways() {
  const res = await fetch(GATEWAY_URL);
  const json = await res.json();
  return json.data;
}

export async function fetchAllProjects() {
  const res = await fetch(PROJECT_URL);
  const json = await res.json();
  return json.data;
}

export async function fetchAllReports(filter) {
  const res = await fetch(REPORT_URL, {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(filter),
    method: 'POST'
  });
  const json = await res.json();
  return json.data;
}
