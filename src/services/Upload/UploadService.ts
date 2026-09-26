import path from 'node:path';
import type { Request } from 'express';
import { nanoid } from 'nanoid';

import { BUCKET_NAME, minioClient } from '~/utils/minioClient';

class UploadService {
  static instance: UploadService;

  constructor() {
    if (UploadService.instance) return UploadService.instance;

    UploadService.instance = this;
  }

  async uploadFile(req: Request & { file: Express.Multer.File }) {
    const file = req.file;
    const feature = req.query.feature || 'others';

    const fileExtension = path.extname(file.originalname);
    const uniqueFilename = `${nanoid(10)}${fileExtension}`;
    const filePath = `${feature}/${uniqueFilename}`;

    await minioClient.putObject(BUCKET_NAME, filePath, file.buffer, file.size, {
      'Content-Type': file.mimetype,
    });

    const url = `${BUCKET_NAME}/${filePath}`;

    return {
      url,
      filename: uniqueFilename,
      originalName: file.originalname,
      size: file.size,
      mimeType: file.mimetype,
    };
  }
}

export { UploadService };
