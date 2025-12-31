import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop()
    name: string;

    @Prop({ unique: true })
    email: string;

    @Prop({ required: true, enum: ["google", "local"] })
    authProvider: "google" | "local";

    @Prop()
    passwordHash?: string;

    @Prop()
    googleId?: string;

    @Prop()
    profilePictureUrl?: string;

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ default: false })
    isArchived: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);