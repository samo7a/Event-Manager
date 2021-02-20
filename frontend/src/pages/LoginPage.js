import "./LoginPage.css";
import React from 'react';
import RegisterBox from '../components/RegisterBox';
import Banner from '../components/Banner';

const LoginPage = () => {
    return (
        <div>
            <Banner type="login" />
            <div>
                <RegisterBox />
            </div>
        </div>
    )
}

export default LoginPage;