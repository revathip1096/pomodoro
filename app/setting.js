"use client";

import React, { useState, useRef } from "react";
import { AiFillSetting } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function Setting(props) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pomodoroValue, setPomodoroValue] = useState(props.pomodoro); 
  const [shortBreakValue, setShortBreakValue] = useState(props.sb); 
  const [longBreakValue, setLongBreakValue] = useState(props.lb); 
  const [selectedFont, setSelectedFont] = useState(props.font);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const pomodoroRef = useRef(null);
  const shortBreakRef = useRef(null);
  const longBreakRef = useRef(null);
  const fontRef = useRef(null);

  const handlePomodoroChange = (e) => {
    setPomodoroValue(parseInt(e.target.value));
  };

  const handleShortBreakChange = (e) => {
    setShortBreakValue(parseInt(e.target.value));
  };

  const handleLongBreakChange = (e) => {
    setLongBreakValue(parseInt(e.target.value));
  };

  const handleFontChange = (e) => {
    setSelectedFont(e.target.value);
  };

  const SaveModal = () => {
    props.setPomo(pomodoroValue);
    props.setSb(shortBreakValue);
    props.setLb(longBreakValue);
   
    props.setFont(selectedFont);

    console.log(pomodoroValue); 

    closeModal();
  };
  const checkuser = () => {
    const user = localStorage.getItem("user");
    console.log(user);
    if (user==="null" || user===null|| user==="undefined") {
      toast.info('Please SignIn', {
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
      openModal();
    }
  };
  

  return (
    <div className="">
      <AiFillSetting
        className="w-12 h-9 mb-10 cursor-pointer"
        onClick={checkuser}
      />

      <div
        className={`fixed absolute  inset-0 flex items-center text-black justify-center  ${
          isModalOpen ? "" : "hidden"
        }`}
      >
        <div className=" modal-overlay fixed inset-0  transition-opacity mb-[90px] absolute top-0 left-0 "></div>
        <div className="modal-container bg-white w-full md:w-1/2 mx-auto rounded-lg shadow-lg transform translate-y-1/2 transition-transform">
          <div className="modal-header p-4 border-b">
            <h2 className="text-xl font-semibold text-black">Settings</h2>
            <button
              onClick={closeModal}
              className="float-right focus:outline-none mt-[-20px]"
            >
              <GrClose />
            </button>
          </div>
          <div className="modal-body flex flex-col justify-center items-center mb-8">
            <div className="space-y-3 w-10/12 md:w-1/2 my-4 text-center ">
              <p>Time (minutes)</p>
              <div className="flex flex-col md:flex-row">
                <div className="mb-3 md:mb-0 md:mr-3  w-full md:w-1/3">
                  <div className="flex flex-col">
                    <label htmlFor="pomodoro">Pomodoro</label>
                    <input
                      type="number"
                      id="pomodoro"
                      max={60}
                      value={pomodoroValue} 
                      min={0}
                      className="border rounded-md p-1 w-full"
                      ref={pomodoroRef}
                      onChange={handlePomodoroChange} 
                    />
                  </div>
                </div>
                <div className="mb-3 md:mb-0 md:mr-3 w-full md:w-1/3">
                  <div className="flex flex-col">
                    <label htmlFor="shortBreak">Short break</label>
                    <input
                      type="number"
                      max={60}
                      value={shortBreakValue} 
                      min={0}
                      id="shortBreak"
                      className="border rounded-md p-1 w-full"
                      ref={shortBreakRef}
                      onChange={handleShortBreakChange} 
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/3">
                  <div className="flex flex-col">
                    <label htmlFor="longBreak">Long break</label>
                    <input
                      type="number"
                      min={0}
                      value={longBreakValue} 
                      max={60}
                      id="longBreak"
                      className="border rounded-md p-1 w-full"
                      ref={longBreakRef}
                      onChange={handleLongBreakChange} 
                    />
                  </div>
                </div>
              </div>
              <hr />
              <div className="w-full flex justify-between ">
                Font
                <div className="">
                  <input
                    type="radio"
                    name="font"
                    value="sans"
                    id="font-sans"
                    className="hidden"
                    ref={fontRef}
                    checked={selectedFont === "sans"} 
                    onChange={handleFontChange} 
                  />
                  <label
                    htmlFor="font-sans"
                    className={`font-[sans] rounded-full cursor-pointer hover:bg-black hover:text-white px-2 py-1 mx-2 ${
                      selectedFont === 'sans' ? 'bg-[#eff1fa] text-black' : ''
                    }`}
                    onClick={() => fontRef.current.click()}
                  >
                    Aa
                  </label>
                  <input
                    type="radio"
                    name="font"
                    value="mono"
                    id="font-mono"
                    className="hidden"
                    ref={fontRef}
                    checked={selectedFont === "mono"} 
                    onChange={handleFontChange} 
                  />
                  <label
                    htmlFor="font-mono"
                    className={`font-[mono] rounded-full cursor-pointer hover:bg-black hover:text-white px-2 py-1 mx-2 ${
                      selectedFont === 'mono' ? 'bg-[#eff1fa] text-black' : ''
                    }`}
                    onClick={() => fontRef.current.click()}
                  >
                    Aa
                  </label>
                  <input
                    type="radio"
                    name="font"
                    value="serif"
                    id="font-serif"
                    className="hidden"
                    ref={fontRef}
                    checked={selectedFont === "serif"} 
                    onChange={handleFontChange} 
                  />
                  <label
                    htmlFor="font-serif"
                    className={`font-[serif] rounded-full cursor-pointer hover:bg-black hover:text-white px-2 py-1 mx-2 ${
                      selectedFont === 'serif' ? 'bg-[#eff1fa] text-black' : ''
                    }`}
                    onClick={() => fontRef.current.click()}
                  >
                    Aa
                  </label>
                </div>
              </div>
              <hr />
              <div className="w-full flex justify-between ">
                Color
                <div >
                  <span
                    className={`rounded-full bg-[#3558f2] w-2 px-3  py-1 h-2 mx-2 ${
                      props.color === '#3558f2' ? 'bg-[#3558f2]' : ''
                    }`}
                    onClick={() => props.setColor('#3558f2')}
                  ></span>
                  <span
                    className={`rounded-full bg-[#30e691] w-3 px-3 py-1 mx-2 ${
                      props.color === '#30e691' ? 'bg-[#30e691]' : ''
                    }`}
                    onClick={() => props.setColor('#30e691')}
                  ></span>
                  <span
                    className={`rounded-full bg-[#f87070] px-3 py-1 mx-2 ${
                      props.color === '#f87070' ? 'bg-[#f87070]' : ''
                    }`}
                    onClick={() => props.setColor('#f87070')}
                  ></span>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer p-4 border-t">
            <button onClick={SaveModal} className="btn bg-cyan-400 hover:scale-125 p-4 rounded-2xl hover:bg-black hover:text-white">
              Save
            </button>
          </div>
        </div>
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
}

export default Setting;
