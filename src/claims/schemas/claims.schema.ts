import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ClaimStatus } from '../interfaces/claim.status';

@Schema()
export class Claim extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  policyNumber: string;

  @Prop({ required: true, enum: ClaimStatus, default: ClaimStatus.PENDING })
  status: ClaimStatus;

  @Prop()
  description: string;
}

export const ClaimSchema = SchemaFactory.createForClass(Claim);
