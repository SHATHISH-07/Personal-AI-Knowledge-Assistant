import type { Express } from 'express';
import { Body, Controller, Get, Param, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { FilesService } from "./files.service";
import { UploadFileDto } from "./dto/uploadFile.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('files')
@UseGuards(JwtAuthGuard)
export class FilesController {
    constructor(private readonly filesService: FilesService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Req() req,
    ) {
        return this.filesService.handleUpload(file, req.user.userId);
    }

    @Get()
    getFiles(@Req() req) {
        return this.filesService.getUserFiles(req.user.userId);
    }

    @Get(':fileId')
    getFile(@Req() req, @Param('fileId') fileId: string) {
        return this.filesService.getFile(req.user.userId, fileId);
    }

    @Get(':fileName')
    getFileByName(@Req() req, @Param('fileName') fileName: string) {
        return this.filesService.getFileByName(req.user.userId, fileName);
    }

    @Patch(':fileId/archive')
    archive(@Req() req, @Param('fileId') fileId: string) {
        return this.filesService.archiveFile(req.user.userId, fileId);
    }

    @Patch(':fileId/unarchive')
    unarchive(@Req() req, @Param('fileId') fileId: string) {
        return this.filesService.unarchiveFile(req.user.userId, fileId);
    }

    @Patch(':fileId/delete')
    delete(@Req() req, @Param('fileId') fileId: string) {
        return this.filesService.deleteFile(req.user.userId, fileId);
    }
}
