import './App.css';
import ControlInput from './components/ControlInput';
import ControlOutput from './components/ControlOutput';
import TableList from './components/TableList';
import { Provider } from './context';
import { Routes, Route } from "react-router-dom";
import Account from './components/Account';
import { useState } from 'react';


function App() {

  return (
    <div className="full-app">
      <h1 className="text-center mt-2">Automated Parking System</h1>
      <div className="app d-flex align-items-center  justify-content-between">
        <div className="view-in-out d-flex flex-column flex-grow-1" style={{ marginRight: 100 }}>

          <div className="d-flex align-items-center"
            style={{ marginBottom: 100 }}
          >

              <ControlInput />
          </div>


          <div className="d-flex align-items-center">
            {/* <div className="camera-block">
              <video id="video-out" width="100%" height="100%" controls crossOrigin="anonymous">
                <source src="output.mp4" type="video/mp4" />
                Your browser does not support HTML video.
              </video>
            </div> */}

              <ControlOutput />
          </div>


        </div>
        <div>
          <TableList />
        </div>

      </div>

      {/* <img alt="ảnh" id="image" crossOrigin="anonymous" />
      <canvas id="canvas" /> */}
    </div>

  );
}

export default function Index() {
  return <>
    <Provider>
      
      <Routes>
        <Route index element={<App />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Provider>
  </>
};
