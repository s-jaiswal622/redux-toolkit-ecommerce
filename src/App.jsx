import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, setSearch } from './slices/productsSlice'
import './App.css'

function App() {
  const dispatch = useDispatch()
  const { filtered, loading, error, searchQuery } = useSelector(
    state => state.products
  )

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  if (loading) return <div className="loader">Loading...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="app">
      <h1>Products</h1>

      <input
        className="search"
        placeholder="Search products..."
        value={searchQuery}
        onChange={e => dispatch(setSearch(e.target.value))}
      />

      <div className="grid">
        {filtered.map(product => (
          <div key={product.id} className="card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p className="price">${product.price}</p>
            <p className="category">{product.category}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App