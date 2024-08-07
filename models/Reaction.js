const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: new Types.ObjectId(),
            immutable: true,
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => {
                return date ? date.toLocaleString() : '';
            }
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    },
);

module.exports = reactionSchema;