import { auth} from "../../firebase";
import {useNavigate,Link} from "react-router-dom";
import { onAuthStateChanged} from "firebase/auth";
import { useEffect,useState } from "react";


function Footer(){
    
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
        <div className=" w-full bg-gray-800">
            <ul className="flex flex-row w-full h-full justify-between items-center p-8 text-white">
                <li className="h-full">
                    <Link to={'/'} className="inline-block text-white">
                        <p className="font-bold md:text-2xl text-xl">Perfect Resume</p>
                    </Link>
                    <p className="font-normal md:text-base text-sm opacity-75 mt-6">Perfect Resume is a modern resume analyzing software that uses artificial intelligence to help employers to identify best candidates faster.<br/>
                    And help candidates to Improve their Resume by giving suggestions and estimating their Resume's ATS Score.</p>
                    <p className="font-normal md:text-base text-sm opacity-75 mt-6">Developed By Prateek Kumar and Prince Rathore</p>
                    <p className="font-normal md:text-base text-sm opacity-75 mt-6">© {(new Date().getFullYear())} Perfect Resume. All rights reserved.</p>
                </li>
            </ul>
        </div>
    );

}

export default Footer;