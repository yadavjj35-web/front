import React from 'react';

export default function PrintButton({ targetRef }) {
  function handlePrint() {
    if (!targetRef || !targetRef.current) return;
    const newWin = window.open('', '_blank');
    newWin.document.write('<html><head><title>Invoice</title>');
    newWin.document.write('</head><body >');
    newWin.document.write(targetRef.current.innerHTML);
    newWin.document.write('</body></html>');
    newWin.document.close();
    newWin.focus();
    newWin.print();
    newWin.close();
  }

  return <button onClick={handlePrint} className="px-3 py-2 rounded bg-slate-100">Print</button>;
}
