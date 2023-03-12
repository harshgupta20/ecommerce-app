import React from 'react';

import "../styles/Footer.css";

const Footer = () => {
  return (
    <>
        <div id="footer">
            <p id="foo-p1">Made by <a id="foo-p1-a" href="https://www.linkedin.com/in/harshgupta2001/">Harsh Gupta</a></p>
            <p id="foo-p2">Ecommerce WEB APP </p>
            <ul id="foo-ul">
                <a href="https://github.com/harshgupta20"><li id="foo-li">Github</li></a>
                <a href="https://www.linkedin.com/in/harshgupta2001/"><li id="foo-li">Linkedin</li></a>
                <a href="https://twitter.com/harshgupta203"><li id="foo-li">Twitter</li></a>
            </ul>
        </div>
    </>
  )
}

export default Footer