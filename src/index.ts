import { useEffect, useRef, useState } from 'react';

export interface State {
  words: string[],
  typeSpeed: number,
  eraseSpeed: number,
  afterErasingDelay: number,
  eraseWords: boolean,
  afterTypingDelay: number,
}

const useTypewriter = ({
  words,
  typeSpeed = 100,
  eraseSpeed = 50,
  afterErasingDelay = 1000,
  eraseWords = true,
  afterTypingDelay = 1000
}: State): string => {

  const [loop, setLoop] = useState(0)
  const [index, setIndex] = useState(0);
  const [word, setWord] = useState("")

  const requestRef = useRef<number>(0)
  const previousTimeRef = useRef<number>(0)
  const erasing = useRef<boolean>(false)

  const animate = (time: number) => {

    const deltaTime = time - previousTimeRef.current
    const speed = erasing.current ? eraseSpeed : typeSpeed

    if (deltaTime >= speed) {

      const wordIndex = loop % words.length

      if (index > words[wordIndex].length) {
        time = time + afterTypingDelay
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
        time = time + afterErasingDelay
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
    index,
    word
  ])

  return word
};

export default useTypewriter
