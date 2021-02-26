import React, { useState } from 'react';
import Navbar from "./components/Navbar";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';

export interface UserState{
  username?: string,
  email?: string,
  isLoggedIn: boolean
}

function App() {
  const [userInfo, setUserInfo] = useState<UserState>({} as UserState);

  const logoutFunction = () => {
    setUserInfo({username: "", email: "", isLoggedIn: false})
  }
  return (
    <div className="App">
      <Navbar  isLoggedIn={userInfo.isLoggedIn} logout={logoutFunction}/>
      <div className="container">

        <Switch>
          <Route exact path="/" render={() => {

             if(!userInfo.isLoggedIn){
            return <Redirect to="/login"/>
            }else{
              return <HomePage email={userInfo.email!} />
            }

          }} />
          <Route exact path="/login" render={() => {
            if(!userInfo.isLoggedIn){
            return <LoginPage setUserInfo={setUserInfo} />
            }else{
              return <Redirect to="/"/>
            }
          }} />
          <Route exact path="/register" render={
            () => {
              if(!userInfo.isLoggedIn){
                return <RegisterPage />
                }else{
                  return <Redirect to="/"/>
                }
            }
          }  />
        </Switch>

        
        
      </div>

      <div className="card pb-4">
        <div className="card-header">Supposed to be a footer here?</div>
          <div className="card-body">Please don't torture me by seeing my terrible UI.</div>
          
          <div className="text-center">Mahesh C. Regmi &copy; All Rights Reserved.</div>
        </div>
    </div>
  );
}

export default App;
