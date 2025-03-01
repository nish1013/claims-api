import { OmitType } from '@nestjs/swagger';
import { ClaimDto } from './claim.dto';

export class ClaimSummaryDto extends OmitType(ClaimDto, [
  'documentUrls',
] as const) {}
