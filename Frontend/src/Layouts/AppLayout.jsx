import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
export default function AppLayout() {
  return (
    <>
    <div className="layout">
      <NavBar/>
    <main className="content">
      <Outlet/>
    </main>
    
   <Footer/>
    </div>
    
    </>
  )
}