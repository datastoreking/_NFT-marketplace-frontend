import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { formatEther, parseEther } from "@ethersproject/units";

import Countdown from "react-countdown";
import {
  CONTRACT_NFT_HARMOLECULES,
  CONTRACT_NFT_PUFF,
  HARMOLECULES_IMAGE_URL,
  PUFF_IMAGE_URL,
} from "../../../constant";
import { shortAddress } from "../../../utils";

const LiveAuction = (props) => {
  const data = props.data;

  console.log("-------- live auction data --------");
  console.log(data);
  console.log("-------- end of transmission --------");

  const [visible, setVisible] = useState(8);
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 4);
  };

  return (
    <section className="tf-section live-auctions">
      <div className="themesflat-container">
        <div className="row">
          <div className="col-md-12">
            <h2 className="tf-title-heading style-1 ct">Live Auctions</h2>
          </div>

          {data.slice(0, visible).map((item, index) => (
            <LiveAuctionItem
              key={index}
              item={item}
              //   modalShow={modalShow}
              //   setfunc={setModalShow}
              placebidfunc={props.placebidfunc}
              //   here???????
            />
          ))}
          {visible < data.length && (
            <div className="col-md-12 wrap-inner load-more text-center">
              <Link
                to="#"
                id="load-more"
                className="sc-button loadmore fl-button pri-3"
                onClick={showMoreItems}
              >
                <span>Load More</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

LiveAuction.propTypes = {
  data: PropTypes.array.isRequired,
};

const LiveAuctionItem = (props) => {
  const contract_forData = props.item.id.split("-")[0];

  console.log("===============", contract_forData);

  // replace this to add more collections

  let collectionData = {};

  collectionData[CONTRACT_NFT_PUFF.toLowerCase()] = {
    image: PUFF_IMAGE_URL,
    name: "Puff",
  };

  collectionData[CONTRACT_NFT_HARMOLECULES.toLowerCase()] = {
    image: HARMOLECULES_IMAGE_URL,
    name: "HarMolecule",
  };

  console.log(collectionData, contract_forData)

  const IMAGE_URL = collectionData[contract_forData].image;
  const NAME = collectionData[contract_forData].name;

  const getURL = (id) => {
    console.log("get url function called");
    console.log(typeof id.toString());
    let str = IMAGE_URL + id.toString() + ".png";
    return str;
  };

  return (
    <div className="fl-item col-xl-3 col-lg-6 col-md-6">
      <div className="sc-card-product">
        <div className="card-media custom-media">
          {/* <div className="custom-image-container">
            <img src={props.item.img} alt="axies" />
          </div> */}
          <Link to={`/nft/${props.item.id}`}>
            {" "}
            {/* change here */}
            <img
              src={getURL(props.item.tokenId)}
              alt="axies"
              className="auction-image"
            />
          </Link>
          {/* <Link to="/login" className="wishlist-button heart">
          <span className="number-like">{props.item.wishlist}</span>
        </Link> */}
          <div className="featured-countdown">

            {props.item.bids.length === 0 ? (
              <>No Bids yet</>
            ) : (
                <>
                <span className="slogan"></span>
              <Countdown
                date={
                  parseInt(props.item.bids[0].createdAt + "000") +
                  parseInt(props.item.auctionDuration + "000")
                }
              >
                {/* <span>{parseInt(item.bids[0].createdAt + '000') + parseInt(item.auctionDuration + '00')}</span> */}
              </Countdown>
              </>
            )}
          </div>
          <div className="button-place-bid">
            <Link
              to={`/nft/${props.item.id}`}
              className="sc-button style-place-bid style bag fl-button pri-3"
            >
              <span>Place Bid</span>
            </Link>
          </div>
          {/* <div className="button-place-bid">
          <button
            onClick={() => props.setfunc(true)}
            className="sc-button style-place-bid style bag fl-button pri-3"
          >
            <span>Place Bid</span>
          </button>
        </div> */}
        </div>
        <div className="card-title">
          <h5>
            <Link to={`/nft/${props.item.id}`}>
              {NAME} #{props.item.tokenId}
            </Link>{" "}
            {/* change here */}
          </h5>
          <div className="tags">Rarity</div>
        </div>
        <div className="meta-info">
          <div className="author">
            {/* <div className="avatar">
              <img src={props.item.imgAuthor} alt="axies" />
            </div> */}
            <div className="info">
              <span>Owner</span>
              <h6>
                {" "}
                {shortAddress(props.item.originalOwner)}
              </h6>
            </div>
          </div>
          <div className="price">
            <span>Current Bid</span>
            <h5>
              {" "}
              {props.item.highestBid === 0
                ? props.item.price
                : props.item.highestBid}{" "}
              GRAV
            </h5>{" "}
            {/* change needed here */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default LiveAuction;
