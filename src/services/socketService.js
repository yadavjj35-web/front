/**
 * socketService - lightweight WebSocket wrapper for realtime updates.
 * Uses native WebSocket. This is optional; backend must expose a socket endpoint.
 *
 * Usage:
 *   import socketService from './socketService';
 *   socketService.connect();
 *   socketService.on('event', handler);
 *   socketService.send({ type: 'ping' });
 */

const DEFAULT_URL = '';
let ws = null;
const listeners = new Map();

function connect(url = DEFAULT_URL) {
  if (ws) return;
  try {
    ws = new WebSocket(url);
    ws.onopen = () => emitLocal('_open');
    ws.onclose = () => { emitLocal('_close'); ws = null; };
    ws.onerror = (e) => emitLocal('_error', e);
    ws.onmessage = (m) => {
      try {
        const data = JSON.parse(m.data);
        emitLocal(data.type || '_message', data);
      } catch (err) {
        emitLocal('_message', m.data);
      }
    };
  } catch (err) {
    emitLocal('_error', err);
  }
}

function emitLocal(type, payload) {
  const arr = listeners.get(type) || [];
  arr.forEach((fn) => {
    try { fn(payload); } catch {}
  });
}

function on(type, fn) {
  const arr = listeners.get(type) || [];
  arr.push(fn);
  listeners.set(type, arr);
  return () => off(type, fn);
}

function off(type, fn) {
  const arr = listeners.get(type) || [];
  listeners.set(type, arr.filter((f) => f !== fn));
}

function send(msg) {
  if (!ws || ws.readyState !== WebSocket.OPEN) return false;
  const data = typeof msg === 'string' ? msg : JSON.stringify(msg);
  ws.send(data);
  return true;
}

function disconnect() {
  if (ws) {
    ws.close();
    ws = null;
  }
}

export default { connect, on, off, send, disconnect };
