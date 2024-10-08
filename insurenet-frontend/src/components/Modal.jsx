import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

const Modal = ({ isOpen, onClose, title }) => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        password: ''
    });

    if (!isOpen) return null;

    async function handleMetaMaskLogin() {
        if (window.ethereum) {
            try {
                // Request accounts from MetaMask
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const address = accounts[0];

                // Check if the user is already connected
                if (localStorage.getItem('connectedAddress') === address) {
                    alert('You are already connected.');
                    navigate('/dashboard'); // Redirect to dashboard if already connected
                } else {
                    localStorage.setItem('connectedAddress', address);
                    navigate('/dashboard'); // Redirect to dashboard after connecting
                }
            } catch (error) {
                console.error('Error connecting to MetaMask:', error);
                alert('Error connecting to MetaMask. Please try again.');
            }
        } else {
            alert('MetaMask not installed. Please install MetaMask to use this feature.');
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Add form submission logic here (e.g., API call to register/sign in the user)
        if (title === "Create a new account") {
            console.log('Sign Up Data:', formData);
            // API call for sign-up
        } else {
            console.log('Sign In Data:', formData);
            // API call for sign-in
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div id="modal-popup" className="bg-black/50 overflow-y-auto overflow-x-hidden font-montserrat fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex">
                <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                    <div className="relative bg-white mt-14 px-4 pt-3 rounded-lg shadow">
                        <button 
                            type="button" 
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                            onClick={onClose}
                        >
                            <svg aria-hidden="true" className="w-5 h-5" fill="#c6c7c7" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                            <span className="sr-only">Close popup</span>
                        </button>
                        <div className="p-5">
                            <div className="text-center">
                                <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">{title}</p>
                            </div>
                            <div className="mt-7 flex flex-col gap-2">
                                {/* Social login buttons */}
                            <button className="inline-flex items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 128 128"><path d="M97.905 67.885c.174 18.8 16.494 25.057 16.674 25.137-.138.44-2.607 8.916-8.597 17.669-5.178 7.568-10.553 15.108-19.018 15.266-8.318.152-10.993-4.934-20.504-4.934-9.508 0-12.479 4.776-20.354 5.086-8.172.31-14.395-8.185-19.616-15.724C15.822 94.961 7.669 66.8 18.616 47.791c5.438-9.44 15.158-15.417 25.707-15.571 8.024-.153 15.598 5.398 20.503 5.398 4.902 0 14.106-6.676 23.782-5.696 4.051.169 15.421 1.636 22.722 12.324-.587.365-13.566 7.921-13.425 23.639M82.272 21.719c4.338-5.251 7.258-12.563 6.462-19.836-6.254.251-13.816 4.167-18.301 9.416-4.02 4.647-7.54 12.087-6.591 19.216 6.971.54 14.091-3.542 18.43-8.796"/></svg>
                                Continue with Apple
                            </button>
                            <button className="inline-flex items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black">
                                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
                                Continue with Google
                            </button>
                            <button className="inline-flex items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="#1877F2" viewBox="0 0 32 32">
                                    <path d="M29 0H3C1.35 0 0 1.35 0 3v26c0 1.65 1.35 3 3 3h14V20h-4v-5h4v-3.5c0-4.14 2.49-6.5 6.26-6.5 1.81 0 3.7.32 3.7.32v4h-2.08C22.24 9.32 21 10.52 21 12.36V15h5l-1 5h-4v12h7c1.65 0 3-1.35 3-3V3c0-1.65-1.35-3-3-3z"/>
                                </svg>
                                Continue with Facebook
                            </button>
                                <button onClick={handleMetaMaskLogin} className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask" className="h-[18px] w-[18px]" />
                                    Continue with MetaMask
                                </button>
                            </div>
                            <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
                                <div className="h-px w-full bg-slate-200"></div>
                                OR
                                <div className="h-px w-full bg-slate-200"></div>
                            </div>
                            <form className="w-full" onSubmit={handleFormSubmit}>
                                {title === "Create a new account" ? (
                                    <>
                                        <label htmlFor="fullName" className="sr-only">Full Name</label>
                                        <input 
                                            name="fullName" 
                                            type="text" 
                                            required 
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            className="block w-full p-2.5 border border-slate-300 rounded bg-gray-50 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-[#333]" 
                                            placeholder="Full Name" 
                                        />
                                        <label htmlFor="phoneNumber" className="sr-only">Phone Number</label>
                                        <input 
                                            name="phoneNumber" 
                                            type="text" 
                                            required 
                                            value={formData.phoneNumber}
                                            onChange={handleInputChange}
                                            className="block w-full p-2.5 border border-slate-300 rounded bg-gray-50 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-[#333]" 
                                            placeholder="Phone Number" 
                                        />
                                        <label htmlFor="email" className="sr-only">Email</label>
                                        <input 
                                            name="email" 
                                            type="email" 
                                            required 
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="block w-full p-2.5 border border-slate-300 rounded bg-gray-50 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-[#333]" 
                                            placeholder="Email" 
                                        />
                                        <label htmlFor="password" className="sr-only">Password</label>
                                        <input 
                                            name="password" 
                                            type="password" 
                                            required 
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="block w-full p-2.5 border border-slate-300 rounded bg-gray-50 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-[#333]" 
                                            placeholder="Password" 
                                        />
                                        <button type="submit" className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-[#333] text-white p-2.5 text-sm font-medium outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1">Sign Up</button>
                                    </>
                                ) : (
                                    <>
                                        <label htmlFor="email" className="sr-only">Email</label>
                                        <input 
                                            name="email" 
                                            type="email" 
                                            required 
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="block w-full p-2.5 border border-slate-300 rounded bg-gray-50 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-[#333]" 
                                            placeholder="Email" 
                                        />
                                        <label htmlFor="password" className="sr-only">Password</label>
                                        <input 
                                            name="password" 
                                            type="password" 
                                            required 
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="block w-full p-2.5 border border-slate-300 rounded bg-gray-50 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-[#333]" 
                                            placeholder="Password" 
                                        />
                                        <button type="submit" className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-[#333] text-white p-2.5 text-sm font-medium outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1">Sign In</button>
                                    </>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div id="overlay" className="fixed inset-0 bg-black opacity-50"></div>
        </>
    );
}

export default Modal;