import mongoose from "mongoose";
const Orderitemschema = new mongoose.Schema(
    {
        whichproductid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }
)

const Orderitem = mongoose.model('Orderitem', Orderitemschema)
export default Orderitem