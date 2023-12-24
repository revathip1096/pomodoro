"use client"; 

import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion, useAnimation } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 


const Timer = ({ isTimerRunning, toggleTimer, time, color }) => {
  const [timeLeft, setTimeLeft] = useState(time * 60);
  const controls = useAnimation();

  useEffect(() => {
    let intervalId;
    if (isTimerRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft === 0) {
            clearInterval(intervalId);
            toggleTimer(false);
            controls.start({
              scale: [1, 1.2, 1],
              transition: { duration: 0.5 },
            });
            return 0;
          }
          return prevTimeLeft - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isTimerRunning, timeLeft, toggleTimer, controls]);

  useEffect(() => {
    setTimeLeft(time * 60);
  }, [time]);

  const handleProgressBarClick = () => {
    if (!isTimerRunning) {
      toggleTimer(true);
    }
  };
  const checkuser = () => {
    const user = localStorage.getItem("user");
    if (user === "null" || user === null || user === "undefined") {
      toast.info("Please SignIn", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toggleTimer(!isTimerRunning);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div
      className="flex flex-col items-center justify-center p-6 relative bg-[#161932] rounded-full"
      style={{
        boxShadow: "-5rem -5rem 10rem 0 #272c5a, 5rem 5rem 10rem 0 #121530",
      }}
    >
      <div className="">
        <div className="cursor-pointer " onClick={handleProgressBarClick}>
          <CircularProgressbar
            value={((time * 60 - timeLeft) / (time * 60)) * 100}
            text={`${minutes}:${seconds.toString().padStart(2, "0")}`}
            strokeWidth={5}
            styles={buildStyles({
              pathColor: color,
              textColor: color,
            })}
          />
        </div>
        <motion.button
          onClick={checkuser}
          whileTap={{ scale: 0.95 }}
          className="text-white font-semibold py-2 my-[50px] px-4 rounded-full focus:outline-none focus:shadow-outline"
          style={{
            position: "absolute",
            top: "50%",
            left: "41%",
          }}
        >
          {isTimerRunning ? "Pause" : "Start"}
        </motion.button>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Timer;
