import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false, type: Boolean })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
