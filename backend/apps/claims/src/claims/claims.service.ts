import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Claim } from './schemas/claims.schema';
import { ClaimDto } from './dto/claim.dto';
import { ClaimMapper } from './mappers/claim.mapper';
import { ClaimSummaryDto } from './dto/claim.summary.dto';
import { ClaimSummaryMapper } from './mappers/claim.summary.mapper';

@Injectable()
export class ClaimsService {
  constructor(@InjectModel(Claim.name) private claimModel: Model<Claim>) {}

  async createClaim(data: Partial<Claim>): Promise<ClaimDto> {
    const claim = await this.claimModel.create(data);
    return ClaimMapper.toDto(claim);
  }

  async getAllClaims(): Promise<ClaimDto[]> {
    const claims = await this.claimModel.find().exec();
    return claims.map(ClaimMapper.toDto);
  }

  async getAllClaimsSummary(): Promise<ClaimSummaryDto[]> {
    const claims = await this.claimModel.find().exec();
    return claims.map(ClaimSummaryMapper.toDto);
  }

  async getClaimById(id: string): Promise<ClaimDto | null> {
    const claim = await this.claimModel.findById(id).exec();
    return claim ? ClaimMapper.toDto(claim) : null;
  }

  async updateClaim(
    id: string,
    updateData: Partial<Claim>,
  ): Promise<ClaimDto | null> {
    const updatedClaim = await this.claimModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    return updatedClaim ? ClaimMapper.toDto(updatedClaim) : null;
  }

  // TODO: Add validation for documentUrls
  async updateClaimDocuments(
    id: string,
    documentUrls: string[],
  ): Promise<ClaimDto | null> {
    if (!documentUrls.length) {
      return null;
    }

    const updatedClaim = await this.claimModel
      .findByIdAndUpdate(
        id,
        { $push: { documentUrls: { $each: documentUrls } } },
        { new: true },
      )
      .exec();

    return updatedClaim ? ClaimMapper.toDto(updatedClaim) : null;
  }
}
