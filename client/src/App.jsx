import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Auth from "./components/Auth/Auth";
import Dog from "./components/Dog/Dog";
import Nav from "./components/Nav/Nav";
import ForgotPwd from "./components/Auth/ForgotPwd";
import ResetPwd from "./components/Auth/ResetPwd";
import AdminDash from "./components/Admin-Dash/Admin-Dash";
import AddDog from "./components/Dog/AddDog";
import Footer from "./components/Nav/Footer";
import EditForm from "./components/Dog/EditForm";

const renderNav = (Component) => {
    return (
        <>
            <Nav />
            <Component />
            <Footer />
        </>
    );
};

const renderFooter = (Component) => {
    return (
        <>
            <Component />
            <Footer />
        </>
    );
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={renderNav(Dog)} />
                <Route path="/admin" element={<AdminDash />} />
                <Route path="/auth" element={renderFooter(Auth)} />
                <Route
                    path="/forgot-password"
                    element={renderFooter(ForgotPwd)}
                />
                <Route path="/add-dog" element={renderFooter(AddDog)} />
                <Route
                    path="/reset-password/:token"
                    element={renderFooter(ResetPwd)}
                />
                <Route path="/edit-form/:dogId" element={<EditForm />} />
            </Routes>
        </Router>
    );
}

export default App;
