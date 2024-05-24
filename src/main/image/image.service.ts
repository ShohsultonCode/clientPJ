import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class ImageService {
  async deleteImage(imageName: string): Promise<void> {
    const imagePath = `./uploads/${imageName}`;
    try {
      // Check if the file exists before attempting to delete it
      const fileExists: boolean = await fs.promises.access(imagePath, fs.constants.F_OK)
        .then(() => true)
        .catch(() => false);
  
      if (fileExists) {
        // If the file exists, delete it
        await fs.promises.unlink(imagePath);
        console.log('File deleted successfully');
      } else {
        // If the file doesn't exist, log a message indicating that it couldn't be found
        console.log(`File '${imageName}' not found. Unable to delete.`);
      }
    } catch (error) {
      // Handle other errors
      console.error('Error deleting file:', error)
      throw error; // Propagate the error to the caller
    }
  }
  
  
}
