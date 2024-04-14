import { FC, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Root: FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
        location.pathname === '/' && navigate('/movie')
    }, [navigate, location]);

    return (
        <>
            <Header />
            <Outlet />
            {/* <Footer /> */}
        </>
    )
}

export default Root;