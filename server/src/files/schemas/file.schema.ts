import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type FileDocument = File & Document;

@Schema({ timestamps: true })
export class File {
    @Prop({ type: Types.ObjectId, required: true })
    userId: Types.ObjectId;

    @Prop({ required: true })
    fileName: string;

    @Prop({ enum: ['code', 'text'], required: true })
    fileType: 'code' | 'text';

    @Prop()
    language?: string;

    @Prop({ required: true })
    size: number;

    @Prop({ default: false })
    isArchived: boolean;
}

export const FileSchema = SchemaFactory.createForClass(File);