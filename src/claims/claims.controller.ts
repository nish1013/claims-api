import { Controller, Post, Get, Patch, Param, Body } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { UpdateClaimDto } from './dto/update.claim.dto';
import { CreateClaimDto } from './dto/create.claim.dto';
import { ClaimDto } from './dto/claim.dto';

@ApiTags('Claims')
@Controller('claims')
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {}

  @Post()
  @ApiOperation({ summary: 'File a new insurance claim' })
  @ApiBody({ type: CreateClaimDto })
  async createClaim(@Body() claimData: CreateClaimDto): Promise<ClaimDto> {
    return this.claimsService.createClaim(claimData);
  }

  @Get()
  @ApiOperation({ summary: 'Get all claims' })
  async getAllClaims(): Promise<ClaimDto[]> {
    return this.claimsService.getAllClaims();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a claim by ID' })
  async getClaimById(@Param('id') id: string): Promise<ClaimDto | null> {
    return this.claimsService.getClaimById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing insurance claim' })
  @ApiBody({ type: UpdateClaimDto })
  async updateClaim(
    @Param('id') id: string,
    @Body() updateData: UpdateClaimDto,
  ): Promise<ClaimDto | null> {
    return this.claimsService.updateClaim(id, updateData);
  }
}
