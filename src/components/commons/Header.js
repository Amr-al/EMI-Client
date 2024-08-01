import React from 'react'

export default function Header() {
  return (
    <div className='flex justify-center h-fit mx-auto pt-2 gap-2'>
        <img src='/logo.png' className='w-12 lg:w-20' />
        <h1 className='font-bold text-base lg:text-xl m-auto'> منظومه هيئة الاستخبارات العسكريه / شئون ضباط</h1>
        <img src='/logo.png' className='w-12 lg:w-20' />
    </div>
  )
}
