# React Typewriter effect hook

## Getting Started

  `npm install --save react-use-typewriter`  
  
  Or
  
  `yarn add react-use-typewriter`  
  
## Usage Example

```jsx
import useTypewriter from "react-use-typewriter";

const Example = () => {
  const words = ["react", "typescript", "nodejs"];
  const currentWord = useTypewriter({words});

  return (
    <div>
      {currentWord}
      <span className="cursor">|</span>
    </div>
  );
}
```  
  
## Options

| Name | Type | Default value | Description |
| --- | --- | --- | --- |
| words | Array | null | Required, words for typing |
| typeSpeed | number | 100 | Speed in ms for each letter to type |
| afterTypingDelay | number | 1000 | Delay in ms after typing has finished |
| eraseWords | boolean | true | Whether or not to erase after typing |
| eraseSpeed |number | 50 | Speed in ms for each letter to erase |
| afterErasingDelay | number | 1000 | Delay in ms after erasing has finished |

## CSS for blinking cursor

Blinking cursor is not included but can be implemented easily with CSS:  

```css
@keyframes blink {
  from, to {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.cursor {
  animation: blink 1s linear infinite forwards;
}
```

