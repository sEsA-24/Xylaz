import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Barbers = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [gender, setGender] = useState(null); // State สำหรับเก็บ gender ที่เลือก
  const navigate = useNavigate();
  const { barbers } = useContext(AppContext);

  const applyFilter = () => {
    let filteredDoctors = barbers;


    // กรองตาม gender
    if (gender) {
      filteredDoctors = filteredDoctors.filter(doc => doc.gender === gender);
    }

    setFilterDoc(filteredDoctors);
  };

  useEffect(() => {
    applyFilter();
  }, [barbers, speciality, gender]); // เพิ่ม gender ใน dependency array

  return (
    <div>
      <p className='text-gray-600'>Browse through the expert barbers.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`} onClick={() => setShowFilter(prev => !prev)}>Filters</button>
        
        {/* ปุ่มเลือกเพศ */}
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p onClick={() => setGender(gender === 'Male' ? null : 'Male')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${gender === "Male" ? "bg-indigo-100 text-black" : ""}`}>Male</p>
          <p onClick={() => setGender(gender === 'Female' ? null : 'Female')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${gender === "Female" ? "bg-indigo-100 text-black" : ""}`}>Female</p>
        </div>

        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {
            filterDoc.map((item, index) => (
              <div onClick={() => navigate(`/appointment/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                <img className='bg-blue-50' src={item.image} alt="" />
                <div className='p-4'>
                  <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                    <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                  </div>
                  <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                  <p className='text-gray-600 text-sm'>{item.gender}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Barbers;
