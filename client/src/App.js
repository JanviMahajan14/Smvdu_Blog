import React, { useEffect, createContext, useReducer, useContext } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, useHistory } from "react-router-dom";
import Signup from "./components/screens/Signup";
import Login from "./components/screens/Login";
import "./App.css";
import { initial_state, reducer } from "./Reducers/userReducer";

export const userContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { userState, dispatch } = useContext(userContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      history.push("/signup");
    }
  }, []); //passing an empty array so that it runs only once during mounting only and not on re-rendering(during state change of user)

  return (
    <>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
    </>
  );
};

function App() {
  const [userState, dispatch] = useReducer(reducer, initial_state);
  return (
    <userContext.Provider value={{ userState, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
