import { districtModel } from "../schemas/district.js";

class District {
    static async getDistrictCodeByName(districtName) {
        const district = await districtModel.findOne({ codeNm: districtName });
        if (!district) {
          throw new Error("일치하는 자치구가 없습니다.");
        }
        return district.code;
      }

      static async getDistrictNameByCode(code) {
        const district = await districtModel.findOne({ code: code });
        if (!district) {
          throw new Error("일치하는 자치코드가 없습니다.");
        }
        return district.name;
      }
}

export { District };