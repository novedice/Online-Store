import React from 'react';

interface ModalWindowProps {
  children: React.ReactNode;
  title: string;
  toClose: () => void;
}

export function ModalWindow({ children, title, toClose }: ModalWindowProps) {
  return (
    <>
      <div
        className="fixed top-0 right-0 left-0 bottom-0 bg-black/50"
        onClick={toClose}
      />
      <div className="absolute top-5 left-1/2 max-w-[700px] -translate-x-1/2 rounded bg-white p-8">
        <p>{title}</p>
        {children}
      </div>
    </>
  );
}
