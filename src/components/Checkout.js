import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import data from "../data";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";

export default class Cart extends Component {
  handleCloseModal = () => {};

  payNow = (e, cartI) => {
    e.preventDefault();
    cartI.map((item) => this.props.removeFromCart(item));


  };

  handleInput = (e) =>{

    this.setState({[e.target.name]: e.target.value });
}

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
                     <input name="Card Number" type="text" required onChange={this.handleInput}></input>
                     </li>
                     <li>
            <button 
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
