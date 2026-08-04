import React, { useRef, useState } from 'react';
import UploadIcon from '../../icons/UploadIcon';
import api from '../../services/api';
import { ENDPOINTS } from '../../constants/config';

export default function FileUpload({ onDone, accept = '*/*', multiple = false }) {
  const ref = useRef();
  const [progress, setProgress] = useState(null);
  const [uploading, setUploading] = useState(false);

  async function handleFiles(files) {
    if (!files || files.length === 0) return;
    const fd = new FormData();
    Array.from(files).forEach((f) => fd.append('files', f));
    setUploading(true);
    try {
      const res = await api.post(ENDPOINTS.upload, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress(e) {
          if (e.total) setProgress(Math.round((e.loaded / e.total) * 100));
        }
      });
      onDone && onDone(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
      setProgress(null);
    }
  }

  return (
    <div>
      <div className="p-3 border rounded flex items-center gap-3">
        <button onClick={() => ref.current.click()} className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-700 rounded">
          <UploadIcon /> <span>Upload</span>
        </button>
        <input ref={ref} type="file" className="hidden" accept={accept} multiple={multiple} onChange={(e) => handleFiles(e.target.files)} />
        {uploading && <div className="text-sm text-slate-500">Uploading... {progress}%</div>}
      </div>
    </div>
  );
}
