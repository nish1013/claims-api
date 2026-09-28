import { ClaimStatus } from '../api/interfaces/data'
import { StatusBadge } from './StatusBadge'

interface Claim {
  _id: string
  policyNumber: string
  status: ClaimStatus
  updatedAt: string
}

interface ClaimListProps {
  claims: Claim[]
}

export function ClaimList({ claims }: ClaimListProps) {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">Claims</h2>
      {!claims?.length ? (
        <p className="card p-6 text-muted">No claims yet.</p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {claims.map((claim) => (
            <li key={claim._id} className="card flex items-center justify-between gap-3 p-4">
              <div>
                <p className="font-mono font-medium">{claim.policyNumber}</p>
                <p className="text-sm text-muted">
                  Updated {new Date(claim.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <StatusBadge status={claim.status} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
