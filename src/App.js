import React, { useState, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import Calender from './Components/Calender';
import "./App.css"


// const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';

const App = () => {
 return( <>
   <Calender/>
  </>)

};

export default App;