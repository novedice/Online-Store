import React from 'react';
import '../assets/GitHubLogo.png';
import '../assets/GitHubLogo1.png';

// import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="flex h-11 w-[100%] items-center justify-around bg-gray-600 text-center align-baseline">
      <div className="github flex">
        <a className="unlink" href="https://github.com/SergeiBuiko">
          <img className="w-[30px]" src="GitHubLogo.png"></img>
        </a>
        <a className="unlink" href="https://github.com/novedice">
          <img className="w-[50px]" src="GitHubLogo1.png"></img>
        </a>
      </div>
      <div className="year">
        <p className="text-header">2022</p>
      </div>
      <div className="rs-school">
        <a className="unlink" href="https://rs.school/js/">
          <img
            className="w-[50px]"
            src="https://rs.school/images/rs_school_js.svg"
            alt="RS-logo"
          ></img>
        </a>
      </div>
    </footer>
  );
}
