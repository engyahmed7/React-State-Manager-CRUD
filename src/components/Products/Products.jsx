import React, { useContext } from 'react';
import ProductContext from '../ContextAPI/ProductContext';
import styles from './Products.module.css'; // Import your custom CSS file for styling
import { Link } from 'react-router-dom';

export default function Products() {
  let { products, getProductById, productDetails } = useContext(ProductContext);

  console.log("Products", products);
  

    return (
        <div className={styles.products_container}>
            <h1 className="text-center mb-5">Products</h1>
            <div className="row">
                {products ? (
                    products.map(product => (
                        <div className="col-md-4" key={product.id}>
                            <div className={styles.card}>
                                <img src={product.image} alt="" className={styles.card_img} />
                                <div className="card-body p-3">
                                    <h5 className="card-title mb-2">{product.title}</h5>
                                    <p className="card-text">{product.description}</p>
                                    <p className="card-text">${product.price}</p>
                                </div>
                                <div className="card-footer">
                                    <Link to={`/products/${product.id}`} className="btn btn-primary my-3 w-100">View Details</Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>

                )}
            </div>
        </div>
    );
}
