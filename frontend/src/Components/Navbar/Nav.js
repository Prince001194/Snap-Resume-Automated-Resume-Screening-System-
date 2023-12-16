import { auth } from "../../firebase";
import {useNavigate, Link} from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect,useState } from "react";
import {serverURL,baseURL} from "../../config";

function Nav(){
    
    const nav = useNavigate();
    
    const [user,setuser] = useState();

    useEffect(()=>{
        onAuthStateChanged(auth,async(user)=>{
            if(user){
                if(user.uid){
                    setuser(user.uid);
                }
            }
            else setuser(null);
        });
    },[user]);
    

    return(
        <div className="fixed top-0 left-0 z-50 w-full p-5 bg-gray-900">
            <div className="flex flex-row w-full h-full justify-between items-center">
                <Link to={'/'} className="inline-block  text-white font-bold md:text-2xl text-xl">
                    Perfect Resume
                </Link>
                {user? 
                    <div className="flex flex-row gap-2">
                        <div className="text-center md:text-base text-sm ">
                            <Link to={`${baseURL}/user/${user}`}>
                                <button type="button" className="flex mx-auto justify-center rounded-md bg-green-600 px-3 py-1.5  font-semibold text-white shadow-sm hover:bg-green-500 active:bg-green-400">
                                    Dashboard
                                </button>
                            </Link>
                        </div>
                        <div className="text-center md:text-base text-sm">
                            <button onClick={()=>{signOut(auth);}} type="button" className="flex mx-auto justify-center rounded-md bg-green-600 px-3 py-1.5 font-semibold text-white shadow-sm hover:bg-green-500 active:bg-green-400">
                                Sign Out
                            </button>
                        </div>
                    </div>
                    :
                    <div className="flex flex-row items-center justify-evenly gap-1">
                        <div className="text-center md:text-base text-sm ">
                            <Link to={`${baseURL}/signin`}>
                                <button type="button" className="flex mx-auto justify-center rounded-md bg-green-600 px-3 py-1.5 font-semibold text-white shadow-sm hover:bg-green-500 active:bg-green-400">
                                    Sign In
                                </button>
                            </Link>
                        </div>
                        <div className="text-center md:text-base text-sm">
                            <Link to={`${baseURL}/signup`}>
                                <button type="button" className="flex mx-auto justify-center rounded-md bg-green-600 px-3 py-1.5 font-semibold text-white shadow-sm hover:bg-green-500 active:bg-green-400">
                                    Sign Up
                                </button>
                            </Link>
                        </div>
                    </div>
                }
            </div>
        </div>
    );

}

export default Nav;