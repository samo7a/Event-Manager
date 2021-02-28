import React from 'react';
import SideMenu from '../components/SideMenu';
import Banner from '../components/Banner';

const HomePage = () => {
    return (
        <div>
            <Banner type="loggedin" />
            <SideMenu />
        </div>
    )
}

export default HomePage;