import is from "@sindresorhus/is";

export function validateEmptyBody(req){
  // headers의 Content-Type이 application/json인지 check
  if (req.headers['content-type'] !== 'application/json') {
    throw new Error(
      "headers의 Content-Type을 application/json으로 설정해주세요"
    );
  }
  //req.body의 null check
  if (is.emptyObject(req.body)) {
    throw new Error(
      "Request body is empty"
    );
  }
}