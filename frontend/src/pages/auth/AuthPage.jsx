import React, { useEffect, useState } from 'react'
import '../../styles/AuthPage.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const AuthPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {

            const cleanedUsername = username.trim();
            const cleanedPassword = password.trim();

            if (!/^\S+$/.test(cleanedUsername)) {
                setError('Username cannot contain spaces');
                setTimeout(() => {
                    setError('');
                }, 1500);
                return;
            }

            if (!/^\S+$/.test(cleanedPassword)) {
                setError('Password cannot contain spaces');
                setTimeout(() => {
                    setError('');
                }, 1500);
                return;
            }

            const response = await axios.post(`http://10.237.62.101:321/auth/login`, {
                username: username,
                password: password
            })

            if (response.status === 204) {
                setError('Username or Password is wrong')
                setTimeout(() => {
                    setError('')
                }, 1500)
            }

            if (response.status === 200) {
                navigate('/home')
            }

        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred during registration');
            setTimeout(() => {
                setError('');
            }, 1500);
        }
    }

    const handleSignInClick = () => {
        container.classList.remove("right-panel-active");
    };

    const handleRegister = async (e) => {
        e.preventDefault()
        try {

            const cleanedUsername = username.trim();
            const cleanedPassword = password.trim();

            if (!/^\S+$/.test(cleanedUsername)) {
                setError('Username cannot contain spaces');
                setTimeout(() => {
                    setError('');
                }, 1500);
                return;
            }

            if (!/^\S+$/.test(cleanedPassword)) {
                setError('Password cannot contain spaces');
                setTimeout(() => {
                    setError('');
                }, 1500);
                return;
            }

            if (password.length < 6) {
                setError('Password Less Than 6 Characters')
                setTimeout(() => {
                    setError('');
                }, 1500);
                return
            }

            if (confirmPassword !== password) {
                setError('Password do not match')
                setTimeout(() => {
                    setError('');
                }, 1500);
                return
            }

            const response = await axios.post(`http://10.237.62.101:321/auth/register`, {
                username: username,
                password: password
            })

            if (response.status === 200) {
                setError('Username already in use')
                setTimeout(() => {
                    setError('');
                }, 1500);
                return
            }

            if (response.status === 201) {
                handleSignInClick();
            }

        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred during registration');
            setTimeout(() => {
                setError('');
            }, 1500);
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

        return () => {
            signUpButton.removeEventListener('click', handleSignUpClick);
            signInButton.removeEventListener('click', handleSignInClick);
        };
    }, []);

    return (
        <div className='auth-container'>
            <div className="container" id="container">
                <div className="form-container sign-up-container">
                    <form onSubmit={handleRegister} >
                        <h1>Create Account</h1>
                        <input className='mt-3' type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                        {error && <div className="error-message">{error}</div>}
                        <button type='submit' className='mt-3 button-submit'>Sign Up</button>
                    </form>
                </div>

                <div className="form-container sign-in-container">
                    <form onSubmit={handleLogin}>
                        <h1>Sign in</h1>
                        <input className='mt-3' type="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        {error && <div className="error-message">{error}</div>}
                        <a href="#">Forgot your password?</a>
                        <button type='submit'>Sign In</button>
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
        </div>
    )
}

export default AuthPage
