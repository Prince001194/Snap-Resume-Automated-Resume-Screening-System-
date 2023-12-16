import { auth } from "../firebase";
import {useNavigate, useParams, useLocation} from "react-router-dom";
import { onAuthStateChanged} from "firebase/auth";
import { useEffect,useState } from "react";
import Nav from "./Navbar/Nav";
import Footer from "./Footer/Footer";
import {serverURL,baseURL} from "../config";

function AnalyseResult(){
    const {state} = useLocation();
    console.log(state);
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
        <div className="flex justify-center w-full bg-white p-10">
            <div className="flex flex-col text-black bg-gray-100 rounded-xl mt-10 w-4/5 drop-shadow-lg justify-center p-5">
                <p className="p-5 font-bold text-4xl">Resume Analysis</p>
                <div className="flex flex-col  drop-shadow-lg bg-slate-800 text-white rounded-md p-5 border-2 m-4 border-black">
                    <div className="p-5 w-full">
                        <p className=" font-semibold text-lg">Basic Details</p>
                        <p className=" font-normal text-base">Resume: <a target="_blank" className="font-semibold" href={`${serverURL}/Original_Resume/user_data/${userid}/${state.resume_name}`}>{state.resume_name}</a></p>
                        <p className=" font-normal text-base">Number of Pages: {state.pages}</p>
                        
                    </div>
                    <div className="p-5 w-full text-center rounded-2xl ">
                        <p className=" font-semibold text-lg mb-2">Resume Score: {state.resume_score} <span className="font-light text-sm">(Based on Content of Your Resume.)</span></p>
                        <div className="w-full h-2 rounded-full bg-gray-200">
                            <div className="h-full bg-green-600 rounded-full" style={{width:`${state.resume_score}%`}}></div>
                        </div>
                    </div>
                </div>
                <div className="p-5 w-full bg-green-500 text-white">
                    <p className=" font-normal text-lg">Our Analysis shows that you are a looking for opportunity in <span className="font-semibold">{state.predicted_title}</span></p>
                </div>
                <div className="flex justify-center w-full">
                    <div className="p-5 w-full bg-[#03ff077f] text-[#106411] rounded-lg mt-5">
                        <p className=" font-semibold text-lg">Your Resume's Plus Points:-</p>
                        <div className="flex flex-col ml-3 font-normal text-base">
                        {state.pluspoints.map((item,idx)=>{
                            return (
                                <p>[+] {item}</p>
                            );
                        })}</div>
                    </div>
                </div>
                <div className="flex justify-center w-full mt-5">
                    <div className="p-5 w-full bg-[#ffff006c] text-[#91911d] rounded-lg">
                        <p className=" font-semibold text-lg">Suggestions:-</p>
                        <div className="flex flex-col ml-3 font-normal text-base">
                        {state.suggestions.map((item,idx)=>{
                            return (
                                <p>[-] {item}</p>
                            );
                        })}</div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </>);

}

export default AnalyseResult;