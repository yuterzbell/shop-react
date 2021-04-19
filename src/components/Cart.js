import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: "",
      showCheckout: false,
    };
  }

  /*handle change of state for text fields*/

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };
  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  render() {
    const { cartItems } = this.props;
    return (
      <div>
          {/*checking cart status*/}
        {cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is empty</div>
        ) : (
          <div className="cart cart-header">You have items in the cart </div>
        )}

        <div>
          <div className="cart">
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item._id}>
                  <div>
                    <img src={item.image} alt={item.title}></img>
                  </div>
                  <div>{item.title}</div>
                  <div className="right">
                    ${item.price} x {item.count}{" "}
                    {/*remove cart button*/}
                    <button onClick={() => this.props.removeFromCart(item)}>
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {cartItems.length !== 0 && (
            <div>
              <div className="cart">
                <div className="total">
                  <div>
                      {/*calculating the total price of cart*/}
                    Total: $
                    {cartItems.reduce((a, c) => a + c.price * c.count, 0)}
                  </div>
                  <button
                    onClick={() => {
                      this.setState({ showCheckout: true });
                    }}
                    className="button primary"
                  >
                    Proceed
                  </button>
                </div>
              </div>
              {this.state.showCheckout && (
                <div className="cart">
                  <form>
                    <ul className="form-container">
                      <li>
                        <label>Email</label>
                        <input
                          name="email"
                          type="email"
                          value={this.state.email}
                          required
                          onChange={this.handleEmailChange}
                        ></input>
                      </li>
                      <li>
                        <label>Name</label>
                        <input
                          name="name"
                          type="text"
                          value={this.state.name}
                          required
                          onChange={this.handleNameChange}
                        ></input>
                      </li>
                      <div className="checkout-link">
                        <Link to={"/checkout"}>
                            {/*checkout button - disabled until fields are filled*/}
                          <button
                            className="primary button"
                            disabled={!(this.state.email && this.state.name)}
                            type="submit"
                          >
                            CHECKOUT{" "}
                          </button>
                        </Link>
                      </div>
                    </ul>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
