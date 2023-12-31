import React from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import {Link} from "react-router-dom";
import {logout} from "../../actions/userAction"

const Header = () => {
  const {cartItems}=useSelector((state)=>state.cart);
  // console.log("This are the", cartItems)
  const alert=useAlert();
  const dispatch=useDispatch();

  const {user,loading}=useSelector((state)=>state.auth);
  const logoutHandler=()=>{
    dispatch(logout());
    alert.success("Logged out successfully")
  }
  return (
    <>
      <nav className='navbar row'>
        <div className='col-12 col-md-3'>
        <Link to="/">
            <img src='/images/logo.webp' alt='logo' className='logo'/></Link>

        </div>

        <div className='col-12 col-md-6 mt-2 mt-md-0'>
            {/* we can enter text with this input group */}
            <div className='input-group'>
                <input
                    type='text'
                    id='search_field'
                    className='form-control'
                    placeholder='Search your favorite Restaurent'
                />
                <div className='input-group-append'>
                    <button id="search_btn" className='btn'>
                    <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>

            </div>
        </div>
        <div className='col-12 col-md-3  text-center'>
          
            <Link to="/cart" style={{textDecoration:"none"}}>
            <span className='btn' id="cart">Cart</span>
            <span className='ml-1' id="cart_count">
            {cartItems.length}
            </span>
            </Link>
            {user ?(
              <div className='ml-4 dropdown d-inline'>
                <Link to="/" className='btn dropdown-toggle text-white mr-4'
                type='button'
                id='dropDownMenuButton'
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
                  <figure className='avatar avatar-nav'>
                    <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className='rounded-circle'></img>
                  </figure>
                  <span>{user && user.name}</span>
                </Link>
                <div 
                className='dropdown-menu'
                aria-labelledby='dropDownMenuButton'>
                <Link className='dropdown-item' to="/eats/orders/me/myOrders">
                  Orders
                </Link>

                <Link className='dropdown-item' to="/users/me">
                  Profile
                </Link>

                <Link className='dropdown-item text-danger' to="/" onClick={logoutHandler}>
                  LogOut
                </Link>

                </div>
              </div>
            ):(
              !loading && (
                <Link to="/users/Login" className='btn ml-4' id='login_btn'>
                  Login
                </Link>
              )
            )}
           
        </div>


        
      </nav>
    </>
  )
}

export default Header


// we are not using public in link because it searches root element
// and public is treated as root folder and it searches directly go to the public

