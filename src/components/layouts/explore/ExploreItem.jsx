// import { formatEther, parseEther } from "@ethersproject/units";
import { formatEther } from "@ethersproject/units";
import React, { useState, Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { CONTRACT_MARKETPLACE } from "../../../constant";
import { shortAddress } from "../../../utils";
import CardModal from "../CardModal";
import axios from "axios";

const ExploreItem = (props) => {
  const names = {
    puffs: "Puff",
    harmolecules: "HarMolecule",
    eggs: "egg",
  };

  const collectionName = useParams().collection;
  const { data, getMore, isAll, isMine } = props;
  console.log(props);

  const [rarity, setRarity] = useState("______");

  //   const getRarity = async (tokenId) => {
  //     let response = await fetch(`${props.rarity_url}${tokenId}.json`, {
  //         mode: "cors",
  //         headers: {
  //             'Access-Control-Allow-Origin':'*'
  //         }
  //     });
  //     let data = await response.json();
  //     console.log("######## data here", data);
  //     // setNftData(data.attributes);
  //   };

  async function getRarity(tokenId) {
    try {
      const response = await axios.get(`https://cors-anywhere.herokuapp.com/${props.rarity_url}${tokenId}.json`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }


  const [visible, setVisible] = useState(12);
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 12);
  };


  const [modalShow, setModalShow] = useState(false);

  console.log("items here hehehehehe");
  console.log(data);
  return (
    <Fragment>
      <div className="explore">
        <div className="box-epxlore">
          {(isMine ? data.slice(0, visible) : data).map((item, index) => (
            <Link to={`/nft/${item.id}`}>
              <div
                className={`sc-card-product explode style2 mg-bt ${
                  item.listed === 0 ? "comingsoon" : ""
                } `}
                key={index}
              >
                <div className="card-media">
                  {/* <Link to={`/nft/${item.id}`}> */}
                  <div className="custom-image-container">
                    <img src={item.img} alt="Axies" className="img-custom" loading="lazy"/>
                  </div>
                  {/* </Link> */}
                  <div className="button-place-bid">
                    <button
                      //   onClick={() => setModalShow(true)}
                      className="sc-button style-place-bid style bag fl-button pri-3"
                    >
                      <span>Place Bid</span>
                    </button>
                  </div>
                  <div className="coming-soon">Not Listed</div>
                </div>
                <div className="card-title">
                  <h2>
                    {/* <Link to={`/nft/${item.id}`}> */}
                    {names[collectionName]} #{item.tokenId}
                    {/* </Link> */}
                  </h2>

                  {/* <div className="tags">Rarity</div> */}
                </div>
                <div className="tags">
                  Rarity {rarity}{" "}
                </div>
                <br />
                <br />
                <div className="meta-info">
                  <div className="author">
                    <div className="info">
                      <span>Owner</span>
                      <h6>
                        {/* krishanu fix this */}
                        {shortAddress(
                          item.currentOwner === CONTRACT_MARKETPLACE
                            ? item.originalOwner
                            : item.currentOwner
                        )}
                      </h6>
                    </div>
                  </div>

                  <div className="author">
                    {/* <div className="info align-items-end">
                      <span className="w-100 d-flex justify-content-end">
                        Rarity
                      </span>
                      <h6>{item.rarity}</h6>
                    </div> */}
                  </div>
                </div>
                <div className="card-bottom style-explode">
                  <div className="price">
                    <span>
                      Price {item.highestBid > 0 ? "(highest bid)" : ""}
                    </span>
                    <div className="price-details">
                      {item.listed === 0 ? (
                        <h5>Not listed</h5>
                      ) : (
                        <>
                          <h5>
                            {item.highestBid > 0
                              ? formatEther(item.highestBid.toString())
                              : formatEther(item.price.toString())}{" "}
                            <span>GRAV</span>
                          </h5>
                          {/* <span>= $ {item.highestBid > 0 ? (item.highestBid) : item.price}</span> */}
                        </>
                      )}
                    </div>
                  </div>
                  {/* <Link to="/activity" className="view-history reload">
                  View History
                </Link> */}
                </div>
              </div>
            </Link>
          ))}
        </div>
        {((isMine && visible < data.length) || (!isAll && !isMine)) && (
          <div className="btn-auction center">
            <Link
              to="#"
              id="load-more"
              className="sc-button loadmore fl-button pri-3"
              onClick={isMine ? showMoreItems : getMore}
            >
              <span>Load More</span>
            </Link>
          </div>
        )}
      </div>
      <CardModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        minbid="debug here"
      />
    </Fragment>
  );
};

export default ExploreItem;
