import { Schema, model } from "mongoose";

const districtUsageSchema = new Schema({
    year: {
        type: Number,
        required: true,
    },
    month: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    powerUsage: {
        type: Number,
        required: true,
    },
});

const districtUsageModel = model('DistrictUsage', districtUsageSchema, 'district_usage');

export { districtUsageModel }