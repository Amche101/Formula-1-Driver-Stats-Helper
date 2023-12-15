const Navbar = () => {
    return (
        <header>
            <nav className="navbar">
                <a href="/">
                    <div className="logo">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/F1.svg/120px-F1.svg.png" alt="" />
                    </div>
                    <h1 className="h1-header">Formula 1 Stats Helper</h1>
                </a>
                <div className="links">
                    <ul>
                        <li>
                            <a href="/race">RACE</a>
                        </li>
                        <li>
                            <a href="/driver">DRIVER</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;