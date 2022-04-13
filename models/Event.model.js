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
        price: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        space: { type: Schema.Types.ObjectId, ref: "Space" },
        organizers: { type: Schema.Types.ObjectId, ref: "User" },
    },
    {
        timestamps: true,
    }
);

module.exports = model("Event", eventSchema);
