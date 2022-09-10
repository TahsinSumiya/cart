import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'

const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initalState={
  loading:false,
  cart:cartItems,
  total:0,
  amount:0,

}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer,initalState)

  const clearCart = ()=>{
    dispatch({type:"CLEAR_CART"})
  }

  const removeItem=(id)=>{
    dispatch({type:"REMOVE" , payload:id})
  }

  const increase=(id)=>{
    dispatch({type:'INCREASE',payload:id})
  } 

  const decrease=(id)=>{
    dispatch({type:'DECREASE',payload:id})
  }


  useEffect(()=>{
    dispatch({type:'GET_TOTAL'})
  },[state.cart])
   

  const fetchData= async()=>{
   dispatch({type:'LOADING'});
   const response = await fetch(url);
   const cart= await response.json();
   dispatch({type:'DISPLAY_ITEM',payload :cart,loading:false})
  }
  useEffect(()=>{
    fetchData()
    },[])

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increase,
        decrease,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }