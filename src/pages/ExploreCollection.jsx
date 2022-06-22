import React from 'react';
import { Link } from 'react-router-dom'
import { useParams } from 'react-router';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Explore from '../components/layouts/explore/Explore';
import widgetSidebarData from '../assets/fake-data/data-widget-sidebar'
    
const nameList = {
    puffs: "Puffs",
    harmolecules: "HarMolecules",
    eggs: "Eggs",
    'ship-blueprints': "Ship Blueprints",
    ship: "Ships",
    land: "Land",
    'land-items': "Land Items",
    skins: "Puff Skings/Ship Skins",
}
const ExploreCollection = () => {
    const { collection } = useParams();
    return (
        <div>
            <Header />
            <section className="flat-title-page inner">
                <div className="overlay"></div>
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-title-heading mg-bt-12">
                                <h1 className="heading text-center">{nameList[collection]}</h1>
                            </div>
                            <div className="breadcrumbs style2">
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/explore">Explore</Link></li>
                                    <li>{nameList[collection]}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>                    
            </section>
            <Explore data={widgetSidebarData} />
            <Footer />
        </div>
    );
}

export default ExploreCollection;
