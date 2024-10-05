import React,{useState,useEffect,details} from 'react'
import"./Checkout.css";
import Footer from "../Footer/Footer";
import { Link } from 'react-router-dom';
import {Col,Row,Container,Card,Button} from 'react-bootstrap'
import axios from 'axios';
import DeleteProduct from './deleteProduct';
import { withRouter } from "react-router";



function Checkout() {
    let [myCart,setCart] = useState([]);
    let [auth,setAuth] = useState({
        "config":{
            "headers":{
                "authorization":`Bearer ${localStorage.getItem('token')}`
            }
        }
    })
    useEffect(()=>{
        axios.get('http://localhost:90/getMyCart',auth.config)
        .then((response)=>{
          console.log(response)
            setCart(
                response.data.data
            )
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])
    const deleteProduct = (e,id)=>{
        
        axios.delete("http://localhost:90/cart/delete/"+id,auth.config)
        .then((response)=>{
           

                window.location.href = "/checkout"
            
        })
        .catch((err)=>
        {
            console.log(err);
        }
        )
    }
    return (
        
        <div className="checkout">
           <div className="checkout_left">
               <Link to="/Update">
            <img 
                className="checkout_banner" 
                src="https://284859-881315-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2018/02/combined-tial-40.jpg"/>  
                </Link> 
             <div>
                <h2 className="checkout_title">
                    Your shopping basket</h2>
                <Row>
                {
                    myCart.map((item)=>{
                        
                        return(
                            
                        <div className="cart">
                        <img src ={`http://localhost:90/${item.pid.pimage}`}/>
                       <div className = "cart_product_info">{item.pid.pname}
                          <p>{item.pid.title}</p> 
                          <p>Quantity: {item.quantity}</p>
                          <p className="cart_product_price">
                                <small>Price $</small>
                                <strong>{item.price}</strong>
                          </p>
                          <Row>
                          <Col lg={4}>
                        
                        </Col>
                        <Col lg={4}>
                       
                        
      <button data-toggle="modal" className="btn text-black btn-danger btn-lg-3 mr-3 px-lg-5 " data-target={`#delete${item._id}`} >Delete</button>
                        <Link className="btn text-black btn-outline-warning btn-lg-3 mr-3 px-lg-5 " to={"/updatecheckout/"+item._id}>Update</Link>
                   
                     
                        </Col>

                        <Col lg={4}>
                        
                        </Col>
                </Row>
                
                        </div>
                        <DeleteProduct item={item} key={item._id}/>
                        </div>
                        
                        )
                         
                    })
                }
                </Row>
            </div>
            

          

           

          
        </div>
<Footer/>
        </div>
        


)

}

export default withRouter(Checkout); 
