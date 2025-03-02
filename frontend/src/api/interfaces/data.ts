export enum ClaimStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export interface Policy {
  userId: string
  policyNumber: string
}
