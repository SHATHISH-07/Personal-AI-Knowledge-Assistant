import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop()
    name: string;

    @Prop({ unique: true })
    email: string;

    @Prop({ default: false })
    isEmailVerified: boolean;

    @Prop({ required: true, enum: ["google", "local"] })
    authProvider: "google" | "local";

    @Prop()
    passwordHash?: string;

    @Prop()
    googleId?: string;

    @Prop({ default: null })
    profilePictureUrl?: string;

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ default: false })
    refreshTokenHash: string;

    @Prop({ default: false })
    isArchived: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);