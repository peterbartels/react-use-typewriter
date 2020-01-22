import React from "react";
import useTypewriter from "react-use-typewriter";
import "./App.css";

const App = () => {
  const words = ["react", "typescript", "nodejs"];
  const currentWord = useTypewriter({
    words,
    typeSpeed: 100,
    eraseSpeed: 50,
    afterErasingDelay: 1000,
    eraseWords: true,
    afterTypingDelay: 1000
  });

  return (
    <div className="wrapper">
      <div className="typewriter">
        {currentWord}
        
        <span className="cursor" />
      </div>
    </div>
  );
};

export default App;
