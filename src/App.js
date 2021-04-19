import React from 'react';
import data from "./data.json";
import Products from "./components/Products";
import Checkout from "./components/Checkout";
import Cart from "./components/Cart";
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import store from "./store";
import { Provider } from "react-redux";


class App extends React.Component {
  
  constructor(){
    super();
    this.state = {

      products: data.products,
      cartItems:localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")):[],
      size: "",
      sort: "",
    };

  }
  createOrder = (order) =>{

    alert("Need to save order for" + order.name);
  };

  clearCart = () =>{
    localStorage.clear();

  };

  removeFromCart = (product) =>{
    const cartItems = this.state.cartItems; /*.slice()*/
    this.setState({cartItems: cartItems.filter((x)=>x._id !== product._id) });
    localStorage.setItem("cartItems", JSON.stringify(cartItems.filter((x)=>x._id !== product._id)));
  };
  
  addToCart = (product) => {

    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) =>{

      if(item._id === product._id){
        item.count++;
        alreadyInCart = true;
      }

    });
    if(!alreadyInCart){
      cartItems.push({...product, count:1});
    }
    this.setState({cartItems});
    localStorage.setItem("cartItems", JSON.stringify(cartItems));


  };
  render(){

  return (
    
    <BrowserRouter>
    <Provider store={store}> 
    <div className="grid-container">
      <header>
        <a href="/">YUTA'S THRIFT STORE</a>
      </header>
      <main>
        <div className="content">
        <div className="main">

          
        <Products 
        products={this.state.products} 
        addToCart={this.addToCart}>
        </Products></div> 

        <div className="sidebar">
          <Cart cartItems={this.state.cartItems} removeFromCart={this.removeFromCart} createOrder={this.createOrder}></Cart>
        </div>
        <Switch>
        <Route path="/checkout" render={(props) => <Checkout removeFromCart={this.removeFromCart} cartItems={this.state.cartItems} clearCart={this.clearCart} />} />
        
        </Switch>
        </div>
      </main>
      <footer className="footer">
                YUTA 2021 / All right reserved.
            </footer> 
      
    </div>
    </Provider>
    </BrowserRouter>
 
  );
  }
}

export default App;
