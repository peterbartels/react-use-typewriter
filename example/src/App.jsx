import React, { useState } from "react";
import useTypewriter from "react-use-typewriter";
import "./App.css";

const App = () => {
  const words = ["react", "typescript", "nodejs"];
  const currentWord = useTypewriter(words, 6, 6);

  return (
    <div className="wrapper">
      <div className="typewriter">
        {currentWord.state.word} - {currentWord.state.pause}
        
        <span className="cursor" />
      </div>
    </div>
  );
};

export default App;
