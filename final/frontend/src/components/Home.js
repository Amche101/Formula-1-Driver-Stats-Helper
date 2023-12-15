import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <div className="hero-container">
        <img
          className="hero-img"
          src={require("../assets/bg-img2.jpg")}
          alt="F1"
        />
      </div>
      <div className="hero-text">
        <h2>Welcome to the</h2>
        <h2>Formula 1 Stats Helper</h2>
        <p>Get information about your favourite races and drives!</p>
        <div className="search-buttons">
          <Link to="/race">
            <button>Search by Race</button>
          </Link>
          <Link to="/driver">
            <button>Search by Driver</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
