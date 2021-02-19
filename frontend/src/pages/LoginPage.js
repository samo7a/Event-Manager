import React from 'react';
import RegisterBox from '../components/RegisterBox';
import Banner from '../components/Banner';

const LoginPage = () => {
    return (
        <div>
            <Banner type="login" />
            <RegisterBox />
        </div>
    )
}

export default LoginPage;