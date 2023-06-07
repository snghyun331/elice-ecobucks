import { challengeModel } from "../schemas/challenge.js";

class Challenge {
  static async create(newChallenge) {
    const createdChallenge = await challengeModel.create(newChallenge);
    return createdChallenge;
  }
  
  static async findAll( ) {
    const Challenges = await challengeModel.find( );
    return Challenges;
  }

  static NoAsyncfindAll( ) {
    const Challenges = challengeModel.find( );
    return Challenges;
  }
  
  static async findById({ _id }){
    const Challenge = await challengeModel.findById({ _id });
    return Challenge
  }

  static NoAsyncfindById({ _id }) {
    const Challenge = challengeModel.findById({ _id });
    return Challenge;
  }

<<<<<<< HEAD
  static async findAllByUserId({ userId }){
    const UserChallenges = await challengeModel.find({ userId });;
    return UserChallenges
  }

  // update
  static async update({ _id, title, content, icon, weeks, dueDate }) {
    const updatedEducation = await challengeModel.findOneAndUpdate(
      {_id : _id}
      ,{title, content, icon, weeks, dueDate}
      ,{new: true});

    return updatedEducation;
  }

  static async deleteById( _id ) {
    await challengeModel.findByIdAndDelete( _id );
    return ;
  }
  
}

export { Challenge };
