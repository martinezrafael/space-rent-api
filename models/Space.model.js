const { model, Schema } = require("mongoose");

const spaceSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        adress: {
            street: String,
            number: String,
            complement: String,
            district: String,
            city: String,
            state: String,
            zipcode: String,
        },
        size: {
            type: String,
        },
        purposes: [],
        images: [],
        price: {
            type: Number,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        comments: {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model("Space", spaceSchema);
 