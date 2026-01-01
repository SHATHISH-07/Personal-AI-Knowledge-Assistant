import { IsEnum, IsNumber, IsString } from 'class-validator';

export class UploadFileDto {
    @IsString()
    fileName: string;

    @IsEnum(['code', 'text'])
    fileType: 'code' | 'text';

    @IsString()
    extractedText: string;

    @IsNumber()
    size: number;

    @IsString()
    language?: string;
}
