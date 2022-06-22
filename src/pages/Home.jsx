import React from 'react';
import HeaderStyle2 from '../components/header/HeaderStyle2';
import Footer from '../components/footer/Footer';
import SliderStyle2 from '../components/slider/SliderStyle2';
import heroSliderData from '../assets/fake-data/data-slider';
// import BrowCategory from '../components/layouts/home/BrowCategory';
// import LiveAuction from '../components/layouts/home/LiveAuction';
// import TopSeller from '../components/layouts/home/TopSeller';
// import TodayPicks from '../components/layouts/home/TodayPicks';
// import todayPickData from '../assets/fake-data/data-today-pick';
// import PopularCollection from '../components/layouts/home/PopularCollection';
// import Create from '../components/layouts/home-2/Create';


const Home = () => {
    return (
        <div className='home-5'>
            <HeaderStyle2 />
            <SliderStyle2 data={heroSliderData} />
            <Footer />
        </div>
    );
}

export default Home;
