import { Schema, model } from 'mongoose';


const challengeSchema = new Schema(
  {
    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
    },
    title: { 
        type: String, 
        required: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    icon: {
        type: String, 
        required: true
    },
    weeks: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date, 
        //default: Date.now()
    },
    participantsCount: { 
        type: Number, 
        default: 0 
    },
    commentsCount: {
        type: Number, 
        default: 0
    },
    isCompleted: {
        type: Boolean, 
        default: false
    }
    //mileage : {},
  },
  {
    timestamps: true,    
  }
);

const challengeModel = model('Challenge', challengeSchema);
export { challengeModel };