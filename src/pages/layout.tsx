import { Outlet, NavLink } from "react-router-dom";

const Layout=()=>{
    return(
        <>
        <div className="heading">Click below to navigate through different pages</div>

        <nav>
        <ul className="links"> 
        <li>
            <NavLink to="/" >Home</NavLink>
          </li> 
           <li>
            <NavLink to="/statistics-details">Statistics Table</NavLink>
          </li> 
          <li>
            <NavLink to="/calculate-gamma">Gamma Reports</NavLink>
          </li>
        
        </ul>
      </nav>
      <Outlet />
      </>
    )
}

export default Layout;