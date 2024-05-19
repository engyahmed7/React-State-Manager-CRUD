import React, { useEffect } from 'react';
import styles from './Products.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getProducts } from '../../Store/Actions/ProductsAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export default function Products() {
    const products = useSelector(state => state.products.list);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const handleAddToCart = ()=>{
        dispatch(addToCart());
    }

    return (
        <div className={styles.products_container}>
            <h1>Products</h1>
            <div className="row">
                {products && products.length > 0 ? (
                    products.map(product => (
                        <div className="col-md-4" key={product.id}>
                            <div className={styles.card}>
                                <img src={product.image} alt={product.title} className={styles.card_img} />
                                <div className={styles.card_body}>
                                    <h5 className={styles.card_title}>{product.title}</h5>
                                    <p className={styles.card_text}>{product.description}</p>
                                    <p className={styles.card_text}>${product.price}</p>
                                    <div className={styles.add_to_cart}>
                                        <Link to={`/redux/products/${product.id}`} className={`btn ${styles.btn_primary}`}>View Details</Link>
                                        <button className={styles.btn_cart} onClick={()=>handleAddToCart()} >
                                            <FontAwesomeIcon icon={faShoppingCart} className={styles.cart_icon} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <output className={styles.spinner_border}>
                        <span className="visually-hidden">Loading...</span>
                    </output>
                )}
            </div>
        </div>
    );
}
