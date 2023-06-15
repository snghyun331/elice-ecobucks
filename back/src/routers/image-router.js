import multer from "multer";
import { Router } from "express";
import { login_required } from "../middlewares/login-required.js";
import { imageController } from "../controllers/image-controller.js";
import { MAX_FILE_SIZE } from "../utils/constants.js";
import { Validation } from "../middlewares/validation.js";

const imageCreateValidation = Validation.validate(Validation.imageCreateSchema);
const imageUpdateValidation = Validation.validate(Validation.imageUpdateSchema);

const imageRouter = Router();
imageRouter.use(login_required)

const upload = multer({ // 메모리에 파일 임시 저장
  storage: multer.memoryStorage(),   // dest: 'uploads/',  <- 로컬저장인 image-local-save-service 사용시
  limits: {
    fileSize: MAX_FILE_SIZE * 1024 * 1024,  // 최대 파일 크기 제한 (3MB)
  },
});


imageRouter.post('/images/:object/upload', imageCreateValidation, upload.single('image'), imageController.imageCreate);

imageRouter.get('/images', imageController.imageGetAll);

imageRouter.get('/images/:_id', imageController.imageGet);

imageRouter.get('/images?object=value', imageController.imageObjectGetAll);

imageRouter.put('/images/:_id', imageUpdateValidation, upload.single('image'), imageController.imageUpdate);

imageRouter.delete('/images/:_id', imageController.imageDelete);

export { imageRouter }
