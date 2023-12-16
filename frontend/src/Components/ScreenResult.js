import { auth } from "../firebase";
import {useNavigate, useParams, useLocation} from "react-router-dom";
import { onAuthStateChanged} from "firebase/auth";
import { useEffect,useState } from "react";
import Nav from "./Navbar/Nav";
import Footer from "./Footer/Footer";
import {serverURL,baseURL} from "../config";

function ScreenResult(){
    const {state} = useLocation();
    console.log(state);
    const nav = useNavigate();
    const {userid} = useParams();
    const [user,setuser] = useState();
    const [arr,setArr] = useState(Array(state.result.length).fill(false));


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

    const handleDropDown = (idx)=>{
        let newarr = JSON.parse(JSON.stringify(arr));
        newarr[idx] = !newarr[idx];
        setArr(newarr);
    }
    return(<>
        <Nav/>
        <div className="flex justify-center w-full bg-white p-10">
            <div className="flex flex-col text-black bg-gray-100 rounded-xl mt-10 w-4/5 drop-shadow-lg justify-center p-5">
                <p className="p-5 font-bold text-4xl">Resume Rank's</p>
                <div className="flex flex-col  drop-shadow-lg bg-slate-800 text-white rounded-md p-5 border-2 m-4 border-black">
                    <ul role="list" className="divide-y divide-gray-100">
                    {state.result.map((item,idx) => (
                        <li key={idx} className="flex flex-col">
                            <div className="flex justify-between gap-x-6 py-5 hover:bg-slate-900 cursor-pointer" onClick={(e)=>handleDropDown(idx)}>
                                <div className="flex min-w-0 gap-x-4 ml-3">
                                    <div className="mr-3">
                                        {idx+1}
                                    </div>
                                    <div className="min-w-0 flex-auto hover:text-blue-500 text-white">
                                        <a target="_blank" className="text-sm font-semibold leading-6" href={`${serverURL}/Original_Resume/${userid}/${item}`}>
                                            {item}
                                        </a>
                                    </div>
                                </div>
                            </div>
                            {arr[idx] && <div className="w-full bg-gray-100 rounded-lg overflow-hidden mb-4">
                                <div className="p-5 w-full text-center rounded-2xl ">
                                    <p className=" font-semibold text-lg text-black mb-2">Resume Score: {state.arr[idx].resume_score} <span className="font-light text-sm">(Based on Content of Resume.)</span></p>
                                    <div className="w-full h-2 rounded-full bg-gray-200">
                                        <div className="h-full bg-green-600 rounded-full" style={{width:`${state.arr[idx].resume_score}%`}}></div>
                                    </div>
                                </div>
                                <div className="p-5 w-full bg-green-500 text-white">
                                    <p className=" font-normal text-lg">Matching Job Title is <span className="font-semibold">{state.arr[idx].predicted_title}</span></p>
                                </div>
                                <div className="flex flex-row">
                                    <div className="flex justify-center w-full">
                                        <div className="p-5 w-full bg-[#03ff077f] text-[#106411]">
                                            <p className=" font-semibold text-lg">Resume's Plus Points:-</p>
                                            <div className="flex flex-col ml-3 font-normal text-base">
                                            {state.arr[idx].pluspoints.map((item,idx)=>{
                                                return (
                                                    <p>[+] {item.replace("Awesome! You have added ","")}</p>
                                                );
                                            })}</div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center w-full ">
                                        <div className="p-5 w-full bg-[#ffff006c] text-[#91911d]">
                                            <p className=" font-semibold text-lg">Missing in Resume:-</p>
                                            <div className="flex flex-col ml-3 font-normal text-base">
                                            {state.arr[idx].suggestions.map((item,idx)=>{
                                                return (
                                                    <p>[-] {item.replace("Please add ","").split('.')[0]}</p>
                                                );
                                            })}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                        </li>
                        
                    ))}
                    </ul>
                </div>
            </div>
        </div>
        <Footer/>
    </>);

}

export default ScreenResult;