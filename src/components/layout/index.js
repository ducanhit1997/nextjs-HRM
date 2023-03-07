import Navbar from "../../components/navbar/index";

const Layout = ({children}) => (
  <div>
    <Navbar/>
    {children}
  </div>
 );
 export default Layout