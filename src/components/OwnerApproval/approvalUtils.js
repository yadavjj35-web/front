export function formatApprovalSummary(a) {
  return a?.metadata?.title || a.approvalId || 'Approval';
}
