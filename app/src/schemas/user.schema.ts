import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
    _id: mongoose.Types.ObjectId;
    @Prop({ required: true })
    name: string;
    @Prop({ unique: true, required: true })
    email: string;
    @Prop()
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
