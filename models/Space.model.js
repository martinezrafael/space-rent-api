const { model, Schema } = require("mongoose");

const spaceSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        adress: {
            street: String,
            city: String,
            zipcode: String,
        },
        size: String,
        purposes: Array,
        user: { type: Schema.Types.ObjectId, ref: "User" },
        comments: { type: Schema.Types.ObjectId, ref: "Comment" },
    },
    {
        timestamps: true,
    }
);

module.exports = model("Space", spaceSchema);
