import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Claim } from './schemas/claims.schema';

@Injectable()
export class ClaimsService {
  constructor(@InjectModel(Claim.name) private claimModel: Model<Claim>) {}

  async createClaim(data: Partial<Claim>): Promise<Claim> {
    return this.claimModel.create(data);
  }

  async getAllClaims(): Promise<Claim[]> {
    return this.claimModel.find().exec();
  }

  async getClaimById(id: string): Promise<Claim | null> {
    return this.claimModel.findById(id).exec();
  }

  async updateClaimStatus(id: string, status: string): Promise<Claim | null> {
    return this.claimModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();
  }
}
