import {model, Schema} from 'mongoose';

const wineSchema = new Schema (
    {
        name: {type: String, required: true},
        type: {type: String, required: true},
        grape: {type: String, required: true},
        year: {type: Number},
        price: { type: Schema.Types.Decimal128, required: true },
        pairing: {type: String},
        description: {type: String},
        volume: {type: Number, default: 750},
        alcoholContent: {type: Number},
        quantity: {type: Number, required: true},
        imageUrl: {type: String}
    },
    {
        timestamps: true
    }
)

export const WineModel = model('Wine', wineSchema)