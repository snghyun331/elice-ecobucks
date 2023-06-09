import { Schema, model } from 'mongoose';

const participationSchema = new Schema(
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    challengeId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Challenge', 
      required: true 
    },
    image: { 
      type: String, 
      required: true 
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