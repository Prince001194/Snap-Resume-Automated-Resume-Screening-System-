import {Link,useNavigate} from "react-router-dom";
import { auth,provider } from "../firebase";
import {signInWithEmailAndPassword,signInWithPopup} from "firebase/auth";
import Nav from "./Navbar/Nav";
import {serverURL,baseURL} from "../config";


function SignIn(){

    const nav = useNavigate();

    function submit(e){
        e.preventDefault();

        const email = document.querySelector('#email');
        const pass = document.querySelector('#password');

        signInWithEmailAndPassword(auth,email.value,pass.value)
            .then((res)=>{
                nav(`${baseURL}/user/${res.user.uid}`);
            })
            .catch((res)=>{
                alert("Error Occured!"+res.message);
            });
    }

    function googlesignin(e){

        signInWithPopup(auth,provider)
        .then((res)=>{
            const user = res.user;

            nav(`${baseURL}/user/${user.uid}`);
        })
        .catch((err)=>{
            console.log(err);
        });


    }

    return(
    <>
        <Nav/>
        <div className="flex h-[100vh] flex-col justify-center">
            <div className="mx-auto max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold text-gray-900">
                Sign in to your account
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
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 active:bg-green-400"
                >
                    Sign in
                </button>
                </div>
            </form>

            <div>
            <button onClick={googlesignin}
                type="button"
                className="flex w-full mt-4 justify-center border-2 border-gray-300 rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-black shadow-sm">
                <div className="mr-3">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
                </div>
                <div>
                    Sign In With Google
                </div>
            </button>
            </div>

            <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?{' '}
                <Link to={`${baseURL}/signup`}><span className="text-blue-600">Sign Up</span></Link>
            </p>
            </div>
        </div>
    </>
    );

}

export default SignIn;