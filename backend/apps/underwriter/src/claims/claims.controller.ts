import { Controller, Post, Body, Logger } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { EvaluateClaimDto } from './dto/evaluate-claim.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateEvaluateClaimDto } from './dto/create-evaluate-claim.dto';

@Controller('claims')
export class ClaimsController {
  private readonly logger = new Logger(ClaimsController.name);

  constructor(private readonly claimsService: ClaimsService) {}

  /**
   * API: Receives claims from Claims App for underwriting evaluation.
   */
  @Post('evaluate')
  @ApiOperation({ summary: 'File a new insurance claim' })
  @ApiBody({ type: CreateEvaluateClaimDto })
  @ApiResponse({ status: 201, type: EvaluateClaimDto})
  async evaluateClaim(@Body() body: CreateEvaluateClaimDto) {
    this.logger.log(`Received claim ${body.claimId} for underwriting`);
    return this.claimsService.processClaim(body.claimId, body.policyNumber);
  }
}
