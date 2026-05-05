# Redux Toolkit Ecommerce

A production-style ecommerce product listing built to demonstrate real-world Redux Toolkit patterns — async data fetching, global state management, search filtering, and responsive UI.

![React](https://img.shields.io/badge/React-18-blue)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.0-purple)
![Vite](https://img.shields.io/badge/Vite-5.0-yellow)

## Live Demo

🔗 [View Live](#)

---

## What This Demonstrates

| Concept | Implementation |
|---------|---------------|
| `createAsyncThunk` | API call lives in Redux, not component |
| `extraReducers` | Handles pending, fulfilled, rejected states |
| `createSlice` | State + reducers in one place |
| `useSelector` | Component reads from store |
| `useDispatch` | Component dispatches actions |
| Search | Filtered inside Redux, not component |
| Responsive Grid | 4 → 3 → 2 → 1 columns |

---

## Architecture

**Component layer** — App.jsx dispatches actions and reads from store via useSelector. No business logic lives here.

**State layer** — productsSlice manages all state: fetching products via createAsyncThunk, handling loading/error/data via extraReducers, and filtering via setSearch reducer.

**Store** — Single configureStore instance wrapped around the app via Provider.

---

## Folder Structure

```
src/
├── slices/
│   └── productsSlice.js
├── store.js
├── App.jsx
├── App.css
└── main.jsx
```

---

## Key Code

### API call in Redux — not component

```javascript
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const res = await fetch('https://fakestoreapi.com/products')
    return res.json()
  }
)
```

### extraReducers — handles all 3 async states

```javascript
extraReducers: (builder) => {
  builder
    .addCase(fetchProducts.pending, (state) => {
      state.loading = true
    })
    .addCase(fetchProducts.fulfilled, (state, action) => {
      state.data = action.payload
      state.filtered = action.payload
    })
    .addCase(fetchProducts.rejected, (state, action) => {
      state.error = action.error.message
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

## Run Locally

```bash
git clone https://github.com/s-jaiswal622/redux-toolkit-ecommerce.git
cd redux-toolkit-ecommerce
npm install
npm run dev
```

---

## Tech Stack

React 18 · Redux Toolkit · Vite · CSS Grid