import { Schema, model } from 'mongoose';

const ChallengeCommentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    challenge_id: {
      type: Schema.Types.ObjectId,
      ref: 'chellenge',
      required: true
    },
    content: {
      type: String, 
      required: true
    },
  },
  {
    timestamps: true,    
  }
);

const ChallengeCommentModel = model('ChallengeComment', ChallengeCommentSchema);
export { ChallengeCommentModel };