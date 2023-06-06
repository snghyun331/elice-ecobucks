import { Schema, model } from "mongoose";

const BlogCommentSchema = new Schema(
    {
        post_id: {
            type: Schema.Types.ObjectId,
            ref: "BlogPost",
            required: true,
        },
        writer_id: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        writername: {
            type: String,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const BlogCommentModel = model("BlogComment", BlogCommentSchema);

export { BlogCommentModel };
