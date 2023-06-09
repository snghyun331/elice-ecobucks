import { Schema, model } from "mongoose";

const districtSchema = new Schema(
  {
    code: {
      type: Number,
      required: true,
    },
    codeNm: {
      type: String,
      required: true,
    },
  }
);

const districtModel = model("District", districtSchema);

export { districtModel };