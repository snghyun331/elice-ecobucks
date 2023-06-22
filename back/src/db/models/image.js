import { imageModel } from "../schemas/image.js";

class Image {
  static async create(newImage) {
    const createdImage = await imageModel.create(newImage);
    return createdImage;
  }

  static async find(object) {
    const images = await imageModel.find(object);
    return images;
  }
  
  static async findAll() {
    const images = await imageModel.find();
    return images;
  }
  
  static async findById(_id){
    const imageId = await imageModel.findById(_id);
    return imageId
  }

  static async findAllByUserId(objectId){
    const userImages = await imageModel.find(objectId);
    return userImages
  }

  static async findByDataId({ _id }) {
    // dataId로 사진 조회
    const dataImage = await imageModel.findOne({ dataId : _id });
    return dataImage;
  }

  // update
  static async update({ userId, objectId, filename, path }) {
    const updatedEducation = await imageModel.findOneAndUpdate(
      { _id : userId }
      ,{ objectId, filename, path }
      ,{ new: true });

    return updatedEducation;
  }

  static async deleteImage(imageId) {
    await imageModel.findByIdAndDelete({ _id: imageId });
    return ;
  }
  
}

export { Image };
