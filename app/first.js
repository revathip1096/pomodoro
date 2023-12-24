// First.js
"use client"
import React, { useState, useEffect } from 'react';
import Timer from './timer';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Setting from './setting';
import {auth,provider} from './firebase-config';
import { signInWithPopup,signOut } from 'firebase/auth';
import {BsGithub} from "react-icons/bs"
import Link from 'next/link';


function First() {
  const [user,setUser]=useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const [pomodoro, setPomo] = useState(25);
  const [sb, setSb] = useState(5);
  const [lb, setLb] = useState(15);
  const [color, setColor] = useState('#f87070');
  const [font, setFont] = useState('Open Sans');

  const [timeLeft, setTimeLeft] = useState(pomodoro * 60); 

  const tabs = ["Pomodoro", "Short break", "Long break"];
  const tabDurations = [pomodoro, sb, lb];



  useEffect(() => {
    if (isTimerRunning && timeLeft === 0 && selectedTab === 0) {
      setSelectedTab(1); 
      setIsTimerRunning(false); 
      toast.info('Pomodoro completed! Starting Short Break', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }, [isTimerRunning, timeLeft, selectedTab]);

  const toggleTimer = (isRunning) => {
    setIsTimerRunning(isRunning);
  };

  const handleTabClick = (index) => {
    if (!isTimerRunning) {
      setSelectedTab(index);
    } else {
      toast.warn('A timer is running. Pause it to change mode', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  const SignIn = async ()=>{
    try{
      const res = await signInWithPopup(auth,provider);
      setUser(res.user.uid);
      
    }
    catch(err)
    {
      console.log(err);
    }
  }

  useEffect(()=>{
    if (user==="null" || user===null || user==="undefined") {
     return;
    } 
    localStorage.setItem("user",user);
  }, [user])
  useEffect(()=>{
    
    setUser(localStorage?.user);
  }, [])

  const signout=async ()=>{
    
    await signOut(auth).then(() => {
          localStorage.removeItem("user");
          console.log("Signed out successfully");
          setUser(null)
      }).catch((error) => {
      console.log(error)
      });
  }

  return (
    <>
<div className="flex justify-end gap-4 mr-4 mt-1">
  <button
    onClick={user ? signout : SignIn}
    type="button"
    className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
  >
    {user ? "Sign Out" : "Sign In"}
  </button>
  <Link href="https://github.com/revathip1096/pomodoro"><BsGithub className="h-[40px] w-[60px]"/></Link>
</div>




   
    <div className="flex flex-col items-center justify-center">
      <div className="mt-[50px]">
        <img
          src="https://mcornale-pomodoro-app.netlify.app/static/media/logo.7479961e8a1563f1f8124a7cff89bef2.svg"
          alt="Logo"
        />
      </div>
      <nav>
        <div className="w-fit  border-white mt-[50px]">
          <ul className="z-0 relative flex list-none flex-wrap rounded-3xl bg-[#161932] p-1 " data-tabs="tabs" role="list">
            {tabs.map((tab, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0, backgroundColor: selectedTab === index ? color : '' }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ ease: "linear", duration: 0.2 }}
                className={` flex-auto rounded-3xl px-10 py-[10px]  text-center ${selectedTab === index ? [{color}] : ''}`}
              >
                <a
                  className={` text-white text-slate-700 z-30 mb-0 flex w-full cursor-pointer items-center justify-center rounded-lg border-0 bg-inherit px-0 py-1 transition-all ease-in-out ${selectedTab === index ? 'text-white' : ''}`}
                  onClick={() => handleTabClick(index)}
                  role="tab"
                  aria-selected={selectedTab === index}
                >
                  <span className={`ml-1 font-${font}`} >{tab}</span>
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      </nav>
      <div className="p-4 mt-[60px]">
        {tabs[selectedTab] === "Pomodoro" && (
          <div>
            <Timer
              isTimerRunning={isTimerRunning}
              toggleTimer={toggleTimer}
              time={tabDurations[selectedTab]}
              color={color}
              
            />
          </div>
        )}
        {tabs[selectedTab] === "Short break" && (
          <div>
            <Timer
              isTimerRunning={isTimerRunning}
              toggleTimer={toggleTimer}
              time={tabDurations[selectedTab]}
              color={color}
            />
          </div>
        )}
        {tabs[selectedTab] === "Long break" && (
          <div>
            <Timer
              isTimerRunning={isTimerRunning}
              toggleTimer={toggleTimer}
              time={tabDurations[selectedTab]}
              color={color}
            />
          </div>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      <Setting
        pomodoro={pomodoro}
        setPomo={setPomo}
        sb={sb}
        setSb={setSb}
        lb={lb}
        setLb={setLb}
        setColor={setColor}
        setFont={setFont}
        font={font}
      />
    </div>
    </>
  );
}

export default First;
