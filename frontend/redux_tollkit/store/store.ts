import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import slices from '../slices/idnex'
import autoriseSlice from '../slices/logRegSlice/autorisSlice'
import apis from '../api/index'

const persistConfig = {
    key: 'auth',
    storage,
    whitelist:['autorisStatus']

}
const apiReducers = Object.fromEntries(
    Object.values(apis).map((api) => [[api.reducerPath], api.reducer])
);
const slicesReducers = Object.fromEntries(
    Object.values(slices).map((slice) => [ slice.name, slice.reducer])
);
const apiMiddleware = Object.values(apis).map((api) => api.middleware);

const persistedReducer = persistReducer(persistConfig, autoriseSlice.reducer)

const store  = configureStore({
    reducer:{
        ...slicesReducers,
        autoriseSlice:persistedReducer,
        ...apiReducers,   
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            ignoredPaths: ['register', 'rehydrate'],
          },
    }).concat(apiMiddleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store)
export default store
