import {configureStore,combineReducers} from "@reduxjs/toolkit"
import {persistStore,persistReducer,FLUSH,REHYDRATE,PAUSE,
    PERSIST,PURGE,REGISTER} from "redux-persist";
import storage from "redux-persist/lib/storage";
import productsReducer from "./productsRedux"
import businessReducer from "./businessRedux";
import cartRedux from "./cartRedux";



const peristConfig = {key:"root",version:1,storage}

const rootReducer = combineReducers({product:productsReducer,business:businessReducer,cart:cartRedux,})


const persistedReducer = persistReducer(peristConfig,rootReducer)

export const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]}
      }),
})

export let persistor = persistStore(store);