import { useEffect, useState } from "react";
import "./App.css";

// export const progressBarWidth = 100;
// export const progressBarHeight = 10;
// export const progressBarX = 120;
// export const progressBarY = 130;

// const target_frame_rate = 60;
// export const draw_time_target = 1000 / target_frame_rate;
// export const table_flip = "(╯°□°)╯︵ ┻━┻";
// export const put_it_back = "┬─┬ノ( º _ ºノ)";
// const prime_upgrade = 0.85;

// export let delta_time = 0;
// export let primes_found_per_second = 0;
// export let top_five_candidates = [];
// export let top_five_primes = [];
// export let top_five_factorizations_by_sequence = [];
// export let top_five_factorizations_by_magnitude = [];
// export let prime_factorization = "";
// let delta_accumulator = 0;
// export let prime_update_speed = 800; // ms
// let prime_factorizations = [];
// let candidates = [2];
// let multiples = [];
// export let primes = [];
// export let filtered_candidates = [];
// export let prime_magnitude = 0;
// export let composite_magnitude = 0;
// export let draw_count = 0;
// let last_draw_time = performance.now();
// export let current_time = Date.now();
// export let reset_count = 0;
// export let progress_bar = 0;

// const start_time = Date.now();

const App = () => {

  // local state
  const [count, setCount] = useState(0);
  const [candidates, setCandidates] = useState([2]);
  const [primes, setPrimes] = useState([2]);
  const [multiples, setMultiples] = useState([]);
  const [max_candidate, set_max_candidate] = useState(2);
  const [new_candidate, set_new_candidate] = useState(0);

  const step_primes = () => {

    // get max candidate
    set_max_candidate(Math.max(...candidates));
    set_new_candidate(max_candidate + 1);

    // // add multiples
    const self = max_candidate * max_candidate;

    primes
      .map((prime) => prime * max_candidate)
      .forEach((multiple) => setMultiples(...multiples, multiple));
    //multiples.push(self);
    setMultiples(...multiples, self);

    // // filter primes
    // if (!multiples.includes(max_candidate)) {
    //   primes.push(max_candidate);
    // } else {
    //   filtered_candidates.push(max_candidate);

    //   // generate prime factorization for max_candidate
    //   const prime_factors = [];
    //   let remaining = max_candidate;

    //   for (const prime of primes) {
    //     while (remaining % prime === 0) {
    //       prime_factors.push(prime);
    //       remaining /= prime;
    //     }
    //     if (remaining === 1) break;
    //   }

    //   // generate prime factorization string

    //   // get duplicate counts for prime factors
    //   let factor_counts = [];
    //   prime_factors.forEach((factor) => {
    //     factor_counts[factor] = (factor_counts[factor] || 0) + 1;
    //   });

    //   let magnitude = 0;
    //   // create prime factorization string with exponents
    //   prime_factorization = Object.entries(factor_counts)
    //     .map(([factor, count]) => {
    //       magnitude += 1;
    //       return count > 1 ? `${factor}^${count}` : factor;
    //     })
    //     .join(" × ");

    //   prime_factorizations.push({
    //     number: max_candidate,
    //     factorization: prime_factorization,
    //     magnitude: magnitude,
    //   });

    //   composite_magnitude = Math.max(composite_magnitude, magnitude);
    // }

    // // increment candidates
    // candidates.push(new_candidate);
    setCandidates((currentCandidates) => [...currentCandidates, new_candidate]);

  }


  // setup game_loop via requestAnimationFrame
  useEffect(() => {
    let frameId;

    const animate = () => {

      step_primes();
      // setCount((count) => count + 1);   
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <>
      <button
        type="button"
        className="counter"
        onClick={() => setCount((count) => count + 1)}
      >
        Count is {count}
      </button>

      <div>
        {candidates.slice(0,5).map((candidate, index) => (
          <div key={index}>{candidate}</div>
        ))}
      </div>
    </>
  );
};

export default App;
