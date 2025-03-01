import { PartialType, PickType } from '@nestjs/swagger';
import { ClaimDto } from './claim.dto';

export class UpdateClaimDto extends PartialType(
  PickType(ClaimDto, ['status', 'description'] as const),
) {}
