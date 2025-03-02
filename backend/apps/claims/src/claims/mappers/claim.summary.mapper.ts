import { Claim } from '../schemas/claims.schema';
import { ClaimDto } from '../dto/claim.dto';

export class ClaimSummaryMapper {
  static toDto(claim: Claim): ClaimDto {
    const dto = new ClaimDto();
    dto._id = String(claim._id);
    dto.userId = claim.userId;
    dto.policyNumber = claim.policyNumber;
    dto.description = claim.description;
    dto.status = claim.status;
    dto.createdAt = claim.createdAt;
    dto.updatedAt = claim.updatedAt;
    return dto;
  }

  static toDtoList(claims: Claim[]): ClaimDto[] {
    return claims.map((claim) => this.toDto(claim));
  }
}
