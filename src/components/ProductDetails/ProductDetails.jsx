import React, { useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProductContext from '../ContextAPI/ProductContext';
import styles from './ProductDetails.module.css';

export default function ProductDetails() {
    const { productDetails, getProductById , deleteProduct } = useContext(ProductContext);
    const { id } = useParams();
    const Navigate = useNavigate();

    useEffect(() => {
        getProductById(id);
    }, [id, getProductById]);


    let handleDelete = (id) => {
        Navigate('/products')
        deleteProduct(id)
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Product Details</h1>
            {productDetails ? (
                <div className="row">
                    <div className={`col-md-4 ${styles.imageContainer}`}>
                        <img src={productDetails.image} alt="" className="img-fluid" />
                    </div>
                    <div className={`col-md-8 ${styles.detailsContainer}`}>
                        <h2 className={styles.productTitle}>{productDetails.title}</h2>
                        <p className={styles.description}>{productDetails.description}</p>
                        <p className={styles.price}>${productDetails.price}</p>
                        <div className={styles.buttonGroup}>
                            <button className={`btn btn-primary ${styles.addButton}`}>Add to Cart</button>
                            <Link to={`/products/${productDetails.id}/edit`} className={`btn btn-warning ${styles.editButton}`}>
                                Edit
                            </Link>
                            <button className={`btn btn-danger ${styles.deleteButton}`} onClick={()=> handleDelete(productDetails.id)} >Delete</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
        </div>
    );
}
