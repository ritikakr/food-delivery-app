import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getMenus } from '../actions/menuAction'
import { getRestaurants } from '../actions/restaurantAction'
import Fooditem from './Fooditem'
import { setRestaurantId } from '../actions/cartActions'


const Menu = (storeId) => {
    // params is used to get id from current url
    const {id}=useParams()
    // dispatching actions
    const dispatch=useDispatch(); 

    const {menus,loading,error}=useSelector((state)=>state.menus);

    dispatch(setRestaurantId(id));
    useEffect(()=>{
        dispatch(getMenus(id));
        dispatch(getRestaurants());

    },[dispatch,id,storeId])
  
  
    return (
    <div>
        {loading?(
            <p>Loading Menus</p>
        ):error?(<p>Error:</p>
        ): menus && menus.length>0?(
            menus.map((menu)=>(
                <div key={menu._id}>
                    <h2>{menu.category}</h2><hr/>
                    {menu.items && menu.items.length>0?(
                        <div className='row'>
                            {menu.items.map((fooditem)=>(
                                <Fooditem key={fooditem._id} fooditem={fooditem}/>
                            ))}
                        </div>
                    ):(
                        <p>No Menus available</p>
                    )}

                </div>
            )))  :(
                <p>No fooditem available</p>
            ) 
     }
    </div>
  )
}

export default Menu
