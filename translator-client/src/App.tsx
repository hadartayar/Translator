import React, { useState, useEffect } from 'react';
import { Apps } from './Models/Types';
import './Styles/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getAllApps } from './Services/appService';
import { PresentApps } from './Pages/PresentApps';
import { PresentTranslations } from './Pages/PresentTranslations';

const App = () => {
  const [apps, setApps] = useState<Apps>([]);

  //Get All Apps from the server:

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllApps();
      if (!response) {
        throw new Error('Network response was not ok');
      }
      // Set data to state
      setApps(response);
    };
    fetchData();
    window.history.replaceState(null, '', '/'); //any refresh - back to 'My Apps' Page
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PresentApps apps={apps} setApps={setApps} />} />
          <Route path="/app/:appId" element={<PresentTranslations apps={apps} setApps={setApps} />} />
          <Route path="*" element={<h2> 404 error - Page Not Found</h2>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
