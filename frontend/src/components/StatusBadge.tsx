import { ClaimStatus } from '../api/interfaces/data'

interface StatusBadgeProps {
  status: ClaimStatus
}

const TONE: Record<ClaimStatus, string> = {
  [ClaimStatus.PENDING]: 'bg-pending/15 text-pending',
  [ClaimStatus.APPROVED]: 'bg-approved/15 text-approved',
  [ClaimStatus.REJECTED]: 'bg-rejected/15 text-rejected',
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${TONE[status] ?? TONE[ClaimStatus.PENDING]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  )
}
