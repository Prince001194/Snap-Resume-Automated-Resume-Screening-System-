import {Link,useNavigate} from "react-router-dom";
import { auth } from "../firebase";
import {createUserWithEmailAndPassword} from "firebase/auth";
import Nav from "./Navbar/Nav";
import {serverURL,baseURL} from "../config";



function SignUp(){
    
    const nav = useNavigate();

    function submit(e){
        e.preventDefault();

        const email = document.querySelector('#email');
        const pass = document.querySelector('#password');
        const confirmpass = document.querySelector('#confirmpassword');

        if(pass.value !== confirmpass.value){
            alert("Password field's don't Match!");
            return;
        }

        createUserWithEmailAndPassword(auth,email.value,pass.value)
            .then((res)=>{
                nav(`${baseURL}/signin`);
            })
            .catch((res)=>{
                alert("Error Occured!"+res.message);
            });
    }

    return(
        <>
        <Nav/>
        <div className="flex h-[100vh] flex-col justify-center">
            <div className="mx-auto max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold text-gray-900">
                Create An Account
            </h2>
            </div>

            <div className="mt-10 mx-auto w-full max-w-sm">
            <form className="space-y-6" onSubmit={submit}>
                <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                    Email address
                </label>
                <div className="mt-2">
                    <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 sm:text-sm"
                    />
                </div>
                </div>

                <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                    Password
                    </label>
                </div>
                <div className="mt-2">
                    <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 sm:text-sm"
                    />
                </div>
                </div>

                <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="confirmpassword" className="block text-sm font-medium text-gray-900">
                    Confirm Password
                    </label>
                </div>
                <div className="mt-2">
                    <input
                    id="confirmpassword"
                    name="confirmpassword"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 sm:text-sm"
                    />
                </div>
                </div>

                <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 active:bg-green-400"
                >
                    Sign Up
                </button>
                </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
                Already a member?{' '}
                <Link to={`${baseURL}/signin`}><span className="text-blue-600">Sign In</span></Link>
            </p>
            </div>
        </div>
    </>
    );

}

export default SignUp;