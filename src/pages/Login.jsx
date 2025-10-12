import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import hero from '../assets/house.png';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-100">
      <div
        className={`relative flex flex-col md:flex-row w-full max-w-4xl shadow-xl transition-all duration-500 border-4 border-brown-700
          ${isLogin ? 'rounded-tl-[4rem] md:rounded-tr-none' : 'rounded-tr-[4rem] md:rounded-tl-none'}
        `}
      >
        {/* IMAGE SIDE */}
        <div
          className={`w-full md:w-1/2 h-64 md:h-auto bg-cover bg-center transition-all duration-500 ${
            isLogin
              ? 'order-1 md:rounded-tl-[4rem]'
              : 'order-2 md:rounded-tr-[4rem]'
          }`}
          style={{
            backgroundImage: `url(${hero})`,
          }}
        ></div>

        {/* FORM SIDE */}
        <div className="w-full md:w-1/2 bg-white">
          {/* TOGGLE BUTTONS */}
          <div className="flex">
            <button
              className={`w-1/2 py-3 font-bold text-lg transition-all duration-300 ${
                isLogin
                  ? 'text-white bg-brown'
                  : 'text-black bg-white hover:bg-gray-200'
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`w-1/2 py-3 font-bold text-lg transition-all duration-300 ${
                !isLogin
                  ? 'text-white bg-brown'
                  : 'text-black bg-white hover:bg-gray-200'
              }`}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>

          {/* FORM ANIMATION */}
          <motion.div
            key={isLogin ? 'login' : 'register'}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6"
          >
            {isLogin ? <LoginForm /> : <RegisterForm />}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
