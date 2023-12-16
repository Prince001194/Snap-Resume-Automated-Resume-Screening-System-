import { auth } from "../firebase";
import {useNavigate, useParams } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect,useState } from "react";
import Nav from "./Navbar/Nav";
import {serverURL,baseURL} from "../config";
import Footer from "./Footer/Footer";

function Analyse(){
    
    const nav = useNavigate();
    const {userid} = useParams();
    const [files,setFiles] = useState([]);
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
        const formData = new FormData();
        formData.append("file", files[0]);
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
    
        fetch(`${serverURL}/analyse/${userid}`, requestOptions)
        .then(response => response.json())
        .then(response =>{
            console.log(JSON.stringify(response));
            nav(`${baseURL}/analysisResult/${userid}`,{state:response.result[0]});
        });

    }
    

    return(<>
        <Nav/>
        <div className="w-full h-[100vh] flex flex-row justify-center items-center">
            <div className="flex flex-col w-full h-full justify-center items-center hover:bg-gray-100">
                <h2 className="text-xl font-bold">Upload Resume</h2>
                <p className="text-base font-normal text-gray-600">Analyse Your Resume.</p>
                <div className="text-center text-xl mt-5">
                    <input type="file" multiple={false} onChange={handleFileChange} accept=".doc, .docx,.ppt, .pptx,.pdf" className="flex mx-auto justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 active:bg-green-400"/>
                </div>
            </div>
        </div>
        <button type="button" onClick={handleSubmit} className="absolute bottom-5 left-1/2 -translate-x-1/2 mx-auto w-48 justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 active:bg-green-400">
            Submit
        </button>
        <Footer/>
    </>);

}

export default Analyse;