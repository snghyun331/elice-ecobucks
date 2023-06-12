import { Schema, model } from "mongoose";

const guUsageSchema = new Schema({
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

const guUsageModel = model('GuUsage', guUsageSchema, 'gu_usage');

export { guUsageModel }