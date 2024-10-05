import React from "react";
import { Component, updateProduct, changeHandler,fileHandler } from "react";
import axios from "axios";
import { Container, state } from "react-bootstrap";
import { withRouter } from "react-router";
import './Update.css'

class Update extends Component {
  state = {
    pname: "",
    pdesc: "",
    pprice: "",
    ppimage: "",
    config: {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
    id: this.props.match.params.id,
  };

  componentDidMount() {
    console.log(this.props.match && this.props.match.params.param);

    const id = this.state.id;
    console.log(id);
    axios
      .get("http://localhost:90/product/single/" + this.props.match.params.id)
      .then((response) => {
        this.state.pname = response.data.data.pname;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateProduct = (e) => {
    e.preventDefault();
    const productData = {
      pname: this.state.pname,
      pdesc: this.state.pdesc,
      pprice: this.state.pprice,
      pimage: this.state.pimage,
      id: this.props.match.params.id,
    };
    let formData = new FormData();
    formData.append("pname",this.state.pname);
    formData.append("pdesc",this.state.pdesc);
    formData.append("pprice",this.state.pprice);
    formData.append("pimage",this.state.pimage);
    formData.append("id",this.state.id);
    axios
      .put(
        "http://localhost:90/product/update",
        formData,
        this.state.config
      )
      .then((response) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  fileHandler = (e)=>{
  
    this.setState({
      [e.target.name] : e.target.files[0]
    });

  }
  render() {
    return (
      <div className="update">
      <div className="update_container">
        <h1>Update</h1>

        <form>
          <h5>Name</h5>
            <input
              type="text"
              name="pname"
              value={this.state.pname}
              onChange={this.changeHandler}
            />
         

          <h5>Description</h5>
            <input
              type="text"
              name="pdesc"
              value={this.state.pdesc}
              onChange={this.changeHandler}
            />
        

          <h5>Price</h5>
            <input
              type="text"
              name="pprice"
              value={this.state.pprice}
              onChange={this.changeHandler}
            />
         

          
            <input type="file" name="pimage" onChange={this.fileHandler} />
         

          <button className="btn text-black btn-outline-primary mr-3" onClick={this.updateProduct}>
            Update
          </button>
        </form>
      </div>
      </div>
    );
  }
}

export default withRouter(Update);
