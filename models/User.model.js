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
        image: {
            type: String
        },
        biography: {
            type: String,
            required: true,
        },
        spaces:[
            {
                type: Schema.Types.ObjectId,
                ref: 'Space',
            }
        ]
    },
    {
        timestamps: true,
    }
);

module.exports = model("User", userSchema);
