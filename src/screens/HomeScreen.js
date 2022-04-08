import React, { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
// import data from '../data';
import axios from 'axios';
import logger from 'use-reducer-logger';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    loading: true,
    products: [],
    error: '',
  });
  // /... usestate function returns an array that contains a variable and function to update this variable.../
  // const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('http://localhost:5000/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }

      //setProducts(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      {' '}
      <h1>Featured products</h1>
      <div className="products">
        {loading ? (
          <div> Loading...</div>
        ) : error ? (
          <div> {error} </div>
        ) : (
          products.map((product) => (
            <div className="product" key={product.slug}>
              <Link to={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name} />
              </Link>
              <div className="product-info">
                <Link to={`/product/${product.slug}`}>
                  <p>{product.name}</p>
                </Link>

                <p>
                  <strong>${product.price}</strong>
                </p>

                <button>Add to cart</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
