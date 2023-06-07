import { commentModel } from "../schemas/challenge-comment.js";

class Comment {
  static async create(newChallenge) {
    const createdChallenge = await commentModel.create(newChallenge);
    return createdChallenge;
  }  

  static async findAll( ) {
    const comments = await commentModel.find( );
    return comments;
  } 

  static NoAsyncfindAll({ challenge_id }) {
    const comments = commentModel.find({ challenge_id });
    return comments;
  }
  
  static async findById({ _id }){
    const comment = await commentModel.findById({ _id });
    return comment
  }

  static NoAsyncfindById({ _id }) {
    const comment = commentModel.findById({ _id });
    return comment;
  }
  
  static async findAllByUserId({ userId }){
    const userComment = await commentModel.find({ userId });;
    return userComment
  }

  // update
  static async update({ _id, content }) {
    const updateComment = await commentModel.findOneAndUpdate(
      {_id : _id}
      ,{content}
      ,{new: true});

    return updateComment               ;
  }

  static async deleteById( _id ) {
    await commentModel.findByIdAndDelete( _id );
    return ;
  }
  
}

export { Comment };
