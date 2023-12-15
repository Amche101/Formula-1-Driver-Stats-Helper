import { useState, useEffect } from "react";
import axios from "axios";
import DriverTable from "./DriverTable";

const DriverPage = () => {
  const [year, setYear] = useState(2023);
  const [searchClicked, setSearchClicked] = useState(false);
	const [requestData, setRequestData] = useState({ year: 2023 });
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const handleSearchClick = () => {
    setSearchClicked(true);
		setRequestData({ year });
  };

  useEffect(() => {
    if (searchClicked) {
      const url = `http://ergast.com/api/f1/${year}/drivers.json`;
      setIsPending(true);
      // Fetch data using the new URL
      axios
        .get(url)
        .then((res) => {
          setData(res.data);
          setIsPending(false);
        })
        .catch((error) => {
          setError(error.message);
          setIsPending(false);
        });
    }
  }, [requestData, searchClicked]);

  let driverResult = null;
  if (data) {
    driverResult = data.MRData.DriverTable.Drivers;
		driverResult = driverResult.map((result) => ({
			driverId: result.driverId,
			name: {
				firstName: result.givenName,
				lastName: result.familyName
			},
			permenantNumber: result.permanentNumber,
			code: result.code,
			dateOfBirth: result.dateOfBirth,
			nationality: result.nationality
		}))
  }
  console.log(driverResult)

  const yearOptions = [];
  for (let i = 2023; i >= 1980; i--) {
    yearOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <div className="search-driver-page">
      <div className="search-area">
        <h2>SEARCH BY DRIVER</h2>
        <p>Search driver based on year.</p>
        <div className="search-container">
          <div className="year-select-container">
            <label>Year</label>
            <div className="year-selector">
              <select value={year} onChange={(e) => setYear(e.target.value)}>
                {yearOptions}
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
        {searchClicked && driverResult && (
          <>
						<DriverTable driverResult={driverResult} />
            <div className="results-count">
              Found {driverResult.length} results
            </div>
          </>
        )}
        {/* {searchClicked && data && raceResult.length === 0 && (
          <div>No results found</div>
        )} */}
      </div>
    </div>
  );
};

export default DriverPage;
