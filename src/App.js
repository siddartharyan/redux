import React, { useImperativeHandle, useRef } from "react";
import redux, { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import axios from "axios";
import "./styles.css";

export default function App() {
  const initialState = {
    loading: false,
    data: [],
    error: ""
  };
  const reducer = (state = initialState, action) => {
    switch (action.value) {
      case "req":
        return {
          ...state,
          loading: true
        };

      case "suc":
        return {
          loading: false,
          data: action.payload,
          error: ""
        };
      case "fail":
        return {
          loading: false,
          data: [],
          error: action.payload
        };
      default:
        return state;
    }
  };

  const fetchUsers = () => {
    return function (dispatch) {
      dispatch({ type: "req" });
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((res) => {
          const d = res.data.map((d) => d.id);
          dispatch({ type: "suc", payload: d });
        })
        .catch((error) => dispatch({ type: "fail", payload: error.message }));
    };
  };
  const store = createStore(reducer, applyMiddleware(thunkMiddleware));
  store.subscribe(() => console.log(store.getState()));
  store.dispatch(fetchUsers());

  return <></>;
}
