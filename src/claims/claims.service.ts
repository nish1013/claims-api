import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Claim } from './schemas/claims.schema';
import { ClaimDto } from './dto/claim.dto';
import { ClaimMapper } from './mappers/claim.mapper';

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
}
