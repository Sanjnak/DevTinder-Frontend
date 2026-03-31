import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import axios from "axios";

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store) => store.user);
    const fetchUser = async () => {
        if(userData) return;
        try {
            const user = await axios.get(BASE_URL+"/profile", {
            withCredentials: true
        });
        dispatch(addUser(user.data));
        } catch (err) {
            if(err.status === 401) {navigate("/login");}
            else {console.error(err);}
        }
    }
    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <>
        <NavBar />
        <Outlet />
        <Footer />
        </>
    );
}

export default Body;