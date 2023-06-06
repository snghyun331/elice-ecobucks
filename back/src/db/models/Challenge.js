import { ChallengeModel } from "../schemas/challenge.js";

class Challenge {
  static async create(newChallenge) {
    const createdChallenge = await ChallengeModel.create(newChallenge);
    return createdChallenge;
  }

  static async findAll() {
    const Challenges = await ChallengeModel.find({});
    return Challenges;
  }
  
  static async findById({ chellenge_id }){
    const Challenge = await ChallengeModel.findById({ chellenge_id });
    return Challenge
  }

  static async findAllByUserId({ user_id }){
    const UserChallenges = await ChallengeModel.find({ user_id });;
    return UserChallenges
  }

  // update
  static async update({ user_id, title, content, icon, DueDate }) {
    const updatedEducation = await ChallengeModel.findOneAndUpdate(
      {_id : user_id}
      ,{title, content, icon, DueDate}
      ,{new: true});

    return updatedEducation;
  }

  static async deleteById( challengeId ) {
    await ChallengeModel.findByIdAndDelete(challengeId);
    return ;
  }
  
}

export { Challenge };
