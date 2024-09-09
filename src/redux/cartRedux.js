import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0
    },
    reducers: {
        addProduct: (state, action) => {
            const { _id, price, quantity } = action.payload;
            const existingProduct = state.products.find(product => product._id === _id);
            
            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                state.products.push(action.payload);
            }

            state.quantity += quantity;
            state.total += price * quantity;
        },
        removeProduct: (state, action) => {
            const productId = action.payload;
            const productIndex = state.products.findIndex(product => product._id === productId);
            if (productIndex !== -1) {
                const removedProduct = state.products[productIndex];
                const removedQuantity = removedProduct.quantity || 1; 
                state.products.splice(productIndex, 1);
                state.quantity -= removedQuantity; 
                state.total -= removedProduct.price * removedQuantity; 
            }
        },
        increaseQuantity: (state, action) => {
            const productId = action.payload;
            const product = state.products.find(product => product._id === productId);
            if (product) {
                product.quantity += 1;
                state.quantity += 1;
                state.total += product.price;
            }
        },
        decreaseQuantity: (state, action) => {
            const productId = action.payload;
            const product = state.products.find(product => product._id === productId);
            if (product && product.quantity > 1) {
                product.quantity -= 1;
                state.quantity -= 1;
                state.total -= product.price;
            }
        },
        resetCart: (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        }
    }
});

export const { addProduct, removeProduct, increaseQuantity, decreaseQuantity, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
