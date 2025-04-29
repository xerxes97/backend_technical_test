import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Session {
  readonly _id: string;

  @Prop({ required: true, ref: 'User', type: Types.ObjectId })
  userId: Types.ObjectId;

  @Prop({ required: true })
  refreshToken: string;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
