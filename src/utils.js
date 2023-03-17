export function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateRandomElements(arr, numElement) {
  let result = [];
  for(var i = 0; i < numElement; i++) {
    result.push(randomElement(arr));
  }
  return result;
}


/**
 * @param {number} time in milliseconds
 */

export const formatTime = (time) => {
  let minutes = ("0" + Math.floor(time / 60000)).slice(-2);
  let seconds = ("0" + Math.floor(time % 60000 / 1000)).slice(-2);
  return `${minutes}:${seconds}`;
}

export const createNewTest = (time) => {
  return {
    date: new Date(),
    words: [],
    time: formatTime(time),
    completed: false,
  }
}

export const getWordByIndex = (index) => {
  return document.querySelector(`[data-index="${index}"]`);
}

export const calculateTestStats = (words, time) => {
  let result = {
    Time: formatTime(parseInt(time, 10)),
    Keystrokes: 0,
    "Total words": words.length,
    "Correct words": 0,
    "Wrong words": 0,
    Accuracy: 0,
  }
  for(let i = 0; i < words.length; i++) {
    let original = words[i].original;
    let typed = words[i].wordTyped;
    result.Keystrokes += typed.length;
    result["Correct words"] += original === typed ? 1 : 0;
  }
  result["Wrong words"] = result["Total words"] - result["Correct words"];
  result.Accuracy = ((result["Correct words"] / result["Total words"]) * 100).toFixed(2) + "%";
  return result;
}