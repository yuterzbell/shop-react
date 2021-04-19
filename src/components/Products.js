import React, { Component } from 'react';
import { fetchProducts } from "../actions/productActions";
import { connect}  from "react-redux";

class Products extends Component {

    componentDidMount() {
        this.props.fetchProducts();
    }
    render() {
        return (
            <div>
                {
                    !this.props.products ? <div> loading...</div>:
                    <ul className="products">
                        {/*displaying all the products one by one*/}
                    {this.props.products.map((product) => (
                        <li key={product._id}>
                            <div className="product">
                                    <div className="product-show">
                                    <img src={product.image} alt={product.title}></img>
                                    <p>
                                        {product.title}
                                    </p>
                                    </div>
                                
                                <div className="product-price">
                                    <div>
                                        ${product.price}
                                    </div>
                                    <button onClick={()=> this.props.addToCart(product)} className="button primary">
                                        Add To Cart
                                    </button>

                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

                }

                
            </div>
        );
    }
}

export default connect((state)=>({products: state.products.items}),{fetchProducts})(Products);