import React from 'react';
import '../page/Addproduct.css';
import '../api/product';
const AddProduct = () => {
    return(
        <>
            <div className="header" id="header">     
                <form id="form">
                    <h2>Product List</h2>
                    <input type="text" name='todo' id='title' placeholder="Product Name" required/>
                    <textarea type="text" name='todo' id='desc' placeholder="Description" required/>
                    <input type="number" name='todo' id='price' placeholder="Amount of Price" required/>
                    <input type="submit" className="addBtn" value="Add"/>
                </form>
            </div>
            <div id="todo-list"/>
        </>
    )
}
export default AddProduct;