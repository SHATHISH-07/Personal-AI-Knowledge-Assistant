import * as mammoth from 'mammoth';
import { PDFParse } from 'pdf-parse';


const RAW_TEXT_EXTENSIONS = new Set([
    // Generic Text / Data
    'txt', 'md', 'markdown', 'csv', 'json', 'yaml', 'yml', 'xml', 'env', 'ini', 'toml', 'conf', 'log',

    // Web
    'html', 'htm', 'css', 'scss', 'sass', 'less',
    'js', 'jsx', 'ts', 'tsx', 'mjs', 'cjs',

    // Backend / Systems
    'py', 'java', 'c', 'cpp', 'h', 'hpp', 'cs',
    'go', 'rs',
    'rb',
    'php', 'pl',
    'swift', 'kt', 'kts',
    'r', 'scala', 'dart', 'lua',

    // Shell / Scripts
    'sh', 'bash', 'zsh', 'bat', 'ps1',

    // Database
    'sql', 'prisma',


    'dockerfile', 'gitignore', 'editorconfig',
]);

export class TextExtractorService {
    static async extract(file: Express.Multer.File): Promise<string> {
        const extension = file.originalname
            .split('.')
            .pop()
            ?.toLowerCase();

        if (!extension) return '';


        if (RAW_TEXT_EXTENSIONS.has(extension)) {
            return file.buffer.toString('utf-8');
        }


        switch (extension) {
            case 'docx': {
                const result = await mammoth.extractRawText({
                    buffer: file.buffer,
                });
                return result.value;
            }

            case 'pdf': {

                try {

                    const parser = new PDFParse({
                        data: file.buffer,
                    });

                    const result = await parser.getText();

                    return result.text;
                } catch (error) {
                    throw new Error(`Failed to parse PDF: ${error.message}`);
                }
            }

            default:
                throw new Error(`Unsupported file type: .${extension}`);
        }
    }
}