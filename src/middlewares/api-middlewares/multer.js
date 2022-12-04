import express from "express";
import multer from "multer";

const productImageUpload = multer({
  dest: __dirname + "/../../../public/images/product-images/",
});

export { productImageUpload };
