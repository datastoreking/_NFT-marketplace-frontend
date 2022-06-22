import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import Countdown from "react-countdown";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import { formatEther } from "@ethersproject/units";
import { shortAddress } from "../../utils";
import {
  CONTRACT_NFT_HARMOLECULES,
  CONTRACT_NFT_PUFF,
  HARMOLECULES_IMAGE_URL,
  PUFF_IMAGE_URL,
} from "../../constant";

const LiveAuction = (props) => {
  const data = props.data;

  const [name, setName] = useState("NFT");

  console.log("live auction page explore", data);

  let collectionData = {};

  collectionData[CONTRACT_NFT_PUFF.toLowerCase()] = {
    image: PUFF_IMAGE_URL,
    name: "Puff",
  };

  collectionData[CONTRACT_NFT_HARMOLECULES.toLowerCase()] = {
    image: HARMOLECULES_IMAGE_URL,
    name: "HarMolecule",
  };

  const getURL = (id) => {
    const contract_string = id.split("-")[0];
    const tokenId = id.split("-")[1];
    console.log("get url function called");
    console.log(typeof id.toString());
    const IMAGE_URL = collectionData[contract_string].image;
    let str = IMAGE_URL + tokenId.toString() + ".png";
    return str;
  };

  const getName = (id) => {
    const contract_string = id.split("-")[0];
    const NAME = collectionData[contract_string].name;
    return NAME;
  };

  return (
    <Fragment>
      <section className="tf-section live-auctions">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="heading-live-auctions">
                <h2 className="tf-title pb-20">Live Auctions</h2>
                <Link to="/explore" className="exp style2">
                  EXPLORE MORE
                </Link>
              </div>
            </div>
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
                  1300: {
                    slidesPerView: 4,
                  },
                }}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
              >
                {data.slice(0, 7).map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="swiper-container show-shadow carousel auctions">
                      <div className="swiper-wrapper">
                        <div className="swiper-slide">
                          <div className="slider-item">
                            <div className="sc-card-product">
                              <div className="card-media">
                                <Link to={`/nft/${item.id}`}>
                                  <div className="custom-image-container">
                                    <img src={getURL(item.id)} alt="axies" />
                                  </div>
                                </Link>
                                {/* <Link
                                  to="/login"
                                  className="wishlist-button heart"
                                >
                                  <span className="number-like">
                                    {item.wishlist}
                                  </span>
                                </Link> */}
                                <div className="featured-countdown">
                                  {item.bids.length === 0 ? (
                                    <>No bids yet</>
                                  ) : (
                                    <>
                                      <span className="slogan"></span>
                                      <Countdown
                                        date={
                                          parseInt(
                                            item.bids[0].createdAt + "000"
                                          ) +
                                          parseInt(item.auctionDuration + "000")
                                        }
                                      >
                                        {/* <span>{parseInt(item.bids[0].createdAt + '000') + parseInt(item.auctionDuration + '00')}</span> */}
                                      </Countdown>{" "}
                                    </>
                                  )}
                                </div>
                                <div className="button-place-bid">
                                  <Link
                                    to={`/nft/${item.id}`}
                                    // onClick={() => setModalShow(true)}
                                    className="sc-button style-place-bid style bag fl-button pri-3"
                                  >
                                    <span>Place Bid</span>
                                  </Link>
                                </div>
                              </div>
                              <div className="card-title">
                                <h5>
                                  <Link to={`/nft/${item.id}`}>
                                    {getName(item.id)} #{item.tokenId}
                                  </Link>
                                </h5>
                                <div className="tags">Rarity</div>{" "}
                                {/* this does not exist */}
                              </div>
                              <div className="meta-info">
                                <div className="author">
                                  {/* <div className="avatar">
                                    <img src={item.imgAuthor} alt="axies" /> 
                                  </div> */}
                                  <div className="info">
                                    <span>Listed By</span>
                                    <h6>
                                      {" "}
                                      {/* <Link to="/authors"> */}
                                      {/* krishanu fix this */}
                                      {shortAddress(item.owner)}
                                      {/* </Link>{" "} */}
                                    </h6>
                                  </div>
                                </div>
                                <div className="price">
                                  <span>Current Bid</span>
                                  <h5>
                                    {" "}
                                    {item.bids.length === 0
                                      ? formatEther(
                                          item.originalPrice.toString()
                                        )
                                      : formatEther(
                                          item.bids[
                                            item.bids.length - 1
                                          ].price.toString()
                                        )}{" "}
                                    GRAV
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

LiveAuction.propTypes = {
  data: PropTypes.array.isRequired,
};

export default LiveAuction;
