export function parseJwt(token: string | null) {
  if (typeof token !== 'string') return;

  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
}

export function getUserId(email: string) {
  if (email.includes('@')) {
    return email.split('@')[0];
  }
}
