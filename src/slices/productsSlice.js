import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// API call in Redux — not in component
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const res = await fetch('https://fakestoreapi.com/products')
    return res.json()
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    data: [],
    filtered: [],
    loading: false,
    error: null,
    searchQuery: ''
  },
  reducers: {
    setSearch: (state, action) => {
      state.searchQuery = action.payload
      state.filtered = state.data.filter(p =>
        p.title.toLowerCase()
          .includes(action.payload.toLowerCase())
      )
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.filtered = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export const { setSearch } = productsSlice.actions
export default productsSlice.reducer