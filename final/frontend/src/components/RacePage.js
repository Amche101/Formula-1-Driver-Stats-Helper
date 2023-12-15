import { useEffect, useState } from "react";
import RaceTable from "./RaceTable";
import axios from "axios";

const RacePage = () => {
  const [year, setYear] = useState(2023);
  const [round, setRound] = useState(1);
  const [searchClicked, setSearchClicked] = useState(false);
  const [requestData, setRequestData] = useState({ year: 2023, round: 1 });
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const handleSearchClick = () => {
    setSearchClicked(true);
    setRequestData({ year, round });
  };

  useEffect(() => {
    if (searchClicked) {
      const url = `http://ergast.com/api/f1/${requestData.year}/${requestData.round}/results.json`;
      setIsPending(true);
      // Fetch data using the new URL
      axios.get(url)
        .then((res) => {
          setData(res.data);
          setIsPending(false);
        })
        .catch((error) => {
          setError(error.message);
          setIsPending(false);
        });
    }
  }, [searchClicked, requestData]);

  let roundResult = null;
  let raceResult = null;
  if (data) {
    raceResult = data.MRData.RaceTable.Races;
    if (raceResult.length > 0) {
      roundResult = raceResult[0].Results;
      roundResult = roundResult.map((result) => ({
        position: result.position,
        name: {
          firstName: result.Driver.givenName,
          lastName: result.Driver.familyName,
        },
        constructor: result.Constructor.name,
        time: result.Time ? result.Time.time : "",
        points: result.points,
        status: result.status,
				driver_id: result.Driver.driverId
      }));
    }
  }

  const yearOptions = [];
  for (let i = 2023; i >= 1980; i--) {
    yearOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  const roundOptions = [];
  for (let i = 1; i <= 23; i++) {
    roundOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <div className="search-race-page">
      <div className="search-area">
        <h2>SEARCH BY RACE</h2>
        <p>Search Race based on year and round.</p>
        <div className="search-container">
          <div className="year-select-container">
            <label>Year</label>
            <div className="year-selector">
              <select value={year} onChange={(e) => setYear(e.target.value)}>
                {yearOptions}
              </select>
            </div>
          </div>
          <div className="round-select-container">
            <label>Round</label>
            <div className="round-selector">
              <select value={round} onChange={(e) => setRound(e.target.value)}>
                {roundOptions}
              </select>
            </div>
          </div>
          <div className="search-button-container">
            <button type="submit" onClick={handleSearchClick}>
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="result-area">
        {error && <div>{error}</div>}
        {isPending && <div>Loading...</div>}
        {searchClicked && roundResult && (
          <>
		  	{raceResult.length > 0 && (
				<div className="race-info">
					<div className="race-name"><strong>Race Name:  </strong>{raceResult[0].raceName}</div>
					<div className="race-circuit"><strong>Circuit Name:  </strong>{raceResult[0].Circuit.circuitName}</div>
					<div className="race-date"><strong>Date:  </strong>{raceResult[0].date}</div>
				</div>
			)}
            <RaceTable roundResult={roundResult} />
            <div className="results-count">
              Found {roundResult.length} results
            </div>
          </>
        )}
        {searchClicked && data && raceResult.length === 0 && (
          <div>No results found</div>
        )}
      </div>
    </div>
  );
};

export default RacePage;