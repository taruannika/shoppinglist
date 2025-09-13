import express from "express";
import { body, param } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/products.controller.js";
import Product from "../models/product.model.js";
import { ConflictError, NotFoundError } from "../errors/customError.js";

const router = express.Router();

router
  .route("/")
  .get(getAllProducts)
  .post(
    // validate field: name
    body("name")
      .notEmpty()
      .withMessage("Product name is required")
      .bail()
      // don't add duplicates
      .custom(async (name) => {
        const product = await Product.findOne({ name });
        if (product) {
          throw new ConflictError(`product is already added to shoppinglist`);
        }
      }),

    createProduct
  );
router
  .route("/:id")
  .patch(
    // validate params: id
    param("id")
      // check valid mondo id
      .isMongoId()
      .bail()
      .withMessage("Invalid product ID")
      // check that product with id is in db
      .custom(async (id) => {
        const product = await Product.findById(id);
        if (!product) {
          throw new NotFoundError("Product not found");
        }
      }),
    updateProduct
  )
  .delete(
    // validate params: id
    param("id")
      // check valid mondo id
      .isMongoId()
      .bail()
      .withMessage("Invalid product ID")
      // check that product with id is in db
      .custom(async (id) => {
        const product = await Product.findById(id);
        if (!product) {
          throw new NotFoundError("Product not found");
        }
      }),
    deleteProduct
  );

export default router;
