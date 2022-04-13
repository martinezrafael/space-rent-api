const { model, Schema } = require("mongoose");

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        biography: String,
        spaces: { type: Schema.Types.ObjectId, ref: "Space" },
        events: { type: Schema.Types.ObjectId, ref: "Event" },
    },
    {
        timestamps: true,
    }
);

module.exports = model('User', userSchema);