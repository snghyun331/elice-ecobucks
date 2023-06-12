import { imageModel } from "../schemas/image.js";

class Image {
  static async create(newImage) {
    const createdImage = await imageModel.create(newImage);
    return createdImage;
  }
  
  static async findAll( ) {
    const images = await imageModel.find( );
    return images;
  }
  
  static async findById( _id ){
    const image = await imageModel.findById( _id );
    return image
  }

  static async findOne( imageId ){
    const image = await imageModel.findOne( imageId );
    return image
  }

  static async findAllByUserId({ userId }){
    const userImages = await imageModel.find({ userId });;
    return userImages
  }

  // update
  static async update({ userId, objectId, filename, path }) {
    const updatedEducation = await imageModel.findOneAndUpdate(
      { _id : userId }
      ,{ objectId, filename, path }
      ,{ new: true });

    return updatedEducation;
  }

  static async deleteImage( imageId ) {
    await imageModel.findByIdAndDelete({ _id: imageId });
    return ;
  }
  
}

export { Image };
