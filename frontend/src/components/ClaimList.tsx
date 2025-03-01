import { ClaimStatus } from '../api/interfaces/data'

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
  if (!claims || !claims.length) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <p className="text-gray-300">No claims available.</p>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-white mb-4">Claims</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {claims.map((claim) => (
          <div key={claim._id} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <strong className="text-blue-400 pr-2">{claim.policyNumber}</strong>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  claim.status === ClaimStatus.APPROVED
                    ? 'bg-green-500 text-white'
                    : claim.status === ClaimStatus.REJECTED
                      ? 'bg-red-500 text-white'
                      : 'bg-yellow-500 text-gray-900'
                }`}
              >
                {claim.status}
              </span>
            </div>
            <p className="text-gray-300 mt-2 text-sm">
              Last updated: {new Date(claim.updatedAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
