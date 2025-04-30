import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  readonly _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ required: true })
  password: string;

  @Prop({ default: true, type: Boolean })
  isActive: boolean;

  @Prop()
  token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
