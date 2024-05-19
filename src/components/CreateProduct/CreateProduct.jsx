import React, { useContext, useState } from 'react'
import ProductContext from '../ContextAPI/ProductContext';
import { useNavigate } from 'react-router-dom';

export default function CreateProduct() {
    const [error , setError] = useState(null)
    let { CreateProduct } = useContext(ProductContext);
    let Navigator = useNavigate()

    const [data , setData] = useState({
        title: "",
        description: "",
        price: 0,
        image: ""
    })



    const handleChange = (e) => {
        let formData = {...data};
        formData[e.target.id] = e.target.value
        setData(formData)
        console.log(formData);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if(data.title === "" || data.description === "" || data.price === 0 || data.image === ""){
            setError("Please fill all the fields")
        }else{
            Navigator('/products')
            CreateProduct(data)
        }
    }

  return (
    <div>
        <h1 className='mt-3 text-center display-4'>Create Product</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label" >Title</label>
                <input type="text" className="form-control" name="title" id="title" onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label" >Description</label>
                <input type="text" className="form-control" name="description" id="description" onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">Price</label>
                <input type="number" className="form-control" name="price" id="price" onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="image" className="form-label">Image</label>
                <input type="text" className="form-control" name="image" id="image" onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary">Add Product</button>
        </form>
    </div>
  )
}
