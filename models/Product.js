import mongoose from "mongoose"

const Productschema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true
        },
        imagepath: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        }
    }
)

const Product = mongoose.model('Product', Productschema)
export default Product