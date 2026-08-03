import React, { useState } from "react";
import styles from "../assets/styles/LoginPage.module.css";

interface LoginPageProps {
    onLogin:(username:string) => void;
}

function LoginPage({onLogin}: LoginPageProps){
    const [username, setUserName] = useState<string>("");

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>){
        e.preventDefault();
        console.log(username);
        if(username.trim() === '') return;
        onLogin(username.trim());
    }

    function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>):void{
        const inputValue = e.target.value;
        console.log(inputValue)
        setUserName(inputValue);
    }


    return (
        <div className={styles.container}>
            <table className={styles.login_page_section}>
                <tbody>
                    <tr>
                        <td className={styles.section_left}>
                            <div className={styles.logo}>
                                <svg width="225.69" height="197" viewBox="0 0 118 103" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M57 95.1667C57 87.8949 62.8949 82 70.1667 82H82.8333C90.1051 82 96 87.8949 96 95.1667C96 99.4929 92.4929 103 88.1667 103H64.8333C60.5071 103 57 99.4929 57 95.1667ZM70.1667 87C65.6563 87 62 90.6563 62 95.1667C62 96.7315 63.2685 98 64.8333 98H88.1667C89.7315 98 91 96.7315 91 95.1667C91 90.6563 87.3437 87 82.8333 87H70.1667Z" fill="#FF708B"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M100 88.5C100 87.1193 101.119 86 102.5 86H107.5C113.299 86 118 90.701 118 96.5C118 100.09 115.09 103 111.5 103H102.5C101.119 103 100 101.881 100 100.5C100 99.1193 101.119 98 102.5 98H111.5C112.328 98 113 97.3284 113 96.5C113 93.4624 110.538 91 107.5 91H102.5C101.119 91 100 89.8807 100 88.5Z" fill="#FF708B"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M76.5 58C72.3579 58 69 61.3579 69 65.5C69 69.6421 72.3579 73 76.5 73C80.6421 73 84 69.6421 84 65.5C84 61.3579 80.6421 58 76.5 58ZM64 65.5C64 58.5964 69.5964 53 76.5 53C83.4036 53 89 58.5964 89 65.5C89 72.4036 83.4036 78 76.5 78C69.5964 78 64 72.4036 64 65.5Z" fill="#FF708B"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M101.5 69C99.567 69 98 70.567 98 72.5C98 74.433 99.567 76 101.5 76C103.433 76 105 74.433 105 72.5C105 70.567 103.433 69 101.5 69ZM93 72.5C93 67.8056 96.8056 64 101.5 64C106.194 64 110 67.8056 110 72.5C110 77.1944 106.194 81 101.5 81C96.8056 81 93 77.1944 93 72.5Z" fill="#FF708B"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M59.9999 30C59.9999 13.4315 46.5685 0 29.9999 0C13.4314 0 -5.72205e-05 13.4315 -5.72205e-05 30C-5.72205e-05 46.5685 13.4314 60 29.9999 60C35.925 60 41.4547 58.2799 46.1093 55.312L55.678 58.661C58.4675 59.6373 61.1366 56.9305 60.1211 54.155L56.4602 44.1484C58.7193 39.9314 59.9999 35.112 59.9999 30ZM29.9999 5C43.8071 5 54.9999 16.1929 54.9999 30C54.9999 34.6245 53.7466 38.9486 51.5627 42.6596C51.1835 43.304 51.1126 44.0843 51.3695 44.7865L54.3356 52.8938L46.5838 50.1807C45.8242 49.9148 44.983 50.0309 44.3237 50.4926C40.2678 53.3334 35.3322 55 29.9999 55C16.1928 55 4.99994 43.8071 4.99994 30C4.99994 16.1929 16.1928 5 29.9999 5Z" fill="#FF708B"/>
                                    <path d="M23 29.6963C23 32.1816 20.9853 34.1963 18.5 34.1963C16.0147 34.1963 14 32.1816 14 29.6963C14 27.211 16.0147 25.1963 18.5 25.1963C20.9853 25.1963 23 27.211 23 29.6963Z" fill="#FF708B"/>
                                    <path d="M35 29.5C35 31.9853 32.9853 34 30.5 34C28.0147 34 26 31.9853 26 29.5C26 27.0147 28.0147 25 30.5 25C32.9853 25 35 27.0147 35 29.5Z" fill="#FF708B"/>
                                    <path d="M47 29.5C47 31.9853 44.9853 34 42.5 34C40.0147 34 38 31.9853 38 29.5C38 27.0147 40.0147 25 42.5 25C44.9853 25 47 27.0147 47 29.5Z" fill="#FF708B"/>
                                </svg>
                                <h1 className={styles.logo_name}>Spandan</h1>
                                <span className={styles.logo_subtitle}>A emerging way for you to connect&nbsp;.&nbsp;.&nbsp;.</span>
                            </div>
                        </td>
                        <td className={styles.section_right}>
                            <form className={styles.LoginFormContainer} action="">
                                <div className={styles.form_header}>
                                    <span className={`${styles.hello_text} poppins-semibold`}>Hello Again !</span>
                                    <span className={`${styles.welcome_text} poppins-regular`}>Welcome Back</span>
                                </div>
                                <div className={styles.form_inputs}>
                                    <div className={styles.input_group}>
                                        <svg className={styles.input_icon} width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M0 0.75L0.75 0H20.25L21 0.75V14.25L20.25 15H0.75L0 14.25V0.75ZM1.5 2.3025V13.5H19.5V2.304L10.965 8.85H10.05L1.5 2.3025ZM18.045 1.5H2.955L10.5 7.3035L18.045 1.5Z" fill="#CCCCCC"/>
                                        </svg>
                                        <input type="email" id="email" name="email" className={styles.custom_input} placeholder="Email Address" />
                                    </div>

                                    <div className={styles.input_group}>
                                        <svg className={styles.input_icon} width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16 10C16 8.897 15.103 8 14 8H13V5C13 2.243 10.757 0 8 0C5.243 0 3 2.243 3 5V8H2C0.897 8 0 8.897 0 10V18C0 19.103 0.897 20 2 20H14C15.103 20 16 19.103 16 18V10ZM5 5C5 3.346 6.346 2 8 2C9.654 2 11 3.346 11 5V8H5V5Z" fill="#CCCCCC"/>
                                        </svg>
                                        <input type="password" id="password" name="password" className={styles.custom_input} placeholder="Password" />
                                    </div>

                                    <button className={styles.login_button} type="submit">Login</button>
                                </div>
                                <div className={styles.form_footer}>
                                    <span className={`${styles.forget_password} poppins-regular`}>Forgot Password ?</span>
                                    <button className={`${styles.signup_button} poppins-medium`}>
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
                                    <span>Create an account</span>
                                    </button>
                                </div>
                            </form>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default LoginPage;