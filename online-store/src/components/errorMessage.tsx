import React from "react";
interface ErrorMessageProps {
  error: string;
}

const ErrorMes: React.FC<ErrorMessageProps> = ({ error }) => {
    return <p className="text-center">{error}</p>;
}

export default  ErrorMes;