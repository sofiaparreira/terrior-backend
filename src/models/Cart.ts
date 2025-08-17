import { Schema, model } from "mongoose";

const cartSchema = new Schema (
    {
        user_id: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        items: [
            {
                wine_id: {type: Schema.Types.ObjectId, ref: 'Wine', required: true},
                quantity: {type: Number, required: true}

            },
        ]

    },
    { timestamps: true}
)

export const CartModel = model('Cart', cartSchema)