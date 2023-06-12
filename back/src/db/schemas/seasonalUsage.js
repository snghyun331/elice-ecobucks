import { Schema, model } from "mongoose";

const seasonalUsageSchema = new Schema({
    year_season: {
        type: String,
        required: true,
    },
    powerUsage: {
        type: Number,
        required: true,
    },
});

const seasonalUsageModel = model('SeasonalUsage', seasonalUsageSchema, 'seasonal_usage');

export { seasonalUsageModel }