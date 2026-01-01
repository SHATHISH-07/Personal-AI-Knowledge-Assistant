import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ContentSourceDocument = ContentSource & Document;

@Schema({ timestamps: true })
export class ContentSource {
    @Prop({ type: Types.ObjectId, required: true })
    userId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, required: true })
    fileId: Types.ObjectId;

    @Prop({ required: true })
    extractedText: string;
}

export const ContentSourceSchema =
    SchemaFactory.createForClass(ContentSource);
