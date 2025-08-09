import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import configuration from '../../../infra/configurations/configuration';

@Injectable()
export class StorageService {
  private readonly s3: S3Client;
  private readonly bucketName = configuration().storage.bucketName;

  constructor() {
    this.s3 = new S3Client({
      region: configuration().storage.region,
      endpoint: configuration().storage.endpoint,
      credentials: {
        accessKeyId: configuration().storage.accessKeyId,
        secretAccessKey: configuration().storage.secretAccessKey,
      },
    });
  }

  async uploadFile(path: string, file: Buffer, contentType: string): Promise<string> {
    try {
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: path,
        Body: file,
        ContentType: contentType,
      });
      await this.s3.send(command);

      console.log(`File uploaded successfully. Path: ${path}`);
      return path;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Failed to upload file');
    }
  }

  async getPublicUrl(path: string): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: path,
      });
      const signedUrl = await getSignedUrl(this.s3, command, { expiresIn: 3600 }); // URL válida por 1 hora
      return signedUrl;
    } catch (error) {
      console.error('Error generating public URL:', error);
      throw new Error('Failed to generate public URL');
    }
  }
}
