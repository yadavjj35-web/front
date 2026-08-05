import React from 'react';
import api from '../../services/api';
import { ENDPOINTS } from '../../constants/config';
import Button from '../../components/UI/Button';
import { useToast } from '../../components/Toast/ToastProvider';

export default function InvoiceDownload({ invoiceId }) {
  const { push } = useToast();

  async function download() {
    try {
      const res = await api.get(`${ENDPOINTS.billing}/invoices/${encodeURIComponent(invoiceId)}/download`, {
        responseType: 'blob'
      });
      const url = URL.createObjectURL(res.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice-${invoiceId}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      push({ title: 'Download failed', message: err.message || 'Unable to download invoice' });
    }
  }

  return <Button onClick={download}>Download Invoice</Button>;
}
