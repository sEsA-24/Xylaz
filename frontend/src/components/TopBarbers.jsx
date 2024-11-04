import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopBarbers = () => {

    const navigate= useNavigate()
    const {barbers} = useContext(AppContext)

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10 mt-20'id='topbarbers'>
        <h1 className='text-3xl font-medium mt-5'>Barbers to Book</h1>
        <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of skilled barbers.</p>
        <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
            {barbers.slice(0,5).map((item,index)=>(
                <div onClick={()=>{navigate(`/appointment/${item._id}`);scrollTo(0,0)}} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                    <img className='bg-blue-50' src={item.image} alt="" />
                    <div className='p-4'>
                        <div className='flex items-center gap-2 test-sm text-center text-green-500'>
                            <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                        </div>
                        <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                        <p className='text-gray-600 text-sm'>{item.gender}</p>
                    </div>
                </div>
            ))}
        </div>
        <button onClick= {()=>{navigate('/barbers'); scrollTo(0,0)}}className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-5'>more</button>
    </div>
  )
}

export default TopBarbers
