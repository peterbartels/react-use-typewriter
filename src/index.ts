import { RefObject, useEffect, useRef, useState } from 'react';

export interface State {
  currentWordIndex: number
  currentIndex: number
  count: number
  word: string
  pause: number
}
const useTypewriter = (words: string[], speed: number = 8, stopTime: number = 60, ref?: RefObject<HTMLElement>): { state: State, count: number } => {
  //if (process.env.NODE_ENV === 'development') {
  if (!ref || typeof ref !== 'object' || typeof ref.current === 'undefined') {
    console.log('TODO: add ref check') //.error('`useScroll` expects a single ref argument.');
  }

  const [state, setState] = useState<State>({
    currentWordIndex: 0,
    currentIndex: 0,
    count: 0,
    pause: -1,
    word: ''
  });

  const requestRef = useRef<number>()
  const previousTimeRef = useRef<number>()

  const getPause = (prevState: State) => {
    const pause = prevState.pause
    const currentWordIndex = prevState.currentWordIndex

    if (pause >= 0) {
      if (pause === (stopTime / 2)) {
        return -1
      }
      return pause + 1
    }

    if (prevState.currentIndex === words[currentWordIndex].length - 1 && pause === -1) {
      return 0
    }

    return -1
  }

  const animate = (time: any) => {
    if (previousTimeRef.current != undefined) {

      const deltaTime = time - previousTimeRef.current
      setState(prevState => {
        const nextCount = (prevState.count + deltaTime * (speed / 1000 / 2))

        let currentWordIndex = prevState.currentWordIndex
        let currentIndex = prevState.currentIndex
        let pause = prevState.pause

        if (Math.round(nextCount) !== Math.round(prevState.count)) {
          pause = getPause(prevState)
          if (pause === -1) {
            if (prevState.currentIndex === words[currentWordIndex].length - 1) {
              if (prevState.currentWordIndex === words.length - 1) {
                currentWordIndex = 0
              } else {
                currentWordIndex = prevState.currentWordIndex + 1
              }
              currentIndex = 0
            } else {
              currentIndex = prevState.currentIndex + 1
            }
          }
        }

        return {
          count: nextCount,
          currentWordIndex: currentWordIndex,
          currentIndex: currentIndex,
          word: words[currentWordIndex].substring(0, currentIndex + 1),
          pause: pause,
        }
      })
    }
    previousTimeRef.current = time
    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(requestRef.current!)
    }
  }, [])

  return { count: Math.round(state.count), state: state }
};

export default useTypewriter
