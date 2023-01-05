import React, { useState } from "react";

const Checkbox = ({ value, checked, onChange }) => (
  <label>
    <input
      type="checkbox"
      value={value}
      checked={checked}
      onChange={onChange}
    />{" "}
    {value}
  </label>
);

const LotteryPicker = () => {
  const [unwantedNumbers, setUnwantedNumbers] = useState([]);
  const [pickedNumbers, setPickedNumbers] = useState([]);
  const [numberInput, setNumberInput] = useState("");
  const [history, setHistory] = useState([]);

  const handleNumberSelection = (event) => {
    const selectedNumber = event.target.value;
    if (event.target.checked) {
      setUnwantedNumbers((prevUnwantedNumbers) => [
        ...prevUnwantedNumbers,
        selectedNumber,
      ]);
    } else {
      setUnwantedNumbers((prevUnwantedNumbers) =>
        prevUnwantedNumbers.filter((number) => number !== selectedNumber)
      );
    }
  };

  const handlePickNumbers = () => {
    const availableNumbers = [];
    for (let i = 1; i <= 49; i++) {
      if (!unwantedNumbers.includes(i.toString())) {
        availableNumbers.push(i);
      }
    }
    const pickedNumbers = [];
    while (pickedNumbers.length < 6) {
      const index = Math.floor(Math.random() * availableNumbers.length);
      pickedNumbers.push(availableNumbers[index]);
      availableNumbers.splice(index, 1);
    }
    setPickedNumbers(pickedNumbers.sort((a, b) => a - b));
  };
  const handleReset = () => {
    setUnwantedNumbers([]);
  };
  const handleResetHistory = () => {
    setHistory([]);
  };
  const handleNumberInput = (event) => {
    const numbers = event.target.value.split(",");
    const parsedNumbers = numbers.map((number) => parseInt(number.trim()));
    setUnwantedNumbers(parsedNumbers);
  };
  const handleSave = () => {
    setUnwantedNumbers([, unwantedNumbers]);
    setHistory([...history, pickedNumbers]);
  };

  return (
    <div>
      {/* <h1>Lottery Picker</h1> */}
      <p>Select the numbers you don't want to be picked:</p>
      <form>
        {[...Array(49).keys()]
          .map((i) => (
            <Checkbox
              key={i + 1}
              value={i + 1}
              checked={unwantedNumbers.includes((i + 1).toString())}
              onChange={handleNumberSelection}
            />
          ))
          .reduce((acc, checkbox, itemcount) => {
            if (itemcount % 10 === 0) {
              acc.push(<br key={itemcount} />);
            }
            acc.push(checkbox);
            return acc;
          }, [])}
      </form>
      <p>Unwanted numbers: {unwantedNumbers.join(", ")}</p>
      <button onClick={handlePickNumbers}>Pick numbers</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleSave}>Save</button>
      <p>Picked numbers: {pickedNumbers.join(", ")}</p>
      <p>Enter numbers separated by a comma:</p>
      <input type="text" onChange={handleNumberInput} />
      <br />
      <button onClick={handleResetHistory}><h2>History</h2></button>
      {history.map((numbers, index_his) => (
        <p key={index_his}>{index_his+1}. {numbers.join(", ")}</p>
      ))}
      
    </div>
  );
};

export default LotteryPicker;
