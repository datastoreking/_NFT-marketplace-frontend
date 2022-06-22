import React from 'react';
import { Link } from 'react-router-dom'
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import widgetSidebarData from '../assets/fake-data/data-widget-sidebar'
import Collections from '../components/layouts/collections/Collections';
    
const ExplorePage = () => {
    return (
        <div>
            <Header />
            <section className="flat-title-page inner">
                <div className="overlay"></div>
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-title-heading mg-bt-12">
                                <h1 className="heading text-center">EXPLORE</h1>
                            </div>
                            <div className="breadcrumbs style2">
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li>Explore</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>                    
            </section>
            <Collections data={widgetSidebarData} />
            <Footer />
        </div>
    );
}

export default ExplorePage;
