import { Schema, model } from "mongoose";

const GuSchema = new Schema(
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

const GuModel = model("Gu", GuSchema);

export { GuModel };