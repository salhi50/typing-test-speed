// Dependencies
import { useEffect, useMemo, useState, useRef, useContext } from "react";
import { nanoid } from "nanoid";

// Components
import TextBox from "./TextBox";
import TextControl from "./TextControl";
import Result from "./Result";

// utils
import { 
  calculateTestStats,
  createNewTest,
  formatTime,
  generateRandomElements as randomWords, 
  getWordByIndex
} from "../../utils";

// context & reducer
import { Context } from "../../context";
import { ADD_TEST, UPDATE_TEST } from "../../reducer";

// Constants
const initWordsCount = 80;
const wordHeight = 36;
const step = 25; // number of words to generate after each end of row reached
const HIGHLIGHT = "highlight";
const HIGHLIGHT_WRONG = "highlight-wrong";
const CORRECT = "correct";
const WRONG = "wrong";

const TypingBox = function({settings}) {

  const { dispatch, tests } = useContext(Context);

  const [words, setWords] = useState(randomWords(settings.words.menu, initWordsCount));
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [inpValue, setInpValue] = useState("");
  const [isStartTyping, setIsStartTyping] = useState(false);
  const [typedWords, setTypedWords] = useState([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [time, setTime] = useState(parseInt(settings.time, 10));
  const [id, setId] = useState(nanoid(8)); // used to update typingtest
  const [showResult, setShowResult] = useState(false);

  const wordsContainerRef = useRef(null);
  const inpRef = useRef(null);

  const init = () => {
    setShowResult(false);
    setTimeout(() => {
      setIsStartTyping(false);
      setWords(randomWords(settings.words.menu, initWordsCount));
      setActiveWordIndex("initial");
      setInpValue("");
      inpRef.current.focus();
      setTypedWords([]);
      setLineIndex(0);
      setTime(parseInt(settings.time, 10));
      setId(nanoid(8));
    })
  }

  const setWordClassName = (wordIndex, className) => {
    getWordByIndex(wordIndex).className = className;
  }

  const updateWordsEquality = () => {
    let value = inpValue.replace(/\s/g, '');
    let currentWord = words[activeWordIndex];
    setTypedWords([...typedWords, {
      original: currentWord,
      wordTyped: value
    }])
  }

  const checkIfLastWordInRow = () => {
    let currentWordEl = getWordByIndex(activeWordIndex);
    let nextWordEl = getWordByIndex(activeWordIndex + 1);
    if(nextWordEl.offsetTop > currentWordEl.offsetTop) {
      setLineIndex(i => i + 1);
      setWords([...words, ...randomWords(settings.words.menu, step)]);
    }
  }

  const moveNextWord = () => {
    setActiveWordIndex(i => i + 1);
    updateWordsEquality();
    checkIfLastWordInRow();
  }

  const handleChange = (e) => {
    let value = e.target.value;
    let currentWord = words[activeWordIndex];

    if(!isStartTyping) setIsStartTyping(true);

    if(value.includes(" ")) {
      // Check if space is at the end
      if(/[^\s]+\s+$/.test(value)) moveNextWord();
      value = "";
    }else {
      setWordClassName(activeWordIndex, (
        currentWord.startsWith(value) ? HIGHLIGHT : HIGHLIGHT_WRONG
      ));
    }

    setInpValue(value);
  }

  const timeEnded = () => {
    dispatch({
      type: UPDATE_TEST,
      payload: {
        id, updated: {
          completed: true,
          stats: calculateTestStats(typedWords, settings.time)
        }
      }
    })
    setShowResult(true);
  }

  useEffect(() => {
    let index = activeWordIndex;
    if(activeWordIndex === "initial") {
      index = 0;
      setActiveWordIndex(0);
    }
    setWordClassName(index, HIGHLIGHT);
  }, [activeWordIndex]);

  useEffect(() => {
    typedWords.forEach((word, index) => {
      setWordClassName(index, word.original === word.wordTyped ? CORRECT : WRONG);
    })
    dispatch({
      type: UPDATE_TEST,
      payload: {
        id, updated: {words: typedWords}
      }
    })
  }, [typedWords]);

  useEffect(() => {
    wordsContainerRef.current.style.top = `${lineIndex * wordHeight * -1}px`;
  }, [lineIndex]);

  useEffect(() => {
    if(isStartTyping) {
      dispatch({
        type: ADD_TEST,
        payload: {...createNewTest(settings.time), id}
      });
    }
    document.querySelector("header").style.visibility = isStartTyping? "hidden" : "visible";
  }, [isStartTyping]);

  useEffect(() => {
    let interval = null;
    if(isStartTyping) {
      interval = setInterval(() => {
        setTime(time => time - 1000);
      }, 1000);
    }
    if(time < 0) {
      clearInterval(interval);
      timeEnded();
    }
  return () => clearInterval(interval);
  }, [isStartTyping, time]);

  const wordsMappedToElements = useMemo(() => {
    return words.map((word, index) => {
      return <span key={nanoid(12)} data-index={index}>{word}</span>
    })
  }, [words]);

  const result = calculateTestStats(typedWords, settings.time);
  const data = Object.keys(result).map(k => ({label: k, value: result[k]}));

  return <div className="w-100">
    {showResult ? <Result restart={init} data={data} /> : <>
      <p className="time text-secondary fs-4">
        {formatTime(time)}
      </p>
      <TextBox words={wordsMappedToElements} ref={wordsContainerRef}/>
      <TextControl ref={inpRef} value={inpValue} onChange={handleChange} restart={init}/>
    </>}
  </div>
}

export default TypingBox;