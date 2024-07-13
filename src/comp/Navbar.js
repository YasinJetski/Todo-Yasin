import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <ul className = "navbar">
      <li><Link className = "navClick" to="/about">About</Link></li>
      <li><Link className = "navClick" to="/">TODO</Link></li>
      <li><Link className = "navClick" to="/home">Home</Link></li>
        
    </ul>  
  )
}

export default Navbar
