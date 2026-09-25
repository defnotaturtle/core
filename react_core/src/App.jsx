import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  // local state
  const [candidates, setCandidates] = useState([2]);

  const step_primes = () => {
    // // increment candidates
    setCandidates((currentCandidates) => {
      const new_candidate = currentCandidates[currentCandidates.length - 1] + 1;
      return [...currentCandidates, new_candidate];
    });
  };

  // setup game_loop via requestAnimationFrame
  useEffect(() => {
    let frameId;

    const animate = () => {
      step_primes();

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <>
      {/* <button
        type="button"
        className="counter"
        onClick={() => setCount((count) => count + 1)}
      >
        Count is {count}
      </button> */}

      <div>
        {candidates.slice(0, 15).map((candidate, index) => (
          <div key={index}>{candidate}</div>
        ))}
      </div>
      <div>{candidates[candidates.length - 1]}</div>
    </>
  );
};

export default App;
