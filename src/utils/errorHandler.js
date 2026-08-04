export function extractError(err) {
  if (!err) return { message: 'Unknown error' };
  if (err.response && err.response.data) {
    return { message: err.response.data.message || JSON.stringify(err.response.data) };
  }
  if (err.message) return { message: err.message };
  return { message: String(err) };
}
