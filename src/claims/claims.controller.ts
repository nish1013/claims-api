import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { ClaimsService } from './claims.service';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UpdateClaimDto } from './dto/update.claim.dto';
import { CreateClaimDto } from './dto/create.claim.dto';
import { ClaimDto } from './dto/claim.dto';

@ApiTags('Claims')
@ApiBearerAuth()
@Controller('claims')
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {}

  @Post()
  @ApiOperation({ summary: 'File a new insurance claim' })
  @ApiBody({ type: CreateClaimDto })
  @ApiResponse({ status: 201, type: ClaimDto })
  async createClaim(@Body() claimData: CreateClaimDto): Promise<ClaimDto> {
    return this.claimsService.createClaim(claimData);
  }

  @Get()
  @ApiOperation({ summary: 'Get all claims' })
  @ApiResponse({ status: 200, type: [ClaimDto] })
  async getAllClaims(): Promise<ClaimDto[]> {
    return this.claimsService.getAllClaims();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a claim by ID' })
  @ApiResponse({ status: 200, type: ClaimDto })
  @ApiResponse({ status: 404, description: 'Claim not found' })
  async getClaimById(@Param('id') id: string): Promise<ClaimDto> {
    const claim = await this.claimsService.getClaimById(id);
    if (!claim) {
      throw new NotFoundException(`Claim with ID ${id} not found`);
    }

    return claim;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing insurance claim' })
  @ApiResponse({
    status: 200,
    type: ClaimDto,
    description: 'Claim updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Claim not found' })
  @ApiBody({ type: UpdateClaimDto })
  async updateClaim(
    @Param('id') id: string,
    @Body() updateData: UpdateClaimDto,
  ): Promise<ClaimDto> {
    const claim = await this.claimsService.updateClaim(id, updateData);
    if (!claim) {
      throw new NotFoundException(`Claim with ID ${id} not found`);
    }

    return claim;
  }
}
