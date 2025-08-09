import { Controller, Inject, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageService } from '../../services/image/storage.service';
import { RouteDescription } from '../../../app/decorators/route.description.decorator';
import { RouteName } from '../../../app/decorators/route.name.decorator';

@Controller()
export class UploadController {
  private readonly storageService: StorageService
  constructor() {
    this.storageService = new StorageService();
  }

  @RouteName('Upload Files')
  @RouteDescription('Rota para fazer upload de arquivos')
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    const path = `uploads/${file.originalname}`;
    const contentType = file.mimetype;

    await this.storageService.uploadFile(path, file.buffer, contentType);
    const publicUrl = await this.storageService.getPublicUrl(path);

    return { path, publicUrl };
  }
}
