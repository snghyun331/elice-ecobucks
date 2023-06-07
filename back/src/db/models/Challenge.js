import { ChallengeModel } from "../schemas/challenge.js";

class Challenge {
  static async create(newChallenge) {
    const createdChallenge = await ChallengeModel.create(newChallenge);
    return createdChallenge;
  }
  
  static async findAll( ) {
    const Challenges = await ChallengeModel.find( );
    return Challenges;
  }

  static NoAsyncfindAll( ) {
    const Challenges = ChallengeModel.find( );
    return Challenges;
  }
  
  static async findById({ _id }){
    const Challenge = await ChallengeModel.findById({ _id });
    return Challenge
  }

  static NoAsyncfindById({ _id }) {
    const Challenge = ChallengeModel.findById({ _id });
    return Challenge;
  }

  static async findAllByUserId({ userId }){
    const UserChallenges = await ChallengeModel.find({ userId });;
    return UserChallenges
  }

  // update
  static async update({ _id, title, content, icon, weeks, dueDate }) {
    const updatedEducation = await ChallengeModel.findOneAndUpdate(
      {_id : _id}
      ,{title, content, icon, weeks, dueDate}
      ,{new: true});

    return updatedEducation;
  }

  static async deleteById( _id ) {
    await ChallengeModel.findByIdAndDelete( _id );
    return ;
  }
  
}

export { Challenge };
