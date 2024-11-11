import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
    return (
        <div className='flex justify-center ' style={{ backgroundColor: '#0B192C', width: '100vw', height: '85vh' }}>
            <div
                className='flex flex-col md:flex-row flex-wrap bg-white rounded-lg px-6 md:px-10 lg:px-20'
                style={{ width: '1200px', height: '600px', margin: '0' }}
            >
                {/*------- Left Side ------- */}
                <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px] mt-[-140px]'>
                    <p className='text-[170px]  text-[#0B192C] font-bold leading-tight md:leading-tight lg:leading-tight'>
                        XYLAZ
                    </p>
                    <p className="text-gray-600 text-[50px] font-semibold tracking-[25px] mt-[-40px] text-center">BARBERSHOP</p>
                    <p className="text-gray-400 text-[24px] font-regular  mt-[-15px] mb-9">Simply browse through our extensive list of skilled barbers, schedule your appointment hassle-free.</p>

                    <a href="barbers" className='flex items-center gap-2 bg-[#0B192C] px-10 py-4 rounded-50 text-white text-[16px] m-auto md:m-0 hover:scale-105 transition-all duration-300  '>
                        Book appointment <img className='w-3' src={assets.arrow_icon} alt="" />
                    </a>
                </div>

                {/*------- Right Side ------- */}
                <div className='md:w-1/2 relative'>
                    <img className='w-full md:absolute bottom-0 h-auto rounded-lg ml-10 mb-10' src='/src/picture/iconbackground.png' alt="" />
                    <img className='w-full md:absolute bottom-0 h-auto rounded-lg ml-10 mb-10' src='/src/picture/icon-header.png' alt="" />
                </div>
            </div>
        </div>

    )
}

export default Header