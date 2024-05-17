import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class ImageService {
  async deleteImage(imageName: string): Promise<void> {
    const imagePath = `./uploads/${imageName}`;
    
    try {
      await fs.promises.unlink(imagePath);
      console.log('File deleted successfully');
    } catch (error) {
      console.error('Error deleting file:', error)
      throw error; // Propagate the error to the caller
    }
  }
}
