import React,{useState} from 'react'
import axios from 'axios';

function DeleteProduct(props) {
    let [auth,setAuth] = useState({
        "config":{
            "headers":{
                "authorization":`Bearer ${localStorage.getItem("token")}`
            }
        }
    })
    const deleteProduct = (e)=>{
        axios.delete("http://localhost:90/cart/delete/"+item._id,auth.config)
        .then((response)=>{
            window.location.href = "/checkout"
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    let {item} = props;
    return (
        <div>
            <div class="modal fade " id={`delete${item._id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog  deleteModel">
                    <div class="modal-content modal__design">
                    <div class="modal-header">
                        <h5 class="modal-title text-black" id="exampleModalLabel">Delete Booking</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" className="text-white">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body ">
                        <p className="text-black"> Do you really want to delete your booking? </p>
                        <div className="text-center">
                      
                        <button className=" btn text-black btn-danger btn-lg-3 mr-3 px-lg-5 " onClick={(event)=>{deleteProduct(event,item._id)}}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
      </div>
        </div>
    )
}

export default DeleteProduct
