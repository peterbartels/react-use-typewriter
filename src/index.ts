import { useEffect, useRef, useState } from 'react';

export interface State {
  currentIndex: number
  count: number
  word: string
  pause: number
}
const useTypewriter = (
  words: string[],
  speed: number = 300,
  eraseWords: boolean = true,
  stopTime: number = 500): string => {

  const [loop, setLoop] = useState(0)
  const [index, setIndex] = useState(0);
  const [word, setWord] = useState("")

  const requestRef = useRef<number>(0)
  const previousTimeRef = useRef<number>(0)

  const count = useRef<number>(0)
  const erasing = useRef<boolean>(false)
  const pause = useRef<number>()

  const animate = (time: number) => {

    const deltaTime = time - previousTimeRef.current

    if (deltaTime >= speed) {

      const wordIndex = loop % words.length

      if (index > words[wordIndex].length) {
        time = time + stopTime
      }

      if (index === words[wordIndex].length + 1) {
        if (eraseWords) {
          erasing.current = !erasing.current
        } else {
          setLoop(loop => loop + 1)
          setIndex(0)
        }
      }

      if (index === -1 && erasing.current) {
        erasing.current = !erasing.current
        setLoop(loop => loop + 1)
        time = time + stopTime
      }

      setIndex(index => index + ((erasing.current) ? -1 : 1))
      setWord(words[wordIndex].substring(0, index))

      previousTimeRef.current = time
    }

    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(requestRef.current)
    }
  }, [
    loop,
    pause,
    count,
    index,
    word
  ])

  return word
};

export default useTypewriter
