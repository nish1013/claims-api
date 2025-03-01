interface Claim {
  _id: string
  policyNumber: string
  status: string
}

interface ClaimListProps {
  claims: Claim[]
}

export function ClaimList({ claims }: ClaimListProps) {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-white mb-4">Claims</h2>
      <ul className="bg-gray-800 rounded-lg p-4 space-y-3">
        {claims.length === 0 ? (
          <p className="text-gray-400">No claims available.</p>
        ) : (
          claims.map((claim) => (
            <li key={claim._id} className="p-3 bg-gray-700 rounded-lg">
              <strong className="text-blue-400">{claim.policyNumber}</strong> -{' '}
              <span className="text-gray-300">{claim.status}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
