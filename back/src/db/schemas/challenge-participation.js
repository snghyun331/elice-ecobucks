import { Schema, model } from 'mongoose';

const participationSchema = new Schema(
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    challenge_id: { 
      type: Schema.Types.ObjectId, 
      ref: 'Challenge', 
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