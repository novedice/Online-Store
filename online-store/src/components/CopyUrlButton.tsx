import { useEffect } from 'react';
import { useState } from 'react';
export const CopyUrlButton = () => {
  const [copySuccess, setCopySuccess] = useState('');

  const copyHref = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopySuccess('Copied!');
  };

  useEffect(() => {
    setTimeout(() => setCopySuccess(''), 2000);
  }, [copySuccess]);

  return (
    <button
      onClick={() => {
        copyHref();
      }}
      className="w-36 rounded border bg-green-300 px-2 pt-1 pb-1 hover:bg-green-400"
    >
      {copySuccess ? <span className="blink">{copySuccess}</span> : 'Copy link'}
    </button>
  );
};
