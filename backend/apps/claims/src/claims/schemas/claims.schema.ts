import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ClaimStatus } from '../interfaces/claim.status';

@Schema({ timestamps: true })
export class Claim extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  policyNumber: string;

  @Prop({ required: true, enum: ClaimStatus, default: ClaimStatus.PENDING })
  status: ClaimStatus;

  @Prop()
  description: string;

  @Prop({ type: [String], default: [] })
  documentUrls: string[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ClaimSchema = SchemaFactory.createForClass(Claim);
