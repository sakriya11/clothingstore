import { Component,state,addProduct,changeHandler,fileHandler } from "react";
import axios from "axios";
import './AddProduct.css'
import { data } from "jquery";
import swal from 'sweetalert'


class AddProduct extends Component{
    
    state = {
        pname:'',
        pdesc:'',
        pprice:'',
        ppimage:'',
        category:"Male",
        config :{ //to check the tokenn of the user
            headers : {
                authorization: `Bearer ${localStorage.getItem('token')}` 
            }
        }
    }
    fileHandler = (e)=>{
        this.setState({
           [e.target.name]  : e.target.files[0]
        })
    }
   
    addProduct =(e)=>{
        e.preventDefault();//prevent from default behaviour(refresh) 
        const productData = new FormData()
           productData.append( 'pname' , this.state.pname)
           productData.append('pdesc' , this.state.pdesc) 
           productData.append('pprice' , this.state.pprice) 
            productData.append('pimage' , this.state.pimage)
            productData.append('category',this.state.category)
            
    
        axios.post("http://localhost:90/product/insert",productData, this.state.config)
        .then((response)=>{
                if(response.data.success == true)
                {
                    swal({
                        "title":"Success!!",
                        "text":"Added",
                        "icon":"success"
                    })
                }
        })
        .catch((err)=>{
                console.log(err.response)
        })
    }
   
    

    changeHandler = (e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    render(){
        return(
            <div className="add">

            <div className="add_container">
            <h1>Add Products</h1>
                 <form>
                <h5> Product Name</h5>
                   <input type="text" name="pname" value={this.state.pname} 
                    onChange={this.changeHandler}/>
              

                <h5>Product Description</h5>
                    <input type="text" name="pdesc" value={this.state.pdesc}
                    onChange={this.changeHandler}/>
               

                <h5>Product Price</h5>
                    <input type="text" name="pprice"  value={this.state.pprice}
                    onChange={this.changeHandler}/>
               

                <h5> Product image</h5>
                   <input type="file" name="pimage" 
                    onChange={this.fileHandler}/>
              

                <h5> Category</h5>
                   <select name="category" onChange={this.changeHandler}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
               

                <button className="btn_add btn text-black btn-success mr-3 " onClick={this.addProduct}>Add Product</button>
              
              

            </form>
            </div>
            </div>
        )
    }
}

export default AddProduct;