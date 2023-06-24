export function setConfig() {
  const token = sessionStorage.getItem('access_token');

  return {
    headers: { Authorization: `Bearer ${token}` },
  };
}
