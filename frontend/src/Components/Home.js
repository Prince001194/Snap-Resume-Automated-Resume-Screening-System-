import { auth } from "../firebase";
import {useNavigate, Link} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect,useState } from "react";
import Nav from "./Navbar/Nav";
import Footer from "./Footer/Footer";
import {serverURL,baseURL} from "../config";
import image_intro from "./images/5052521.jpg";
import  image_analyse from "./images/4178155.jpg";
import  image_screen from "./images/headhunting_online_1.jpg";
import svg from './images/reshot-icon-resume-286AWVXNTL.svg';

function Home(){
    
    const nav = useNavigate();
    
    const [user,setuser] = useState();

    useEffect(()=>{        
        onAuthStateChanged(auth,async(user)=>{
            if(user){
                setuser(user.uid);
            }
            else{
                setuser("");
            }
        });
    },[]);
    

    return(<>
        <Nav/>
        <div className="w-full flex flex-col justify-center items-center">
            <div className="flex flex-col md:flex-row justify-around items-center min-h-[45rem] bg-gradient-to-t md:bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-5">
                <div className="md:text-left w-full text-center p-5">
                    <p className="font-semibold md:text-xl text-lg tracking-wider">Resume Screening And Analyzing System</p>
                    <p className="font-bold md:text-4xl text-2xl tracking-widest leading-relaxed md:my-10 my-5">Get expert help for screening and analyzing your resume, instantly</p>
                    <p className="font-normal md:text-lg text-base">Our free AI-powered resume checker scores your resume on key criteria recruiters and hiring managers look for. Get actionable steps to revamp your resume and land more interviews.</p>
                    <Link to={'/signup'} className="inline-block p-3 my-4 rounded-xl bg-green-600 hover:bg-green-700 font-bold">Sign Up For Free</Link>
                </div>
                <div className="hidden md:flex md:justify-center md:items-center w-full p-5 text-center">
                    <img className="w-[30rem] rounded-2xl" src={image_intro}/>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-around items-center  min-h-[45rem] text-black p-5">
                <div className="w-full p-5">
                    <img className="w-full rounded-2xl" src={image_analyse}/>
                </div>
                <div className="md:text-left md:mt-0 mt-10 w-full text-center p-5">
                    <p className="font-bold md:text-4xl text-2xl tracking-wide mb-5">The importance of keywords on your resume</p>
                    <p className="font-normal md:text-lg text-base">Recruiters and hiring managers spend an average of six seconds on each resume. Let's face it - they don't read your resume. They skim it quickly for keywords to get a sense of if you're a good fit or not<br/><br/>For example, if you're applying for a Customer Service job that needs some experience, recruiters are going to make sure you have some customer service experience by quickly scanning your resume for the keywords 'customer service' or 'customer support'.<br/><br/>
                            If your resume contains the keywords that were in the job description, it suggests you have the skills the job requires and that it is a well targeted resume.</p>
                    <Link to={user!=""?`/user/${user}/analyse`:'/signin'} className="inline-block p-3 my-4 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold">Analyze Your Resume</Link>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-around items-center min-h-[45rem] bg-gradient-to-t  md:bg-gradient-to-l from-blue-500 md:to-transparent to-cyan-500 text-white md:text-black p-10">
                <div className="md:text-left w-full text-center p-5">
                    <p className="font-bold md:text-4xl text-2xl tracking-wide mb-5">Find Right Candidates For Right Job Using AI For Resume Screening</p>
                    <p className="font-normal md:text-lg text-base"><b>Prefect Resume</b> understands resumes by searching for important keywords. Algorithm built using NLP, machine learning screens and matches resumes to find right candidates for the right job.<br/><br/> Why just search for candidates in your resume database when you can also find where they fit best. Automate resume screening using Artificial Intelligence.</p>
                    <Link to={user!=""?`/user/${user}/screen`:'/signin'} className="inline-block p-3 my-4 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold">Screen Resumes</Link>
                </div>
                <div className="w-full p-5">
                    <img className="w-full rounded-2xl" src={image_screen}/>
                </div>
            </div>
            <div className="relative flex flex-col md:flex-row justify-around items-center min-h-[40rem] text-black p-5">
                <div className="md:w-[75%] w-full z-10 text-center p-5">
                    <p className="font-bold md:text-4xl text-2xl tracking-wide md:mb-16 mb-8">How to get past Applicant Tracking Systems (ATS)</p>
                    <p className="font-normal md:text-lg text-base">Most companies use resume screening software, or Applicant Tracking Systems (ATS), to quickly filter and rank the thousands of applicants that apply to each job. These software rank your resume based on its relevancy to the job description.
<br/><br/>They do this by scanning your resume for specific skills and keywords. If your resume doesn't have critical keywords (like 'customer support' in the example above), your resume will be instantly rejected.
<br/><br/>To ensure your resume gets past ATS, you need to include the right keywords employers are looking for. Here's where Targeted Resume comes in handy - it is a resume keyword scanner that analyzes your resume's keywords and ensures you have covered the most important keywords.
<br/><br/>And it's all for free.</p>
                    <Link to={'/signup'} className="inline-block p-3 my-4 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold">Sign Up For Free</Link>
                </div>
                <div className="absolute z-0 h-2/3 rounded-2xl overflow-hidden top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2">
                    <img className="h-full opacity-20" src={svg}/>
                </div>
            </div>
        </div>
        <Footer/>
    </>);

}

export default Home;