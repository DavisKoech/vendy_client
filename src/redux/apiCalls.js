import {apiRequests} from "../utils/requestMethods"
import { createProductFailure, createProductStart, createProductSuccess, deleteProductFailure, deleteProductStart, deleteProductSuccess, getProductsFailure, getProductsStart, getProductsSuccess, updateProductFailure, updateProductStart, updateProductSuccess } from "./productsRedux"

import {
    createBusinessFailure, createBusinessStart, createBusinessSuccess,
    deleteBusinessFailure, deleteBusinessStart, deleteBusinessSuccess,
    getBusinessesFailure, getBusinessesStart, getBusinessesSuccess,
    updateBusinessFailure, updateBusinessStart, updateBusinessSuccess
} from "./businessRedux";

//getting all products
export const getProducts = async (dispatch) => {
    dispatch(getProductsStart())
    try{
        const res = await apiRequests.get("/products")
        dispatch(getProductsSuccess(res.data))
    }catch(err){
        dispatch(getProductsFailure())
    }
}


//creating a product
export const createProduct = async (product,dispatch) => {
    dispatch(createProductStart())
    try{
        const res = await apiRequests.post(`/products`,product)
        dispatch(createProductSuccess(res.data))
    }catch(err){
        dispatch(createProductFailure())
    }
}

//updating a product
export const updateProduct = async (id,product,dispatch) => {
    dispatch(updateProductStart())
    try{
        await apiRequests.put(`/products/${id}`,product)
        dispatch(updateProductSuccess({id,product}))
    }catch(err){
        dispatch(updateProductFailure())
    }
}

//deleting a product
export const deleteProduct = async (id,dispatch) => {
    dispatch(deleteProductStart())
    try{
        await apiRequests.delete(`/products/${id}`)
        dispatch(deleteProductSuccess(id))
    }catch(err){
        dispatch(deleteProductFailure())
    }
}

// getting all businesses
export const getBusinesses = async (dispatch) => {
    dispatch(getBusinessesStart());
    try {
        const res = await apiRequests.get("/businesses");
        dispatch(getBusinessesSuccess(res.data));
    } catch (err) {
        dispatch(getBusinessesFailure());
    }
};

// creating a business
export const createBusiness = async (business, dispatch) => {
    dispatch(createBusinessStart());
    try {
        const res = await apiRequests.post(`/businesses`, business);
        dispatch(createBusinessSuccess(res.data));
    } catch (err) {
        dispatch(createBusinessFailure());
    }
};

// updating a business
export const updateBusiness = async (id, business, dispatch) => {
    dispatch(updateBusinessStart());
    try {
        await apiRequests.put(`/businesses/${id}`, business);
        dispatch(updateBusinessSuccess({ id, business }));
    } catch (err) {
        dispatch(updateBusinessFailure());
    }
};

// deleting a business
export const deleteBusiness = async (id, dispatch) => {
    dispatch(deleteBusinessStart());
    try {
        await apiRequests.delete(`/businesses/${id}`);
        dispatch(deleteBusinessSuccess(id));
    } catch (err) {
        dispatch(deleteBusinessFailure());
    }
};