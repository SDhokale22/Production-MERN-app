import express from 'express'
import { ProductCountController, ProductFiltersController, ProductListController, ProductPhotoController, braintreePaymentController, braintreeTokenController, createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, relatedProductController, searchProductController, updateProductController } from '../controller/productController.js';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
import formidable from 'express-formidable';

const router = express.Router()

//routes
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

//get routes
router.get('/get-product', getProductController);

//single routes
router.get('/get-product/:slug', getSingleProductController);

//get photo
router.get('/product-photo/:pid', ProductPhotoController);

//delete product
router.delete('/delete-product/:pid', deleteProductController);

//update product
router.put(
    "/update-product/:pid",
    requireSignIn,
    isAdmin,
    formidable(),
    updateProductController
  );
  

//filter product
router.post('/product-filters', ProductFiltersController);

//product count
router.get('/product-count', ProductCountController);

//product per page
router.get('/product-list/:page', ProductListController);

//search product 
router.get('/search/:keyword', searchProductController);

//similar product 
router.get('/related-product/:pid/:cid', relatedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

//payment gateway
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, braintreePaymentController);

export default router;