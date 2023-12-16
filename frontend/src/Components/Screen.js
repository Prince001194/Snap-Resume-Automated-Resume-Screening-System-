import { auth } from "../firebase";
import {useNavigate, useParams } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect,useState } from "react";
import Nav from "./Navbar/Nav";
import Footer from "./Footer/Footer";
import {serverURL,baseURL} from "../config";

function Screen(){
    
    const nav = useNavigate();
    const {userid} = useParams();
    const [files,setFiles] = useState([]);
    const [jobDesc,setJobDesc] = useState("");
    const [showLoading,setShowLoading] = useState(false);
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

    const handleFileChange = (e)=>{
        const files = e.target.files;
        console.log(files);
        if(files.length === 0) return;
        setFiles(files);
    }
    
    const handleSubmit = (e)=>{
        setShowLoading(true);
        const formData = new FormData();
        for(let i=0;i<files.length;i++){
            formData.append("file", files[i]);
        }
        formData.append("jobDesc", jobDesc);
        const requestOptions = {
            headers:{
                'Accept': 'application/json',
            },
            // mode: "no-cors",
            method: "POST",
            files: files,
            body: formData,
        };
        console.log(requestOptions);
        console.log(jobDesc);
        
        fetch(`${serverURL}/resultscreen/${userid}`, requestOptions)
        .then(response => response.json())
        .then(async response =>{
            const res = await fetch(`${serverURL}/analyse/${userid}`, requestOptions)
            .then(response => response.json());
            let arr = [];
            for(let i=0;i<response.result.length;i++){
                arr.push(res.result.filter((item)=>(item.resume_name === response.result[i]))[0]);
            }
            nav(`${baseURL}/screenResult/${userid}`,{state:{result:response.result,jobDesc:jobDesc,files:files,arr:arr}});
        });

    }
    

    return(<>
        <Nav/>
        <div className="w-full h-[100vh] flex flex-row justify-center items-center">
            <div className="flex flex-col w-full h-full justify-center items-center hover:bg-gray-100">
                <h2 className="text-xl font-bold">Upload All Resumes</h2>
                <p className="text-base font-normal text-gray-600">Select Resumes for Shortlisting.</p>
                <div className="text-center text-xl mt-5">
                    <input type="file" multiple={true} onChange={handleFileChange} accept=".doc, .docx,.ppt, .pptx,.pdf" className="flex mx-auto justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 active:bg-green-400"/>
                </div>
            </div>
            <div className="flex flex-col w-full h-full justify-center items-center hover:bg-gray-100">
                <h2 className="text-xl font-bold">Enter Job Description</h2>
                <p className="text-base font-normal text-gray-600">Shortlist the Best Resume Based on Job Description.</p>
                <p className="text-base font-normal text-gray-600">For better results enter skills or keywords from job description.</p>
                <div className="text-center text-xl mt-5 w-1/2 h-36">
                    <textarea onChange={(e)=> setJobDesc(e.target.value)} className="flex mx-auto w-full h-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold text-black shadow-sm border border-gray-400"/>
                </div>
            </div>
        </div>
        <button type="button" onClick={handleSubmit} className="absolute bottom-5 left-1/2 -translate-x-1/2 mx-auto w-48 justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 active:bg-green-400">
            Submit
        </button>
        {showLoading &&
        <>
            <div className="absolute top-0 left-0 w-[100vw] h-[100vh] bg-black opacity-50 z-10"></div>
            <div className="absolute top-1/2 left-1/2 max-h-[90vh] max-w-[90vh] -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center bg-gray-100 drop-shadow-lg z-20 p-9 rounded-2xl">
                <p>Processing...</p>
            </div>
        </>
        }<Footer/>
    </>);

}

export default Screen;