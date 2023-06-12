import { imageService } from "../services/image-service.js"
import { CREATED, OK } from "../utils/constants.js";

const imageController = {
  imageCreate: async function(req, res, next) {
    try { 
      const objectId = req.body.objectId 
      const userId = req.currentUserId
      const file = req.file
      const createImage = await imageService.uploadImage({ userId, objectId, file });
      res.status(CREATED).send(createImage);
    } catch (error) {
      next(error);
    }
  },

  imageGets: async function(req, res, next) {
    try {
      const image = await imageService.getsImage( );
      res.send(image);
    } catch (error) {
      next(error);
    }
  },

  imageGet: async function(req, res, next) {
    try {
      const imageId = req.params._id;
      const image = await imageService.getImage({ imageId });
      res.status(OK).send(image);
    } catch (error) {
      next(error);
    }
  },

  imageDelete: async function(req, res, next) {
    try {
      const imageId = req.params._id;
      await imageService.deleteImage( imageId );
      res.status(OK).send({ message: "image 삭제 완료"});
    } catch (error) {
      next(error);
    }
  }

}

export { imageController }