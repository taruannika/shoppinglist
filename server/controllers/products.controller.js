import { StatusCodes } from "http-status-codes";
import Product from "../models/product.model.js";
import { validationResult } from "express-validator";
import { BadRequestError, NotFoundError } from "../errors/customError.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.status(StatusCodes.OK).json(products);
  } catch (error) {
    next(error);
  }
};
export const createProduct = async (req, res, next) => {
  try {
    // Validation handled in router
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new BadRequestError(errors.array().map((er) => er.msg));
    }
    // create new product and save to DB
    const product = await Product.create(req.body);
    res.status(StatusCodes.CREATED).json(product);
  } catch (error) {
    next(error);
  }
};
export const updateProduct = async (req, res, next) => {
  try {
    // get id
    const { id } = req.params;
    // validation handled in router
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new NotFoundError(errors.array().map((er) => er.msg));
    }
    // update product
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(StatusCodes.OK).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};
export const deleteProduct = async (req, res, next) => {
  try {
    // get id
    const { id } = req.params;
    // validation handled in router
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new NotFoundError(errors.array().map((err) => err.msg));
    }
    // delete product from db
    await Product.findByIdAndDelete(id);
    res
      .status(StatusCodes.NO_CONTENT)
      .json({ message: "Successfully deleted" });
  } catch (error) {
    next(error);
  }
};
