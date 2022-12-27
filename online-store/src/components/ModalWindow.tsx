import React from 'react';

interface ModalWindowProps {
  children: React.ReactNode
  title: string
  toClose: ()=> void
}

export function ModalWindow({ children, title, toClose }: ModalWindowProps) {
  return (
    <>
      <div className='fixed bg-black/50 top-0 right-0 left-0 bottom-0' onClick={toClose}/>
      <div className='w-[500px] p-5 rounded bg-white absolute top-5 left-1/2 -translate-x-1/2'>
        <p>{ title }</p>
        { children }
      </div>
    </>
  )
}