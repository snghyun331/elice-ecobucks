import { GuModel } from "../schemas/gu.js";

class Gu {
    static async getGuCodeByName(codeNm) {
        const gu = await GuModel.findOne({ codeNm: codeNm });
        if (!gu) {
          throw new Error("일치하는 자치구가 없습니다.");
        }
        return gu.code;
      }

      static async getGuNameByCode(code) {
        const gu = await GuModel.findOne({ code: code });
        if (!gu) {
          throw new Error("일치하는 자치코드가 없습니다.");
        }
        return gu.name;
      }
}

export { Gu };