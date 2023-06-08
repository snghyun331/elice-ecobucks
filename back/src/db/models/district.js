import { districtModel } from "../schemas/district.js";

class District {
    static async getdistrictCodeByName(codeNm) {
        const district = await districtModel.findOne({ codeNm: codeNm });
        if (!district) {
          throw new Error("일치하는 자치구가 없습니다.");
        }
        return district.code;
      }

      static async getdistrictNameByCode(code) {
        const district = await districtModel.findOne({ code: code });
        if (!district) {
          throw new Error("일치하는 자치코드가 없습니다.");
        }
        return district.name;
      }
}

export { District };