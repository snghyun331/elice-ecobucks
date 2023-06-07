import { Schema, model } from 'mongoose';

const ChallengeParticipationSchema = new Schema(
  {
    user_id: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    challenge_id: { 
      type: Schema.Types.ObjectId, 
      ref: 'chellenge', 
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

const ChallengeParticipationModel = model('ChallengeParticipation', ChallengeParticipationSchema);
export { ChallengeParticipationModel };