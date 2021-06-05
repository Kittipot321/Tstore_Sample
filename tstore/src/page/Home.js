import React,{useState,useEffect} from 'react'
const Home = () => {
    const [product,setProduct] = useState([])
    const [newProduct,setNewProduct] = useState({
        name:"",
        description:"",
        price:""
    })
    const fetchData = async () =>{
        const response = await fetch('http://127.0.0.1:8000/api/product-list/')
        const product_data = await response.json()
        setProduct(product_data)
    }
    useEffect(() => {
        fetchData();
    },[])
    function handleSubmit(e){
        e.preventDefault();
        let url = "http://127.0.0.1:8000/api/product-create/"
        fetch(url,{
            method:"POST",
            headers:{ "Content-type":"application/json"},
            body: JSON.stringify(newProduct),
        })
        .then((response)=>{
            fetchData()
            setNewProduct({name:'',description:'',price:''})
        })
        .catch((err)=>console.log(err))
        .finally((e)=>alert("Add Product Success."))
    }
    return(
        <>
            <div>
                <p>Tstore (React.js + Django REST Framework)</p>
                <hr/>
                {product.map(data => {
                    return(
                    <div key={data.id}>
                        <h1>{data.name}</h1>
                        <p>{data.description}</p>
                        <p>Price : {data.price}</p>
                    </div>
                    )
                })}
            </div>
            <hr/>
            <div>
                <h3>Add Product</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name : </label>
                        <input
                            type="text"
                            value={newProduct.name}
                            onChange={(e)=> setNewProduct({...newProduct,name: e.target.value})}/>
                    </div>
                    <div>
                        <label>Description : </label>            
                        <textarea 
                            rows="4"
                            value={newProduct.description}
                            onChange={(e)=> setNewProduct({...newProduct,description: e.target.value})}/>
                    </div>
                    <div>
                        <label>Price : </label>            
                        <input
                            type="number"
                            value={newProduct.price}
                            onChange={(e)=> setNewProduct({...newProduct,price: e.target.value})}/>
                    </div>
                    <input id="submit" type="submit" value="Add Product"/>
                </form>
            </div>
        </>
    )
}
export default Home;