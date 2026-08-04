export function parseHttpError(err) {
  if (!err) return { message: 'Unknown error', status: 0 };
  if (err.response) {
    const { status, data } = err.response;
    const message = (data && (data.message || data.error || data.detail)) || err.message;
    return { status, message, details: data };
  }
  return { status: 0, message: err.message || String(err) };
}
