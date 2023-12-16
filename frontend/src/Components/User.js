import { auth } from "../firebase";
import {useNavigate, useParams,Link} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect,useState } from "react";
import Nav from "./Navbar/Nav";
import {serverURL,baseURL} from "../config";
import Footer from "./Footer/Footer";

function User(){
    
    const nav = useNavigate();
    const {userid} = useParams();
    
    const [user,setuser] = useState();

    useEffect(()=>{

        
        onAuthStateChanged(auth,async(user)=>{
            if(user){
                if(user.uid === userid){
                    setuser(user.email);
                   
                }
                else nav(`${baseURL}/signin`);
            }
            else{
                nav(`${baseURL}/signin`);
            }
        });
    },[]);
    

    return(<>
        <Nav/>
        <div className="w-full h-[100vh] flex flex-row justify-center items-center">
            <div className="flex flex-col w-full h-full justify-center items-center hover:bg-gray-100">
                <h2 className="text-xl font-bold">Analyse Resume</h2>
                <p className="text-base font-normal text-gray-600">Find the ATS Score of your Resume.</p>
                <div className="text-center text-xl mt-5">
                    <Link to={`${baseURL}/user/${userid}/analyse`}>
                        <button type="button" className="flex mx-auto w-20 justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 active:bg-green-400">
                            Analyse
                        </button>
                    </Link>
                </div>
            </div>
            <div className="flex flex-col w-full h-full justify-center items-center hover:bg-gray-100">
                <h2 className="text-xl font-bold">Resume Screening System</h2>
                <p className="text-base font-normal text-gray-600">Shortlist the Best Resume Based on Job Description.</p>
                <div className="text-center text-xl mt-5">
                    <Link to={`${baseURL}/user/${userid}/screen`}>
                        <button type="button" className="flex mx-auto w-48 justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 active:bg-green-400">
                            Resume Screening System
                        </button>
                    </Link>
                </div>
            </div>
        </div>
        <Footer/>
    </>);

}

export default User;