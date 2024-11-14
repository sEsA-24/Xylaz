import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
// import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Receipt from './pages/Receipt';
import Barbers from './pages/Barbers';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import About from './pages/About';
import MyProfile from './pages/MyProfile';
import MyAppointments from './pages/MyAppointments';
import Appointment from './pages/Appointment';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './index.css';
import axios from 'axios';

const App = () => {
    const [data, setData] = useState('');
    const location = useLocation();
    const showNavbar = location.pathname !== '/my-appointments';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8085');
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className='pt-[0rem]'>
            {showNavbar && <Navbar />} {/* จะแสดง Navbar เฉพาะเมื่อไม่อยู่ในหน้า /my-appointments */}
            <h1>{data}</h1> {/* แสดงข้อมูลที่ดึงมา */}
            <Routes>
                <Route path='/signin' element={<Auth />} />
                <Route path='/SignUp' element={<Auth />} />
                <Route path='/' element={<Home />} />
                <Route path='/barbers' element={<Barbers />} />
                <Route path='/barbers/:speciality' element={<Barbers />} />
                <Route path='/barbers/:topbarbers' element={<Barbers />} />
                <Route path='/receipt/:appointmentId' element={<Receipt />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/my-profile' element={<MyProfile />} />
                <Route path='/my-appointments' element={<MyAppointments />} />
                <Route path='/appointment/:docId' element={<Appointment />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;
