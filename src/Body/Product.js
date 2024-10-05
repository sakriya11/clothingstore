import React,{useState} from 'react'
import "./Product.css";
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Col,Row,Container} from 'react-bootstrap'
import swal from 'sweetalert'


function Product({title, image,description, price,id}) {
    
    let [auth,setAuth] = useState({
        "config":{
            "headers":{
                "authorization":`Bearer ${localStorage.getItem('token')}`
            }
        }
    })

   

    var userType = localStorage.getItem("userType");
    var token = localStorage.getItem("token");

    const addToCart = (e,id)=>
    {
        axios.post("http://localhost:90/addToCart/insert/"+id,{"quantity":1},auth.config)
        .then((response)=>{
            swal({
                "title":"Success",
                "text":"Cart Added",
                "icon":"success"
            })
            // window.location.href = "/checkout"
            
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const deleteProduct = (e,id)=>{
        
        axios.delete("http://localhost:90/product/delete/"+id,auth.config)
        .then((response)=>{
           

                window.location.href = "/male"
            
        })
        .catch((err)=>
        {
            console.log(err);
        }
        )
    }
      
    return (
       
        <div className="product">
            <img src ={`http://localhost:90/${image}`}/>
           <div className = "product_info">
              <p>{title}</p> 
              <p>{description}</p>
              <p className="product_price">
                    <small>$</small>
                    <strong>{price}</strong>
              </p>
            </div> 

        
        {
            userType == "Admin" || userType == "Seller"?
            (
                <>
                <Row>
                        <Col lg={6}>
                        <button className="btn_delete btn text-black btn-danger btn-block mr-3" onClick={(event)=>{deleteProduct(event,id)}}>Delete</button>
                        </Col>

                        <Col lg={6}>
                        <button className="btn_update btn text-black btn-outline-warning btn-block mr-3"><Link to={"/Update/"+id}>Update</Link></button>
                        </Col>
                </Row>
               
               
                </>
            ):
            (
               
                <button className="btn text-black btn-success mr-3" onClick={(event)=>{addToCart(event,id)}}>Add to Basket</button>
            )
        }
        
        
        </div>
           
    )
}


export default Product
