const { model, Schema } = require("mongoose");

const spaceSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String
        },
        imageURL: {
            type: String
        },
        adress: {
            street: String,
            city: String,
            zipcode: String,
        },
        size: {
            type: String
        },
        purposes: Array,
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        comments: { type: Schema.Types.ObjectId, ref: "Comment" },
    },
    {
        timestamps: true,
    }
);

module.exports = model("Space", spaceSchema);
