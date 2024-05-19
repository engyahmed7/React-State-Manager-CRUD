import React, { useContext, useEffect, useState } from 'react'
import ProductContext from '../ContextAPI/ProductContext';
import { useNavigate } from 'react-router-dom';

export default function EditProduct() {
    const [error , setError] = useState(null)
    let {productDetails , updateProduct} = useContext(ProductContext);
    const [data, setData] = useState({
        title: "",
        description: "",
        price: 0,
        image: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (productDetails) {
            setData(productDetails);
        }
    }, [productDetails]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if(data.title === "" || data.description === "" || data.price === 0 || data.image === ""){
            setError("Please fill all the fields")
        }else{
            navigate('/products')
            updateProduct(data.id, data)
        }
    }


  return (
    <div>
    <h1 className='mt-3 text-center display-4'>Edit Product</h1>
    {error && <div className="alert alert-danger">{error}</div>}
    <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" name="title" id="title" value={data.title} onChange={handleChange} />
        </div>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" name="description" id="description" value={data.description} onChange={handleChange} />
        </div>
        <div className="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input type="number" className="form-control" name="price" id="price" value={data.price} onChange={handleChange} />
        </div>
        <div className="mb-3">
            <label htmlFor="image" className="form-label">Image</label>
            <input type="text" className="form-control" name="image" id="image" value={data.image} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Edit Product</button>
    </form>
</div>
  )
}
