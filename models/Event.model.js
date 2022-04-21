const { model, Schema } = require("mongoose");

const eventSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        spaceId: {
            type: Schema.Types.ObjectId,
            ref: "Space",
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model("Event", eventSchema);
