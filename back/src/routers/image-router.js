import multer from "multer";
import { Router } from "express";
import { login_required } from "../middlewares/login-required.js";
import { imageController } from "../controllers/image-controller.js";

const imageRouter = Router();

const upload = multer({
  dest: 'uploads/',
  limits: {  // 최대 파일 크기 제한 (5MB)
    fileSize: 3 * 1024 * 1024, 
  },
});

imageRouter.post('/images/upload', login_required, upload.single('image'), imageController.imageCreate);

imageRouter.get('/images', login_required, imageController.imageGets);

imageRouter.get('/images/:_id', login_required, imageController.imageGet);

imageRouter.delete('/images/:_id', login_required, imageController.imageDelete);

export { imageRouter }
