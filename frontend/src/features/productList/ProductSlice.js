import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createProduct, fetchAllProductBrands, fetchAllProductCategory, fetchProducts, fetchProductsFilter, fetchProductsbyId, updateProductById } from "./ProductLIstApi";

export const incrementAsync = createAsyncThunk("counter/fetchCount", async (amount) => {
    const response = await fetchCount(amount);
    return response.data;
})


export const fetchProductsAsync = createAsyncThunk("productName/fetchProducts", async () => {
    const response = await fetchProducts();
    return response.data;
})

export const fetchProductsFilterAsync = createAsyncThunk("productName/fetchProductsFilter", async ({ filter, sort, pagination }) => {
    const response = await fetchProductsFilter(filter, sort, pagination);
    return response.data
})

export const fetchProductsCategoryAsync = createAsyncThunk("productName/fetchProductsCategory", async () => {
    const response = await fetchAllProductCategory();
    return response.data;
})

export const fetchProductsBrandsAsync = createAsyncThunk("productName/fetchProductsBrands", async () => {
    const response = await fetchAllProductBrands();
    return response.data
})

export const fetchProductByIdAsync = createAsyncThunk("productName/fetchProductById", async (id) => {
    const response = await fetchProductsbyId(id);
    return response.data
})

export const createProductAsync = createAsyncThunk("productName/createProduct", async (product) => {
    const response = await createProduct(product);
    return response.data
})

export const updateProductByIdAsync = createAsyncThunk("productName/updateProductById", async (product) => {
    const response = await updateProductById(product);
    return response.data
})

export const ProductSlice = createSlice({
    name: "productName",
    initialState: {
        list: [],
        totalItems: 0,
        category: [],
        brands: [],
        selectedProduct: null
    },
    reducers: {

        clearSelectedProduct: (state, action) => {
            state.selectedProduct = null;
        },
        increment: state => {
            state.value += 1
        },
        decrement: state => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(incrementAsync.pending, (state) => {
            state.status = "loading"
        }).addCase(incrementAsync.fulfilled, (state, action) => {
            state.status = "idle"
            state.value += action.payload
        }).addCase(fetchProductsAsync.pending, (state) => {
            state.status = "loading"
        }).addCase(fetchProductsAsync.fulfilled, (state, action) => {
            state.status = "idle"
            state.list = action.payload
        }).addCase(fetchProductsFilterAsync.pending, (state) => {
            state.status = "loading"
        }).addCase(fetchProductsFilterAsync.fulfilled, (state, action) => {
            state.status = "idle"
            state.list = action.payload.products;
            state.totalItems = action.payload.totalItems

        }).addCase(fetchProductsBrandsAsync.pending, (state) => {
            state.status = "loading"
        }).addCase(fetchProductsBrandsAsync.fulfilled, (state, action) => {
            state.status = "idle"
            state.brands = action.payload;

        }).addCase(fetchProductsCategoryAsync.pending, (state) => {
            state.status = "loading"
        }).addCase(fetchProductsCategoryAsync.fulfilled, (state, action) => {
            state.status = "idle"
            state.category = action.payload;
        }).addCase(fetchProductByIdAsync.pending, (state) => {
            state.status = "loading"
        }).addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
            state.status = "idle"
            state.selectedProduct = action.payload;


        }).addCase(createProductAsync.pending, (state) => {
            state.status = "loading"
        }).addCase(createProductAsync.fulfilled, (state, action) => {
            state.status = "idle"
            state.list.push(action.payload);


        }).addCase(updateProductByIdAsync.pending, (state) => {
            state.status = "loading"
        }).addCase(updateProductByIdAsync.fulfilled, (state, action) => {
            state.status = "idle"
            const index = state.list.findIndex(product => product.id === action.payload.id)
            state.list[index] = action.payload

        })
    }

})

export const { increment, decrement, incrementByAmount, clearSelectedProduct} = ProductSlice.actions;
export const selectProductBrands = (state) => state.Products.brands
export const selectProductCategory = (state) => state.Products.category
export const selectProductById = (state) => state.Products.selectedProduct;
export default ProductSlice.reducer;