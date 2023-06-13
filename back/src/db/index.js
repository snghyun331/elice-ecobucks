import mongoose from "mongoose";
import { User } from "./models/User.js";
import { BlogPost } from "./models/BlogPost.js";
import { BlogComment } from "./models/BlogComment.js";
import { District } from "./models/district.js";
import { Product } from "./models/product.js";
import { Challenge } from "./models/challenge.js";
import { order } from "./models/order.js";
import { ChallengeParticipation } from "./models/challenge-participation.js";
import { ChallengeComment } from "./models/challenge-comment.js";
import { imageModel } from "./schemas/image.js";
import { seoulUsageModel } from "./schemas/seoulUsage.js";

const DB_URL =
  process.env.MONGODB_URL ||
  "MongoDB 서버 주소가 설정되지 않았습니다.\n./db/index.ts 파일을 확인해 주세요.";

mongoose.connect(DB_URL);
const db = mongoose.connection;

db.on("connected", () =>
  console.log("정상적으로 MongoDB 서버에 연결되었습니다.  " + DB_URL)
);
db.on("error", (error) =>
  console.error("MongoDB 연결에 실패하였습니다...\n" + DB_URL + "\n" + error)
);


export {User, District, Product, Challenge, BlogPost, BlogComment, order, 
  ChallengeParticipation, ChallengeComment, imageModel, seoulUsageModel};
