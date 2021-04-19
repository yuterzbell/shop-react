import React from "react";
import { Component } from "react";
import { Link, useHistory } from "react-router-dom";
import data from "../data";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";




export default class Checkout extends Component {
    constructor(props){
        super(props);
        this.state = {
            card: ""
    
        };
  
    };

    handleNameChange = (e) => {
        this.setState({name: e.target.value});
      };

      handleAddressChange = (e) => {
        this.setState({address: e.target.value});
      };

      handleCardNameChange = (e) => {
        this.setState({cardName: e.target.value});
      };

      handleCardNumChange = (e) => {
        this.setState({cardNum: e.target.value});
      };

      handleCardExpChange = (e) => {
        this.setState({cardExp: e.target.value});
      };

      handleCardCodeChange = (e) => {
        this.setState({cardCode: e.target.value});
      };


  payNow = (e, items) => {
    e.preventDefault();
    /*items.map((item) => this.props.removeFromCart(item));*/
    this.props.clearCart();
    window.location.href = "/";

    
    alert("Your order has been placed! Click OK to SHOP more! ")
    

  };

  handleInput = (e) =>{

    this.setState({[e.target.name]: e.target.value });
};

    goBack = () =>{
        window.location.href = "/";

    };

  render() {
    const { cartItems } = this.props;
    
    return (
        
      <Modal isOpen={true}>
        <Zoom>
          <div>
            <button className="button primary" onClick={() => this.goBack()}>GO BACK TO STORE PAGE</button>

          </div>
          <div className="checkoutTitle">CHECKOUT & PLACE ORDER</div>

          <div className="cart">
            <ul className="cart-items-checkout">
              {cartItems.map((item) => (
                <li key={item._id}>
                  <div>
                    <img src={item.image} alt={item.title}></img>
                  </div>
                  <div>{item.title}</div>
                  <div>
                    ${item.price} x {item.count}{" "}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="finalPrice">
            Total: ${cartItems.reduce((a, c) => a + c.price * c.count, 0)}
          </div>
          
                <form onSubmit={e=>this.payNow(e,cartItems)}>
          <ul className="checkout-items">
          <h3>Shipping Information</h3>
              <li>
                     <input placeholder="name" name="name"  value={this.state.name} type="text" required onChange={this.handleNameChange}></input>
                     </li>

                     <li>
                     <input placeholder="full address" name="address"  value={this.state.address} type="text" required onChange={this.handleAddressChange}></input>
                     </li>
                        <h3>Billing Information</h3>
                     <li>
                     <input placeholder="name on card" name="Card name"  value={this.state.cardName} type="text" required onChange={this.handleCardNameChange}></input>
                     </li>

                     <li>
                     <input placeholder="credit card #" name="Card number"  value={this.state.cardNum} type="text" required onChange={this.handleCardNumChange}></input>
                     </li>

                     <li>
                     <input placeholder="exp. date (MMYY)" name="Card exp date"  value={this.state.cardExp} type="text" required onChange={this.handleCardExpChange}></input>
                     </li>

                     <li>
                     <input placeholder="CSC" name="Card code"  value={this.state.cardCode} type="text" required onChange={this.handleCardCodeChange}></input>
                     </li>

                     <li>
            <button className="button primary" disabled={!(this.state.name && this.state.address && this.state.cardName && this.state.cardNum && this.state.cardExp && this.state.cardCode)}
                onClick={() => cartItems.map((item) => this.props.removeFromCart(item))}
                type="submit"
            >
              Order Now!
            </button>
            </li>
            </ul>
            </form>
          
        </Zoom>
      </Modal>
    );
  }
}
