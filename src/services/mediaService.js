import api from './api';
import { ENDPOINTS } from '../constants/config';

export async function uploadAudio(blob, filename = 'voice.webm', onProgress) {
  const fd = new FormData();
  fd.append('files', blob, filename);
  const res = await api.post(ENDPOINTS.upload, fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress(e) {
      if (onProgress && e.total) onProgress(Math.round((e.loaded / e.total) * 100));
    }
  });
  return res.data;
}
