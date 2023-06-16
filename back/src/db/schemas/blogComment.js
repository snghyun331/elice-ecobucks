import { Schema, model } from "mongoose";

const BlogCommentSchema = new Schema(
    {
        postId: {
            type: Schema.Types.ObjectId,
            ref: "BlogPost",
            required: true,
        },
        writerId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        writerName: {
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
