const { model, Schema } = require("mongoose");

const commentSchema = new Schema(
    {
        comment: {
            type: String,
            maxlength: 200,
            required: true
        },
        spaceId: {
            type: Schema.Types.ObjectId,
            ref: 'Space'
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true,
    }
);

module.exports = model("Comment", commentSchema);
