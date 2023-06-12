import sharp from "sharp";
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { Image } from "../db/models/image.js";
import { handleError, setError } from "../utils/customError.js";
import { updateTime } from "../utils/update-time.js";

class imageService {
  // 파일명 생성
  static async generateUniqueFileName(file) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const extension = file.originalname.split('.').pop(); // 확장자 추출
    const fileName = `${file.fieldname}-${uniqueSuffix}.${extension}`;
    return fileName;
  }
  
  static async uploadImage({ userId, objectId, file }) {
    try {
      if (!file) {
        throw setError("No image file uploaded", 400, "NO_FILE")
      }
      
      // 확장자 타입 검사
      const allowedTypes = ['image/jpeg', 'image/png', 'image/bmp', 'image/gif'];
      if (!allowedTypes.includes(file.mimetype)) {
        throw setError("Invalid file type", 400, "INVALID_TYPE");
      }

      const __filename = fileURLToPath(import.meta.url); // 현재 모듈의 URL을 가져오기
      const __dirname = path.dirname(__filename); // 디렉토리 경로를 추출
      
      // 파일명 생성  ex: image-1686418086297-173678905.png
      const fileName = await imageService.generateUniqueFileName(file);
      
      // 리사이징 된 이미지 저장
      const uploadsPath = path.resolve(__dirname, '..', '..', 'uploads');
      const ImagePath = path.join(uploadsPath, fileName);
      console.log('ImagePath: ',ImagePath);
      
      // 파일 리사이징
      const resizedImageBuffer = await sharp(file.path)
          .resize(800, 800)
          .toBuffer();
      await sharp(resizedImageBuffer).toFile(ImagePath);

      // 원본 이미지 삭제
      fs.unlinkSync(file.path);
      
      const newImage = { 
        userId: userId,
        objectId: objectId, 
        fileName: fileName,
        path: file.path,
      }
    
      // 리사이징된 이미지 경로 저장
      newImage.path = ImagePath;
      const createImage = await Image.create( newImage );
 
      return updateTime.toTimestamps(createImage);

    } catch (error) {
      // 에러상태코드 별로 처리, defalt값은 500
      throw handleError(error) 
    }
  }

  static async getsImage( ) {
    try {
      const images = await Image.findAll( );
      if (!images) {
        throw new Error("이미지를 찾을 수 없습니다");
      }
      return images;

    } catch (err) {
      throw new Error("가져오는데 실패 하였습니다.");
    }
  }
  
  static async getImage({ imageId }) {
    try {
      const image = await Image.findById({ _id: imageId });
      if (!image) {
        throw setError("이미지를 찾을 수 없습니다", 404, "NOT_FOUND");
      }
      return updateTime.toTimestamps(image);

    } catch (error) {
      if (error.errorCode  === "NOT_FOUND") {
        throw error;
      }
      throw setError("Internal Server Error", 500, 'INTERNAL_SERVER_ERROR');
    }
  }
  
  static async deleteImage( imageId ) {
    const image = await Image.findById( imageId );
    if (!image) {
      throw setError("이미지를 찾을 수 없습니다", 404, "NOT_FOUND");
    }
    await Image.deleteImage( imageId );
    
    //uploads의 이미지 삭제
    fs.unlinkSync(image.path);
  } 
  
}

export { imageService }
