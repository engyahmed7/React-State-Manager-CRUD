import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CreateProduct.module.css';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../Store/Actions/ProductsAction';

export default function CreateProduct() {
    const [error, setError] = useState(null);
    let Navigator = useNavigate();
    // const products = useSelector(state => state.products.list);
    const dispatch = useDispatch();

    const [data, setData] = useState({
        title: "",
        description: "",
        price: 0,
        image: ""
    });

    const handleChange = (e) => {
        let formData = { ...data };
        formData[e.target.id] = e.target.value;
        setData(formData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.title === "" || data.description === "" || data.price === 0 || data.image === "") {
            setError("Please fill all the fields");
        } else {
            dispatch(createProduct(data));
            Navigator('/redux/products');
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Create Product</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className='form-group mt-2'>
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" onChange={handleChange} />
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" onChange={handleChange} />
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="number" className="form-control" id="price" onChange={handleChange} />
                </div>
                <div className="form-group mt-2 mb-4">
                    <label htmlFor="image" className="form-label">Image</label>
                    <input type="text" className="form-control" id="image" onChange={handleChange} />
                </div>
                <button type="submit" className={styles.button}>Add Product</button>
            </form>
        </div>
    );
}
