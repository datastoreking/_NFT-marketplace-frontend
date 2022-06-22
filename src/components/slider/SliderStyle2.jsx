import React from 'react';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import img1 from '../../assets/images/box-item/item-h5.1.png'
import img2 from '../../assets/images/box-item/item-h5.2.png'
import img3 from '../../assets/images/box-item/item-h5.3.png'

import puff from "../../assets/images/a-slider/puff.png"
import harm from '../../assets/images/a-slider/harmolecule.png'

import { PUFF_IMAGE_URL } from '../../constant';
import { HARMOLECULES_IMAGE_URL } from '../../constant';


const SliderStyle2 = () => {
    const subtitle = 'NFT MARKETPLACE'
    const title = 'Discover All NFTs In The ONEverse'
    const description = 'Marketplace for Every Character, Item, & Molecule useful in the ONEverse'
    return (
        <section className="flat-title-page home5" style={{minHeight: '100vh'}}>
            <div className="overlay"></div>
            <div className="themesflat-container">
                <div className="wrap-heading flat-slider d-flex align-items-center">
                    <div className="content" style={{zIndex: 10}}>
                        <h4 className="mg-bt-11"><span className="fill">{subtitle}</span></h4>
                        <h1 className="heading">{title}                                                                                      
                        </h1>	
                        <p className="sub-heading mg-t-7 mg-bt-39">{description}
                        </p>
                        <div className="flat-bt-slider style2 flex">
                            <a href="/explore" className="sc-button header-slider style style-1 rocket fl-button pri-1"><span>Explore
                            </span></a>
                        </div>
                    </div>

                    <Swiper
                        modules={[ Autoplay ]}
                        direction={"vertical"}
                        spaceBetween={10}
                        slidesPerView={5}
                        loop
                        autoplay={{
                            delay: 1,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        speed= {2000}
                    >
                        <SwiperSlide><img className='swiper-img' src={puff} alt="Axies" /></SwiperSlide>
                        <SwiperSlide><img className='swiper-img' src={puff} alt="Axies" /></SwiperSlide>
                        <SwiperSlide><img className='swiper-img' src={puff} alt="Axies" /></SwiperSlide>
                        <SwiperSlide><img className='swiper-img' src={puff} alt="Axies" /></SwiperSlide>
                        <SwiperSlide><img className='swiper-img' src={puff} alt="Axies" /></SwiperSlide>

                    </Swiper>
                    {/* <Swiper
                        modules={[ Autoplay ]}
                        direction={"vertical"}
                        spaceBetween={10}
                        slidesPerView={5}
                        loop
                        autoplay={{
                            delay: 1,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        speed= {2100}
                    >
                        <SwiperSlide><img src={img2} alt="Axies" /></SwiperSlide>
                        <SwiperSlide><img src={img3} alt="Axies" /></SwiperSlide>
                        <SwiperSlide><img src={img1} alt="Axies" /></SwiperSlide>
                        <SwiperSlide><img src={img3} alt="Axies" /></SwiperSlide>
                        <SwiperSlide><img src={img1} alt="Axies" /></SwiperSlide>

                    </Swiper> */}
                    <Swiper
                        modules={[ Autoplay ]}
                        direction={"vertical"}
                        spaceBetween={10}
                        slidesPerView={5}
                        loop
                        autoplay={{
                            delay: 1,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        speed= {2200}
                    >
                        <SwiperSlide><img className='swiper-img' src={harm} alt="Axies" /></SwiperSlide>
                        <SwiperSlide><img className='swiper-img' src={harm} alt="Axies" /></SwiperSlide>
                        <SwiperSlide><img className='swiper-img' src={harm} alt="Axies" /></SwiperSlide>
                        <SwiperSlide><img className='swiper-img' src={harm} alt="Axies" /></SwiperSlide>
                        <SwiperSlide><img className='swiper-img' src={harm} alt="Axies" /></SwiperSlide>

                    </Swiper>
                    <Swiper
                        modules={[ Autoplay ]}
                        direction={"vertical"}
                        spaceBetween={10}
                        slidesPerView={5}
                        loop
                        autoplay={{
                            delay: 1,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        speed= {2000}
                        className="end"
                    >
                        <SwiperSlide><img className='swiper-img' src={puff} alt="Axies" /></SwiperSlide>
                        <SwiperSlide><img className='swiper-img' src={puff} alt="Axies" /></SwiperSlide>
                        <SwiperSlide><img className='swiper-img' src={puff} alt="Axies" /></SwiperSlide>
                        <SwiperSlide><img className='swiper-img' src={puff} alt="Axies" /></SwiperSlide>
                        <SwiperSlide><img className='swiper-img' src={puff} alt="Axies" /></SwiperSlide>

                    </Swiper>
                   
                    
                </div>
            </div>                           
        </section>
    );
}



export default SliderStyle2;
