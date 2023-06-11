import { Schema, model } from "mongoose";

const seoulUsageSchema = new Schema({
    email: {
        type: Number,
        required: true,
    },
    powerUsage: {
        type: Number,
        required: true,
    },
});

const seoulUsageModel = model('SeoulUsage', seoulUsageSchema, 'seoul_usage');

export { seoulUsageModel }