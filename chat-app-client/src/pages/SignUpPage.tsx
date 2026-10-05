import { useState } from "react";
import styles from "../assets/styles/SignUp.module.css";
import AuthPageComponent from "../components/AuthPage.component";
import type { AuthResponse, User, UserSignUpPayload } from "../types";
import { register } from "../services/api";
import { storeAuthenticationTokenInLocalStorage } from "../utils";
import { socket } from "../services/socket";

interface SignUpPageProps {
    onSignUp:(user:User) => void;
    onNavigateToLogin:()=>void;
}


function SignUpPage({ onSignUp, onNavigateToLogin }:SignUpPageProps){
    const [username, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>){
        e.preventDefault();
        if(!email || !username || !password){
            alert("email, username and password are required!");
            return;
        }
        try{
            const signupPayload:UserSignUpPayload = {
                username,
                email,
                password
            }
            const token : AuthResponse = await register(signupPayload);
            storeAuthenticationTokenInLocalStorage(token);
            socket.auth = { token: token.token };
            socket.connect();
            onSignUp({
                id:(token.userObject.id),
                username:token.userObject.username
            } as User);
        } catch (e){
            console.error(e);
            alert("Server error");
        }
    }


    return (
        <AuthPageComponent>
            <div className={styles.SignUpFormContainer}>
                <div className={styles.form_header}>
                    <span className={`${styles.hello_text} poppins-semibold`}>Hello</span>
                    <span className={`${styles.welcome_text} poppins-regular`}>Sign Up to Get Started.</span>
                </div>
                <form  id="signup-form" action="" onSubmit={handleSubmit}>
                    <div className={styles.form_inputs}>
                        <div className={styles.input_group}>
                            <svg className={styles.input_icon} width="21" height="21" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_201_4119)">
                                    <path d="M14.8303 16.6842C19.4358 16.6842 23.1724 12.9477 23.1724 8.34212C23.1724 3.73658 19.4358 0 14.8303 0C10.2247 0 6.48814 3.73658 6.48814 8.34212C6.48814 12.9477 10.2247 16.6842 14.8303 16.6842ZM22.2455 18.5381H19.0535C17.7674 19.129 16.3365 19.465 14.8303 19.465C13.324 19.465 11.8989 19.129 10.6071 18.5381H7.41504C3.31929 18.5381 -0.000183105 21.8575 -0.000183105 25.9533V26.8802C-0.000183105 28.4154 1.24534 29.6609 2.78053 29.6609H26.88C28.4152 29.6609 29.6607 28.4154 29.6607 26.8802V25.9533C29.6607 21.8575 26.3412 18.5381 22.2455 18.5381Z" fill="#CCCCCC"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_201_4119">
                                        <rect width="29.6609" height="29.6609" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                            <input type="text" id="username" value={username} onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setUserName(e.target.value)} name="username" className={styles.custom_input} placeholder="Username" required />
                        </div>
                        <div className={styles.input_group}>
                            <svg className={styles.input_icon} width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0 0.75L0.75 0H20.25L21 0.75V14.25L20.25 15H0.75L0 14.25V0.75ZM1.5 2.3025V13.5H19.5V2.304L10.965 8.85H10.05L1.5 2.3025ZM18.045 1.5H2.955L10.5 7.3035L18.045 1.5Z" fill="#CCCCCC"/>
                            </svg>
                            <input type="email" id="email" value={email} onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setEmail(e.target.value)} name="email" className={styles.custom_input} placeholder="Email Address" required />
                        </div>

                        <div className={styles.input_group}>
                            <svg className={styles.input_icon} width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 10C16 8.897 15.103 8 14 8H13V5C13 2.243 10.757 0 8 0C5.243 0 3 2.243 3 5V8H2C0.897 8 0 8.897 0 10V18C0 19.103 0.897 20 2 20H14C15.103 20 16 19.103 16 18V10ZM5 5C5 3.346 6.346 2 8 2C9.654 2 11 3.346 11 5V8H5V5Z" fill="#CCCCCC"/>
                            </svg>
                            <input type="password" id="password" value={password} onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setPassword(e.target.value)} name="password" className={styles.custom_input} placeholder="Password" required />
                        </div>

                        <button className={styles.login_button} type="submit">Register</button>
                    </div>
                </form>
                <div className={styles.form_footer}>
                    <span className={`${styles.forget_password} poppins-regular`}>Already have an account with us?</span>
                    <button className={`${styles.signup_button} poppins-medium`} onClick={onNavigateToLogin}>
                        <svg 
                            width="18" 
                            height="18" 
                            viewBox="0 0 60 60" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                            className={styles.signup_icon}
                        >
                            <path fillRule="evenodd" clipRule="evenodd" d="M0 30C0 13.4315 13.4315 0 30 0C46.5685 0 60 13.4315 60 30C60 46.5685 46.5685 60 30 60C13.4315 60 0 46.5685 0 30ZM30 5C16.1929 5 5 16.1929 5 30C5 43.8071 16.1929 55 30 55C43.8071 55 55 43.8071 55 30C55 16.1929 43.8071 5 30 5Z" fill="currentColor"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M17.6213 38.6999C18.5322 37.6623 20.1117 37.5596 21.1493 38.4705C26.2809 42.9755 34.7191 42.9755 39.8507 38.4705C40.8883 37.5596 42.4678 37.6623 43.3787 38.6999C44.2897 39.7375 44.1869 41.3171 43.1493 42.228C36.1307 48.3897 24.8693 48.3897 17.8507 42.228C16.8131 41.3171 16.7104 39.7375 17.6213 38.6999Z" fill="currentColor"/>
                            <path d="M23.5 25C23.5 27.4853 21.4853 29.5 19 29.5C16.5147 29.5 14.5 27.4853 14.5 25C14.5 22.5147 16.5147 20.5 19 20.5C21.4853 20.5 23.5 22.5147 23.5 25Z" fill="currentColor"/>
                            <path d="M45.5 25C45.5 27.4853 43.4853 29.5 41 29.5C38.5147 29.5 36.5 27.4853 36.5 25C36.5 22.5147 38.5147 20.5 41 20.5C43.4853 20.5 45.5 22.5147 45.5 25Z" fill="currentColor"/>
                        </svg>
                        <span>Login</span>
                    </button>
                </div>
            </div>
        </AuthPageComponent>
    )
}

export default SignUpPage;