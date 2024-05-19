import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './EditProduct.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct } from '../../Store/Actions/ProductsAction';

export default function EditProduct() {
    const [error, setError] = useState(null);
    const [data, setData] = useState({
        title: "",
        description: "",
        price: 0,
        image: ""
    });
    const productDetails = useSelector(state => state.products.productDetails);
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (productDetails) {
            setData(productDetails);
        }
    }, [productDetails]);

    const handleChange = (e) => {
        let formData = { ...data };
        formData[e.target.name] = e.target.value;
        setData(formData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.title === "" || data.description === "" || data.price === 0 || data.image === "") {
            setError("Please fill all the fields");
        } else {
            dispatch(updateProduct(id,data));
            navigate('/redux/products');
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Edit Product</h1>
            {error && <div className={`alert alert-danger ${styles.alert}`}>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group mt-2">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" name="title" id="title" value={data.title} onChange={handleChange} />
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" name="description" id="description" value={data.description} onChange={handleChange} />
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="number" className="form-control" name="price" id="price" value={data.price} onChange={handleChange} />
                </div>
                <div className="form-group mt-2 mb-4">
                    <label htmlFor="image" className="form-label">Image</label>
                    <input type="text" className="form-control" name="image" id="image" value={data.image} onChange={handleChange} />
                </div>
                <button type="submit" className={styles.button}>Edit Product</button>
            </form>
        </div>
    );
}
