import { imageService } from "../services/image-service.js"
import { CREATED, OK } from "../utils/constants.js";

const imageController = {
  imageCreate: async function(req, res, next) {
    try { 
      const object = req.params.object
      const userId = req.currentUserId
      const file = req.file
      console.log(file)
      const createImage = await imageService.uploadImage({ userId, object, file });
      res.status(CREATED).send(createImage);
    } catch (error) {
      next(error);
    }
  },

  imageGetAll: async function(req, res, next) {
    try {
      const image = await imageService.getImages();
      res.status(OK).send(image);
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

  imageObjectGetAll: async function(req, res, next) {
    try {
      const object = req.query.object
      const image = await imageService.getObjectImages({ object });
      res.status(OK).send(image);
    } catch (error) {
      next(error);
    }
  },


  imageUpdate: async function(req, res, next) {
    try {
      const imageId = req.params._id;
      const file = req.file;
      const currentUserId = req.currentUserId; 
      const updateImage = await imageService.updateImage({ imageId, currentUserId, file });
      res.status(OK).send(updateImage);
    } catch (error) {
      next(error);
    }
  },

  imageDelete: async function(req, res, next) {
    try {
      const imageId = req.params._id;
      await imageService.deleteImage(imageId);
      res.status(OK).send({ message: "image 삭제 완료" });
    } catch (error) {
      next(error);
    }
  }

}

export { imageController }