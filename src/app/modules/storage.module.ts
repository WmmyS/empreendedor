import { Module } from '@nestjs/common';
import { StorageService } from '../services/image/Storage.service';
import { UploadController } from '../controllers/upload/upload.controller';

@Module({
  providers: [StorageService],
  exports: [StorageService],
  controllers: [UploadController],

})
export class StorageModule {}
