import AWS from 'aws-sdk';
import { Image } from  "../db/index.js";;
import { handleError, setError } from "../utils/customError.js";
import { updateTime } from "../utils/update-time.js";
import { validatePermission } from "../utils/validators.js";


// AWS S3 설정
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

class imageService {
  // 파일명 생성
  static async generateUniqueFileName(file) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const extension = file.originalname.split('.').pop(); // 확장자 추출
    const fileName = `${file.fieldname}-${uniqueSuffix}.${extension}`;
    return fileName;
  }
  
  static async uploadImage({ userId, object, file }) {
    try {
      if (!file) {
        throw setError("No image file uploaded", 400, "NO_FILE");
      }
      
      // 확장자 타입 검사
      const allowedTypes = ['image/jpeg', 'image/png', 'image/bmp', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.mimetype)) {
        throw setError("Invalid file type", 400, "INVALID_TYPE");
      }
      
      // 파일명 생성
      const fileName = await imageService.generateUniqueFileName(file);
  
      const uploadParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME, 
        Key: fileName, 
        Body: file.buffer,  // 이전에는 fs.createReadStream(file.path)였음
        ContentType: file.mimetype,
        ACL: 'public-read'
      };

      // S3에 이미지 업로드
      const result = await s3.upload(uploadParams).promise();
      
      const newImage = { 
        userId: userId,
        object: object, 
        fileName: fileName,
        path: result.Location, 
      };
      
      // 업로드된 이미지 정보를 데이터베이스에 저장
      const createImage = await Image.create(newImage);
      
      return updateTime.toTimestamps(createImage);
  
    } catch (error) {
      throw handleError(error);
    }
  }
  
  static async getImages() {
    try {
      const images = await Image.findAll();
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

  static async getObjectImages({ object }) {
    try {
      if (object != "profiles" || object != "challenges" || object != "products"){
        throw setError("profiles, challenges, products을 요청해야합니다.", 400, "BAD_REQUEST")
      }
      const images = await Image.find({ object });
      
      if (!images) {
        throw new Error("이미지를 찾을 수 없습니다");
      }
      return images;

    } catch (err) {
      throw new Error("가져오는데 실패 하였습니다.");
    }
  }

  static async updateImage({ imageId, currentUserId, file }) {
    const image = await Image.findById({ _id: imageId });
    await validatePermission(image, currentUserId);

    const createImage = await imageService.uploadImage({ userId: image.userId, object: image.object, file });

    // 이전 이미지 삭제
    await s3.deleteObject({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: image.fileName,
    }).promise();

    return createImage;
  }

  static async deleteImage(imageId) {
    const image = await Image.findById(imageId);
    if (!image) {
      throw setError("이미지를 찾을 수 없습니다", 404, "NOT_FOUND");
    }
    await Image.deleteImage(imageId);

    // S3에서 이미지 삭제
    await s3.deleteObject({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: image.fileName,
    }).promise();
  } 
  
}

export { imageService }
