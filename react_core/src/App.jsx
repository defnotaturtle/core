import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  // local state
  const [prime_info, set_prime_info] = useState({
    prime_candidates : [2],
    prime_multiples : [2]
  });

  const [candidates, setCandidates] = useState([2]);
  const [candidates_diff, setCandidates_diff] = useState([2]);

  const step_primes = () => {
    // // increment candidates
    setCandidates((currentCandidates) => {
      const new_candidate = currentCandidates[currentCandidates.length - 1] + 1;
      return [...currentCandidates, new_candidate];
    });

    
    setCandidates_diff((currentCandidates_diff) => {
      const new_candidate_diff = currentCandidates_diff[currentCandidates_diff.length - 1] + 1;
      return [...currentCandidates_diff, new_candidate_diff];
    });

    set_prime_info((current_info) => {
      
      // const new_prime_info = {
      //   prime_candidates : [2],
      //   prime_multiples : [4]
      // };
      if (current_info && current_info.prime_candidates) {
              const new_candidate = current_info[current_info.prime_candidates.length - 1] + 1;
 
        return {
          prime_candidates : [...current_info.prime_candidates, 1],
          prime_multiples : [...current_info.prime_multiples]
        };
       
      
      }


      // return new_prime_info
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

            <div>
        {candidates_diff.slice(0, 15).map((candidate_diff, index) => (
          <div key={index}>{candidate_diff}</div>
        ))}
      </div>
      <div>{candidates_diff[candidates_diff.length - 1]}</div>
     
            <div>
              heyo
        {prime_info.prime_candidates?.slice(0, 15).map((prime_candidate, index) => (
          <div key={index}>{prime_candidate} | none</div>
        ))}
      </div>
      {/* <div>{candidates_diff[candidates_diff.length - 1]}</div> */}

    </>
  );
};

export default App;
