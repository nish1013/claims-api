import { Controller, Post, Get, Patch, Param, Body } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Claims')
@Controller('claims')
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {}

  @Post()
  @ApiOperation({ summary: 'File a new insurance claim' })
  async createClaim(@Body() claimData) {
    return this.claimsService.createClaim(claimData);
  }

  @Get()
  @ApiOperation({ summary: 'Get all claims' })
  async getAllClaims() {
    return this.claimsService.getAllClaims();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a claim by ID' })
  async getClaimById(@Param('id') id: string) {
    return this.claimsService.getClaimById(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update claim status' })
  async updateClaimStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.claimsService.updateClaimStatus(id, status);
  }
}
