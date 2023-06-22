import { Schema, model } from 'mongoose';

const participationSchema = new Schema(
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    imageId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Image',
    },
    challengeId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Challenge', 
      required: true 
    },
    mileage: { 
      type: Number, 
      default: 1000,
      required: false,
    },
    hasParticipatedToday: {
      type: Boolean, 
      required: false,
      default: false
    }
  },
  {
    timestamps: true,    
  }
);

const participationModel = model('ChallengeParticipation', participationSchema);
export { participationModel };