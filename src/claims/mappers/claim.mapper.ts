import { Claim } from '../schemas/claims.schema';
import { ClaimDto } from '../dto/claim.dto';

export class ClaimMapper {
  static toDto(claim: Claim): ClaimDto {
    return new ClaimDto({
      _id: claim._id as string,
      userId: claim.userId,
      policyNumber: claim.policyNumber,
      description: claim.description,
      status: claim.status,
      documentUrls: claim.documentUrls,
    });
  }

  static toDtoList(claims: Claim[]): ClaimDto[] {
    return claims.map((claim) => this.toDto(claim));
  }
}
