import React from "react";
import { Component } from "react";
import { Link, useHistory } from "react-router-dom";
import data from "../data";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { withAlert } from 'react-alert';


export default class Checkout extends Component {
    constructor(props){
        super(props);
        this.state = {
            card: ""
    
        };
  
    };

    handleCardChange = (e) => {
        this.setState({card: e.target.value});
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

  render() {
    const { cartItems } = this.props;
    
    return (
        
      <Modal isOpen={true}>
        <Zoom>
          <div>
            *ORDER NOT PROCESSED YET, YOU MAY GO BACK TO CONTINUE SHOPPING!*
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
          <div>
            Total: ${cartItems.reduce((a, c) => a + c.price * c.count, 0)}
          </div>
          
                <form onSubmit={e=>this.payNow(e,cartItems)}>
          <ul>

              <li>
                <label>Credit Card Number</label>
                     <input name="Card Number"  value={this.state.card} type="text" required onChange={this.handleCardChange}></input>
                     </li>
                     <li>
            <button disabled={!(this.state.card)}
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
