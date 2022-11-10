import express from "express";
import multer from "multer";

console.log("__dirname");
console.log(__dirname);
const productImageUpload = multer({
  dest: __dirname + "/../../public/images/product-images/",
});

export { productImageUpload };
