import useFetch from "./useFetch";
import { useParams } from "react-router-dom";
import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DriverNewsTable from "./DriverNewsTable";
import { useState, useEffect } from "react";

const DriverDetail = () => {
  const { id } = useParams();
  const url = `http://ergast.com/api/f1/drivers/${id}.json`;
  const { data, isPending, error } = useFetch(url);
  // const driverNewsList = require("../assets/driver_news.json");
  const [driverNewsList, setDriverNewsList] = useState([]);
  const [relevance, setRelevance] = useState(0);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/data")
      .then((res) => res.json())
      .then((data) => {
        setDriverNewsList(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  var driver = null;
  var driverName = null;

  const driverTitleUrl = [];

  if (data) {
    driver = data.MRData.DriverTable.Drivers[0];
    driverName = driver.givenName + " " + driver.familyName;

    if (driverNewsList) {
      driverNewsList.map((news) => {
        if (news.Driver === driverName || news.Driver.includes(driver.familyName)) {
          for (var i = 1; i < 11; i++) {
            const titleKey = `Title_${i}`;
            const urlKey = `URL_${i}`;
      
            if (news[titleKey] && news[urlKey]) {
              const newObj = {
                title: news[titleKey],
                url: news[urlKey],
              };
              driverTitleUrl.push(newObj);
            }
          }
        }
      });
    }
  }
  console.log(driverTitleUrl);

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className="driver-detail-page">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {driver && (
        <div className="driver-info-container">
          <div className="driver-name">
            <h2>
              {driver.givenName} {driver.familyName}
            </h2>
          </div>
          <div className="driver-info">
            <p>
              <strong>Code: </strong> {driver.code}
            </p>
            <p>
              <strong>Permanent Number: </strong>
              {driver.permanentNumber}
            </p>
            <p>
              <strong>Date of Birth: </strong>
              {driver.dateOfBirth}
            </p>
            <p>
              <strong>Nationality: </strong>
              {driver.nationality}
            </p>
          </div>
        </div>
      )}
      <div className="driver-url-container">
        <div className="select-relevance-container">
          <div className="select-relevance">
            <label>Rate by Relevance</label>
            <select name="relevance" value={relevance} onChange={e => setRelevance(e.target.value)}>
              <option value="0">0 (Not Relevant)</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5 (Very Relevant)</option>
            </select>
          </div>
          <div className="relevance-submit">
            <Button onClick={handleClick}>Submit</Button>
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              message="Submitted!"
              action={action}
            />
          </div>
        </div>
        <DriverNewsTable driverTitleUrl={ driverTitleUrl } />
      </div>
    </div>
  );
};

export default DriverDetail;