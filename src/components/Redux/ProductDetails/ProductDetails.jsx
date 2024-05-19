import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './ProductDetails.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteProduct, getProductDetails } from '../../Store/Actions/ProductsAction';

export default function ProductDetails() {
    const productDetails = useSelector(state => state.products.productDetails);
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductDetails(id));
    }, [dispatch, id]);

    const handleAddToCart = ()=>{
        dispatch(addToCart());
    }


    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
        navigate('/redux/products');
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Product Details</h1>
            {productDetails ? (
                <div className="row">
                    <div className={`col-md-4 ${styles.imageContainer}`}>
                        <img src={productDetails.image} alt={productDetails.title} className="img-fluid" />
                    </div>
                    <div className={`col-md-7 offset-1 ${styles.detailsContainer}`}>
                        <h2 className={styles.productTitle}>{productDetails.title}</h2>
                        <p className={styles.description}>{productDetails.description}</p>
                        <p className={styles.price}>${productDetails.price}</p>
                        <div className={styles.buttonGroup}>
                            <button className={`btn ${styles.addButton}`} onClick={()=>handleAddToCart()}>Add to Cart</button>
                            <Link to={`/redux/products/${productDetails.id}/edit`} className={`btn ${styles.editButton}`}>
                                Edit
                            </Link>
                            <button className={`btn ${styles.deleteButton}`} onClick={() => handleDelete(productDetails.id)}>Delete</button>
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
