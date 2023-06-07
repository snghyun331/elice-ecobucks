import { Schema, model } from 'mongoose';

const participationSchema = new Schema(
  {
    user_id: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    challenge_id: { 
      type: Schema.Types.ObjectId, 
      ref: 'Chellenge', 
      required: true 
    },
    image: { 
      type: String, 
      required: true 
    },
  },
  {
    timestamps: true,    
  }
);

const participationModel = model('Participation', participationSchema);
export { participationModel };