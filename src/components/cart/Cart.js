import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIndianRupee } from '@fortawesome/free-solid-svg-icons'
import { addItemToCart, removeItemFromCart, updateCartQuantity } from '../../actions/cartActions'


const Cart = () => {

    const dispacth=useDispatch();
    const navigate=useNavigate();

    const {cartItems}=useSelector((state)=>state.cart);

    // function to remove items from the cart

    const removeCartItemHandler=(id)=>{
        dispacth(removeItemFromCart(id));
    }

    // function to increase the quantity
    const increaseQty=(id,quantity,stock)=>{
        const newQty=quantity+1;
        if(newQty>stock) return;
        dispacth(addItemToCart(id,newQty));
    }

    // function for decreasing the quantity of an item
    const decreaseQty=(id,quantity)=>{
        if(quantity>1){
            const newQty=quantity-1;
            dispacth(updateCartQuantity(id,newQty))
        }
    }
    // function to navigate to the delivery page this allow to navigate on different components

    const checkoutHandler=()=>{
        navigate("/delivery")
    }
    
  return (
    <>
      {/* condtiontal rendering based on cartItems */}
      {
        cartItems.length===0?(
            <h2 className='mt-5'>Your cart it Empty</h2>
        ):(
            <>
            <h2 className='mt-5'>Your Cart :<b>{cartItems.length}</b> items</h2>

            {/* cart Items */}
            <div className='row d-flex justify-content-between cartt'>
                <div className='col-12 col-lg-8'>
                    {cartItems.map((item)=>(
                        <>
                        <hr/>
                            <div className='cart-item' key={item.fooditem}>
                            <div className='row'>
                                {/* Display Item image */}
                                <div className='col-4 col-lg-3'>
                                    <img
                                    src={item.image}
                                    alt='item'
                                    height="90"
                                    width="115"/>
                                </div>
                            <div className='col-5 col-lg-3'>{item.name}  </div>

                            {/* Display item price */}
                            <div className='col-4 col-lg-2 mt-4 mt-lg-0'>
                                <p id='card_item_price'>
                                    <FontAwesomeIcon icon={faIndianRupee} size="xs"/>
                                    {item.price}
                                </p>
                            </div>
                            {/* quantity control */}
                            <div className='col-4 col-lg-3 mt-4 mt-lg-0'>
                                <div className='stockCounter d-inline'>
                                    {/* Decrease qty button */}
                                    <span 
                                    className='btn btn-danger minus'
                                    onClick={()=>
                                        decreaseQty(item.fooditem,item.quantity)
                                    }>-</span>

                                    {/* Display current quantity */}

                                    <input  
                                        type='number'
                                        className='form-control count d-inline'
                                        value={item.quantity}
                                        readOnly/>

                                    {/* Increse qunatity buttons */}
                                    <span
                                    className='btn btn-primary plus'
                                    onClick={()=>
                                    increaseQty(
                                        item.fooditem,
                                        item.quantity,
                                        item.stock
                                    )}>+</span>

                                </div>
                            </div>
                            {/* remove item button */}
                            <div className='col-4 col-lg-1 mt-4 mt-lg-0'>
                                <i
                                id='delete_cart_item'
                                className='fa fa-trash btn-danger'
                                onClick={()=>removeCartItemHandler(item.fooditem)}>

                                </i>
                            </div>
                            </div></div></>
                            
                    ))}
                    
                    
                </div>
                     {/* order Summary */}
                    <div className='col-12 col-lg-3 my-4'>
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr/>

                        {/* display subtotoal */}
                        <p>subtotoal:
                        <span className='order-summary-values'>
                            {cartItems.reduce(
                                (acc,item)=>acc+Number(item.quantity),
                                0
                            )}(Units)
                        </span></p>

                        {/* display total */}
                        Total:
                        <span className='order-summary-values' >
                            <FontAwesomeIcon icon={faIndianRupee} size='xs'/>
                                {cartItems.reduce((acc,item)=>acc+item.quantity*item.price,0)
                                .toFixed(2)}
                           
                        </span>
                    </div>
                     {/* checkout buttons */}
                <button id='chechout_btn'
                className='btn btn-primary btn-block'
                onClick={checkoutHandler}>check Out</button>
                </div>
               
             
              
            
            </div>

            

            </>
        )
      }
    </>
  )
}

export default Cart
