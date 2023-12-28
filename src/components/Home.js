// import React from 'react'
// import { getRestaurants, sortByRatings, sortByReviews, toggleVegOnly } from '../actions/restaurantAction'
// import Message from "../components/Message"
// import Loader from '../components/Layout/Loader'
// import Restaurant from '../components/Restaurant'
// import {useDispatch,useSelector} from "react-redux";
// import { useEffect } from 'react'
// import CountRestaurant from './CountRestaurant'

// const Home = () => {
//   // access dispatch function(sending something)--allow send redux action
//   const dispatch=useDispatch();

//   const {
//     // it access specific pices
//     loading:restaurantsLoading,
//     error:restaurantsError,
//     restaurants,
//     showVegOnly,}=useSelector((state)=>state.restaurants);

//     // used to perform sideeffect in functional component mounted-when component is created then it is displayed
//     useEffect(()=>{
//       if(restaurantsError){
//         return alert.error(restaurantsError);
//       }
//       dispatch(getRestaurants());
//     },[dispatch,restaurantsError]);

//     const handleSortByRatings=()=>{
//       dispatch(sortByRatings());
//     }
//     const handleSortByReviews=()=>{
//       dispatch(sortByReviews());
//     }

//     const handleToggleVegOnly=()=>{
//       dispatch(toggleVegOnly());
//     }


//   return (
//     <>
//     <CountRestaurant/>
//      {restaurantsLoading?(
//       <Loader/>
//      ):restaurantsError?(
//       <Message varient="danger">{restaurantsError}</Message>
//      ):(
//       <>
//         <section>
//         <div className='sort'>
//           <button className='sort_veg p-3' onClick={handleToggleVegOnly}>
//             {showVegOnly?"Show All":"Pure Veg"}
//           </button>
//           <button className='sort_rev p-3' onClick={handleSortByReviews}>Sort By Reviews</button>
//           <button className='sort_rate p-3' onClick={handleSortByRatings}>
//             Sort By Ratings
//           </button>
//         </div>
//           <div className='row mt-4'>
//             {restaurants && restaurants.restaurants ? 
//             (restaurants.restaurants.map((restaurant)=>
//             !showVegOnly || (showVegOnly && restaurant.isVeg)?(
//               <Restaurant key={restaurants._id} restaurant={restaurant}/>
//             ):null
//             )):(
//               <Message varient="info">No Restaurants Found</Message>
//             )}
            
//           </div>
//         </section>
//       </>
//      )}
//     </>
//   )
// }

// export default Home

// // restaurants.restaurants is holding list of all the restaurants


import React,{useEffect} from 'react'
import { 
  getRestaurants,
  sortByRatings,
  sortByReviews,
  toggleVegOnly,
 } from '../actions/restaurantAction';
import Restaurant from '../components/Restaurant';
import Message from '../components/Message';
import { useDispatch, useSelector } from 'react-redux';

import CountRestaurant from './CountRestaurant';
import Loader from './Layout/Loader';
const Home = () => {
  const dispatch = useDispatch();

   const {
    loading: restaurantsLoading,
    error:restaurantsError,
    restaurants,
    showVegOnly,
   } = useSelector((state) => state.restaurants);

   useEffect(() =>{
    if(restaurantsError) {
      return alert.error(restaurantsError);
    }
    dispatch(getRestaurants());
   },[dispatch,restaurantsError]);

   const handleSortByRatings = () => {
    dispatch(sortByRatings());
   };

   const handleSortByReviews = () =>{
    dispatch(sortByReviews());
   };

   const handleToggleVegOnly = () => {
    dispatch(toggleVegOnly());
   };

   return (
    <>
       <CountRestaurant/>  
      {restaurantsLoading ? (
          <Loader/>
        ) : restaurantsError ?(
          <Message variant="danger" >{restaurantsError}</Message>
        ): (
         <>
      <section>
        <div className="sort">
          <button 
          className="sort_veg p-3" 
          onClick={handleToggleVegOnly}
          >
            {showVegOnly ? "Show All" : "Pure Veg"}
          </button>
          <button 
          className="sort_rev p-3" 
          onClick={handleSortByReviews}
          >
             Sort By Reviews
          </button>
          <button
           className="sort_rate p-3" 
           onClick={handleSortByRatings}
           >
             Sort By ratings 
          </button>
        </div>
        <div className="row mt-4">
          {restaurants && restaurants.restaurants ? (
            restaurants.restaurants.map((restaurant) => 
            !showVegOnly || (showVegOnly && restaurant.isVeg) ? (
              <Restaurant key={restaurant._id} restaurant={restaurant}/>
            ) : null
            )
          ) : (
            <Message variant="info"> NO restaurants Found. </Message>
          )
           }
         </div>
      </section>
      
         </>
        )}
    </>
  );
}

export default Home;
