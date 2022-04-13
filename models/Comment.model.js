const { model, Schema } = require("mongoose");

const commentSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        comment: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model("Comment", commentSchema);
