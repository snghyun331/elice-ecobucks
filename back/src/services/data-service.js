import { seoulUsageModel } from "../db/schemas/seoulUsage.js";
import { districtUsageModel } from "../db/schemas/districtUsage.js";
import { seasonalUsageModel } from "../db/schemas/seasonalUsage.js";

const seoulUsageService = () => {
  return seoulUsageModel.find({ }).exec();
};

const districtUsageService = () => {
    return districtUsageModel.find({ }).exec();
}

const seasonalUsageService = () => {
    return seasonalUsageModel.find({ }).exec();
}

export { seoulUsageService, districtUsageService, seasonalUsageService };