import { Schema, model } from 'mongoose';

const imageSchema = new Schema(
  {
    userId: {
      type:String,
      required: true,
    },
    objectId: {
      type:String,
      required: false,
    },
    fileName: { 
      type: String, 
      required: true 
    },
    path: { 
      type: String, 
      required: true 
    },
  },
  {
    timestamps: true,    
  }
);

const imageModel = model('Image', imageSchema);
export { imageModel };