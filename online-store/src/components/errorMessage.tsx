import React from "react";
interface ErrorMessageProps {
    error: string
}

export function ErrorMes ({error}: ErrorMessageProps) {
    return (
        <p className='text-center'>{ error }</p>
    )
}