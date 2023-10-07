import React, { useEffect, useState } from 'react'
import '../../styles/LoginPage.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('') //
    const navigate = useNavigate()

    // const [error, setError] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        try {

        } catch (error) {

        }
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            if (password.length < 6) {
                setError('Password Less Than 6 Characters')
                return
            }
            if (confirmPassword !== password) {
                setError('Passwod Salah')
                return
            }
            const response = await axios.post(`http://10.237.44.16:321/auth/register`, {
                username: username,
                password: password
            })
            console.log(response.data);  // Add this line
            
        } catch (error) {
            console.error(error); // Log any errors for debugging
            setError('An error occurred during registration'); // 
        }
    }

    useEffect(() => {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');

        const handleSignUpClick = () => {
            container.classList.add("right-panel-active");
        };

        const handleSignInClick = () => {
            container.classList.remove("right-panel-active");
        };

        signUpButton.addEventListener('click', handleSignUpClick);
        signInButton.addEventListener('click', handleSignInClick);

        // Cleanup event listeners on component unmount
        return () => {
            signUpButton.removeEventListener('click', handleSignUpClick);
            signInButton.removeEventListener('click', handleSignInClick);
        };
    }, []);

    return (
        <>
            <div className="container" id="container">
                <div className="form-container sign-up-container">
                    <form onSubmit={handleRegister} >
                        <h1>Create Account</h1>
                        <input className='mt-3' type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                        <button type='submit' className='mt-3 button-submit'>Sign Up</button>

                        {error && <div className="error-message">{error}</div>}
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form onSubmit={handleLogin}>
                        <h1>Sign in</h1>
                        <input className='mt-3' type="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <a href="#">Forgot your password?</a>
                        <button type='submit'>Sign In</button>
                        {error && <div className="error-message">{error}</div>}
                    </form>
                </div>

                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" id="signIn">Sign In</button>
                        </div>

                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className="ghost" id="signUp">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default LoginPage
