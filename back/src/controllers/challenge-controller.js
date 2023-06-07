import { ChallengeService } from "../services/challenge-service.js";
import { validateEmptyBody } from "../utils/validators.js"


const challengeCreate = async function (req, res, next) {
  try {
    validateEmptyBody(req)
    const userId = req.currentUserId;
    const { title, content, icon, weeks } = req.body;
    

    const challenge = await ChallengeService.createChallenge({ userId, title, content, icon, weeks });
    res.json(challenge);
  } catch (err) {
    next(err);
  }
}

const challengeGetAll = async function (req, res, next) {
  try {
    const challenge = await ChallengeService.findChallenges( );
    res.json(challenge);
  } catch (err) {
    next(err);
  }
}

const challengeGet = async function (req, res, next) {
  try {
    const _id = req.params._id;
    const challenge = await ChallengeService.findChallenge({ _id });
    res.json(challenge);
  } catch (err) {
    next(err);
  }
}

const challengeUpdate =  async function (req, res, next) {
  try {
    const _id = req.params._id;
    const currentUserId = req.currentUserId;
    const { icon, title, content, weeks } = req.body;  

    const education = await ChallengeService.updateChallenge({ 
      _id, currentUserId, title, content, icon, weeks, 
    });
    
    res.json(education);
  } catch (error) {
    next(error);
  }
}

const challengeDelete = async function (req, res, next){
  try {
    const _id = req.params._id;
    const currentUserId = req.currentUserId;
    const challenge = await ChallengeService.deleteChallenge(_id, currentUserId);
     
    res.status(200).json({ message: "challenge 삭제 완료"});

  } catch (error) {
    next(error);
  }
}

export { challengeCreate, challengeGetAll, challengeGet, challengeUpdate, challengeDelete }