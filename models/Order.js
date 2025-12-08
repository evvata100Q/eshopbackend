import mongoose from "mongoose";
import Orderitem from "./Orderitem.js";
const Orderschema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        suborders: [Orderitem.schema]
    }
)

const Order = mongoose.model('Order', Orderschema)
export default Order