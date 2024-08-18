import React from 'react'
import style from '../Faxs/StyleImage.module.css'
import { Person } from '@mui/icons-material'
import { jwtDecode } from 'jwt-decode'
export default function Header() {
  const token = localStorage.getItem('auth');
  const image = jwtDecode(token).image;
  return (
    <div className='relative top-0 flex justify-center h-fit mx-auto pt-2 gap-2 px-4 w-full shadow-lg py-2 rounded-xl'>
      {/* {image && <img alt='logo' src='/logo.png' className={`absolute right-4 w-8 md:w-12 lg:w-16 h-14`} />}
      {!image && <Person sx={{ fontSize: '3.2rem', color: 'gray' }} className='absolute right-4 bg-gray-200 mt-2 rounded-full border-2 ' />} */}
      <div className='flex'>
        <img alt='logo' src='/logo.png' className={`${style.slidecaption} w-8 md:w-12 lg:w-16 h-16`} />
        <h1 className='font-bold text-base text-center lg:text-xl m-auto px-2'> منظومه فرع شئون ضباط / هيئه الاستخبارات العسكريه</h1>
        <img alt='logo' src='/logo.png' className={`${style.slidecaption} w-8 md:w-12 lg:w-16 h-16`} />
      </div>
    </div>
  )
}
