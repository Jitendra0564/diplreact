import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../pages/AuthContext'; // Import useAuth

// Function to get the value of a cookie by name
const getCookieValue = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

// Adding Axios interceptor to include the token in the headers of each request
axios.interceptors.request.use(
    (config) => {
        const token = getCookieValue('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const LoginWithGoogleButton = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth(); // Use the login function from AuthContext
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError("");
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let isValid = true;

        if (!email.trim()) {
            setEmailError("Email is required");
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError("Email is invalid");
            isValid = false;
        }

        if (!password.trim()) {
            setPasswordError("Password is required");
            isValid = false;
        } else if (password.length < 4) {
            setPasswordError("Password must be at least 6 characters");
            isValid = false;
        }

        if (isValid) {
            try {
                const response = await axios.post(`${baseURL}/users/login`, { email, password });
                const { token, isAdmin,user,name } = response.data;

                // Set the token and role as cookies
                document.cookie = `token=${token}; path=/`;
                document.cookie = `currentUser=${name}; path=/`;
                document.cookie = `isAdmin=${isAdmin}; path=/`;
                login({ isAdmin, user, token ,name});
                // Navigate to the appropriate panel based on role
                if (isAdmin) {
                    navigate('/admin');
                } else {
                    navigate('/User1');
                }
            } catch (error) {
                console.error('Error response:', error.response); // Log the error response
                setLoginError("Invalid email or password");
            }
        }
    };

    return (
        <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0">
            <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
                <div className="hidden md:block lg:w-1/2 bg-cover bg-blue-700" style={{ backgroundImage: `url(https://www.tailwindtap.com//assets/components/form/userlogin/login_tailwindtap.jpg)` }}></div>
                <div className="w-full p-8 lg:w-1/2">
                    <p className="text-xl text-gray-600 text-center">Welcome back!</p>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                            <input
                                className={`text-gray-700 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700`}
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />

                            {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
                        </div>
                        <div className="mt-4 flex flex-col justify-between">
                            <div className="flex justify-between">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                            </div>
                            <input className={`text-gray-700 border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700`} type="password" value={password} onChange={handlePasswordChange} required />
                            {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
                            {loginError && <p className="text-red-500 text-xs mt-1">{loginError}</p>}
                            {/* <a href="#" className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2">Forget Password?</a> */}
                        </div>
                        <div className="mt-8">
                            <button type="submit" className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600">Login</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default LoginWithGoogleButton;
