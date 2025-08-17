import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "paid", "cancelled"],
      default: "pending",
      required: true,
    },

    total_value: {
      type: Schema.Types.Decimal128,
      required: true,
    },

    items: [
      {
        wine_id: {
          type: Schema.Types.ObjectId,
          ref: "Wine",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        unit_price: {
          type: Schema.Types.Decimal128, 
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export const OrderModel = model('Order', orderSchema)