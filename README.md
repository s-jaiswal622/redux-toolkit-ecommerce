# Redux Toolkit Ecommerce

A production-style ecommerce product listing built to demonstrate real-world Redux Toolkit patterns.

![React](https://img.shields.io/badge/React-18-blue)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.0-purple)
![Vite](https://img.shields.io/badge/Vite-5.0-yellow)

## Live Demo
🔗 [View Live](#) ← add after deploy

---

## What This Demonstrates

- `createAsyncThunk` — API call lives in Redux, not component
- `extraReducers` — handles pending, fulfilled, rejected automatically
- `createSlice` — state + reducers in one place
- `useSelector` + `useDispatch` — clean component integration
- Search — filtered inside Redux, not component level
- Responsive CSS Grid — 4 → 3 → 2 → 1 columns

---

## Architecture
main.jsx
└── Provider (wraps app with store)
└── App.jsx
├── dispatches fetchProducts() on mount
├── dispatches setSearch() on input
└── reads filtered, loading, error from store
store.js
└── products slice
├── fetchProducts (createAsyncThunk → API call)
├── extraReducers (pending → loading, fulfilled → data, rejected → error)
└── setSearch (filters data inside Redux)
---

## Folder Structure
src/
├── slices/
│   └── productsSlice.js   ← async thunk + extraReducers + search
├── store.js               ← configureStore
├── App.jsx                ← UI + dispatch + useSelector
├── App.css                ← responsive grid
└── main.jsx               ← Provider setup

---

## Key Concepts

### extraReducers — why it matters
```javascript
extraReducers: (builder) => {
  builder
    .addCase(fetchProducts.pending, (state) => {
      state.loading = true   // show spinner
    })
    .addCase(fetchProducts.fulfilled, (state, action) => {
      state.data = action.payload  // store data
    })
    .addCase(fetchProducts.rejected, (state, action) => {
      state.error = action.error.message  // show error
    })
}
```

### Search inside Redux — not component
```javascript
setSearch: (state, action) => {
  state.searchQuery = action.payload
  state.filtered = state.data.filter(p =>
    p.title.toLowerCase()
      .includes(action.payload.toLowerCase())
  )
}
```

---

## Tech Stack

- React 18
- Redux Toolkit
- Vite
- CSS Grid

---

## Run Locally

```bash
git clone https://github.com/s-jaiswal622/redux-toolkit-ecommerce.git
cd redux-toolkit-ecommerce
npm install
npm run dev
```