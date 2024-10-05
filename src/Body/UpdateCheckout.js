import React, { Component,state,changeHandler,updateProductdata } from 'react'
import swal from 'sweetalert'
import axios from "axios";
import { withRouter } from 'react-router';
import './UpdateCheckout.css'


 class UpdateCheckout extends Component {
    state={
        quantity:""
        // id:

    }
    changeHandler=(e)=>{this.setState({
      [e.target.name]:e.target.value
    })}
    updateProductdata=(e)=>{
     
      e.preventDefault();
      axios.put("http://localhost:90/cart/update/"+this.props.match.params.id,{quantity:this.state.quantity})
      .then((response)=>{
       
        if(response.data.success == true)
        {
            swal({
                "title":"Success!!",
                "text":"Added",
                "icon":"success",
                "timer":3000
            })
            window.location.href = "/checkout"
        }
       
})
.catch((err)=>{
        console.log(err.response)
})


    }

    componentDidMount(){
      axios.get("http://localhost:90/get/myCart/"+this.props.match.params.id)
      .then((response)=>{
        if(response.data.success == true)
        {
          this.setState({
            quantity : response.data.data.quantity
        
          })
        }
      })
    }

    render() {
        return (
            <div className="updateCheckout">
                
      <div className="updateCheckout_container">
        <h1>Update</h1>

        <form>
          <h5>Quantity </h5>
            <input
              type="text"
              name="quantity"
              value={this.state.quantity}
              onChange={this.changeHandler}
            />
           
            <button   className="btn text-black btn-outline-primary mr-3" onClick={this.updateProductdata}>
            Update
          </button>
       
            
            </form>
            </div>
            </div>
    
           
     
        )
    }
}

export default withRouter(UpdateCheckout) 
