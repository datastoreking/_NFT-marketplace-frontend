import React , { useState , Fragment } from 'react';
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import puff from '../../../assets/images/a-slider/puff.png'
import harm from '../../../assets/images/a-slider/harmolecule.png'
import img3 from '../../../assets/images/box-item/image-box-28.jpg'

const Collections = () => {
    const [data] = useState(
        [
            {
                img: puff,
                title: "Puffs",
                tags: "",
                name: 'puffs'
            },
            {
                img: harm,
                title: "HarMolecules",
                tags: "",
                name: 'harmolecules'
            },
            {
                img: img3,
                title: "Eggs",
                tags: "",
                name: 'eggs'
            },
            {
                // img: img1,
                title: "Ship Blueprints",
                tags: "COMING SOON",
                name: 'ship-blueprints'
            },
            {
                img: harm,
                title: "Ships",
                tags: "COMING SOON",
                name: 'ship'
            },
            {
                img: img3,
                title: "Land",
                tags: "COMING SOON",
                name: 'land'
            },
            // {
            //     // img: img1,
            //     title: "Land Items",
            //     tags: "COMING SOON",
            //     name: 'land-items'
            // },
            // {
            //     img: harm,
            //     title: "Puff Skins/Ship Skins",
            //     tags: "COMING SOON",
            //     name: 'skins'
            // },
        ]
    )

    return (
        <Fragment>
            <section className="tf-section live-auctions">
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <Swiper
                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                spaceBetween={30}

                                breakpoints={{
                                    0: {
                                        slidesPerView: 1,
                                    },
                                    767: {
                                    slidesPerView: 2,
                                    },
                                    991: {
                                    slidesPerView: 3,
                                    },
                                    
                                }}
                                navigation
                                pagination={{ clickable: true }}
                                scrollbar={{ draggable: true }}
                            >
                                    {
                                        data.map((item,index) => (
                                            <SwiperSlide key={index}>
                                                <div className="swiper-container show-shadow carousel auctions">
                                                    <div className="swiper-wrapper">
                                                        <div className="swiper-slide">
                                                            <div className="slider-item">										
                                                                <div className={`sc-card-product ${item.tags ? 'comingsoon' : '' } `}>
                                                                    <div className="card-media">
                                                                        <Link to={item.tags === '' ? `/explore/${item.name}` : '#'}><img className='home-slider-img' src={item.img} alt="axies" /></Link>
                                                                        {item.tags !== '' && <div className="coming-soon">{item.tags}</div>}
                                                                    </div>
                                                                    <div className="card-title justify-content-center mt-5">
                                                                        <h3>{item.title}</h3>
                                                                    </div>
                                                                </div>    	
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))
                                    }
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
}


export default Collections;
