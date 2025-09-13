import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: String,
    quantity: { type: Number, default: 1 },
    purchased: { type: Boolean, default: false },
  },
  { timestamps: true }
);

productSchema.set("toJSON", {
  transform: (document, product) => {
    product.id = product._id.toString();
    delete product._id;
    delete product.__v;
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
