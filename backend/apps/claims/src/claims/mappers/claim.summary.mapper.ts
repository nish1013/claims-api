import { Claim } from '../schemas/claims.schema';
import { ClaimDto } from '../dto/claim.dto';
import { ClaimSummaryDto } from '../dto/claim.summary.dto';

export class ClaimSummaryMapper {
  static toDto(claim: Claim): ClaimSummaryDto {
    return new ClaimDto({
      _id: claim._id as string,
      userId: claim.userId,
      policyNumber: claim.policyNumber,
      description: claim.description,
      status: claim.status,
      createdAt: claim.createdAt,
      updatedAt: claim.updatedAt,
    });
  }

  static toDtoList(claims: Claim[]): ClaimSummaryDto[] {
    return claims.map((claim) => this.toDto(claim));
  }
}
