import { Schema, model } from 'mongoose';

const commentSchema = new Schema(
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
    content: {
      type: String, 
      required: true
    },
  },
  {
    timestamps: true,    
  }
);

const commentModel = model('ChallengeComment', commentSchema);
export { commentModel };