import { BrowserRouter,Route,Routes,Navigate } from "react-router-dom";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import User from "./Components/User";
import Analyse from "./Components/Analyse";
import AnalyseResult from "./Components/AnalyseResult";
import ScreenResult from "./Components/ScreenResult";
import Screen from "./Components/Screen";
import Error from "./Components/Error";
import Home from './Components/Home';
import {serverURL,baseURL} from "./config";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`${baseURL}`} element={<Home/>}/>
        <Route path={`${baseURL}/signin`} element={<SignIn/>} />
        <Route path={`${baseURL}/signup`} element={<SignUp/>} />
        <Route path={`${baseURL}/user/:userid`} element={<User/>} />
        <Route path={`${baseURL}/user/:userid/analyse`} element={<Analyse/>} />
        <Route path={`${baseURL}/analysisResult/:userid`} element={<AnalyseResult/>} />
        <Route path={`${baseURL}/screenResult/:userid`} element={<ScreenResult/>} />
        <Route path={`${baseURL}/user/:userid/screen`} element={<Screen/>} />
        <Route path='*' element={<Error/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
