import { useDispatch, useSelector } from "react-redux";
import {
  increment,
  decrement,
  incrementByAmount,
//   incrementAsync,
} from "./CounterSlice";
import { useState } from "react";

const Counter = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);

  const [inputValue, setInputValue] = useState(0);
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>Increment by 1</button>
      <button onClick={() => dispatch(decrement())}>Decrement by 1</button>
      <input
        type="text"
        onChange={(e) => setInputValue(Number(e.target.value))}
        value={inputValue}
      />
      <button onClick={() => dispatch(incrementByAmount(inputValue))}>
        incrementByAmount
      </button>
    </div>
  );
};

export default Counter;
