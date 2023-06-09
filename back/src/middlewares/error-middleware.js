import { BAD_REQUEST } from "../utils/constants.js";

function errorMiddleware(error, req, res, next) {
  console.log("\x1b[33m%s\x1b[0m", error);
  res.status(BAD_REQUEST).send(error.message);
}

export { errorMiddleware };
