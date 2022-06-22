import React, { useState, useRef } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Link } from "react-router-dom";
import liveAuctionData from "../assets/fake-data/data-live-auction";
import LiveAuction from "../components/layouts/auctions/LiveAuction";
import fuzzysort from "fuzzysort";
import { useQuery } from "@apollo/client";
import { GQL_GETAUCTION, GQL_GETLIVE } from "../constant/gqls";
import { formatEther } from "@ethersproject/units";
import {
  CONTRACT_MARKETPLACE,
  ZERO_ADDRESS,
  PUFF_IMAGE_URL,
} from "../constant/index.js";

const LiveAuctions = () => {
  const searchParam = useRef();

  const [rawData] = useState(liveAuctionData);
  const [dataBox, setDataBox] = useState(liveAuctionData);

  const {
    loading: listed_loading,
    error: listed_error,
    data: listed_data,
    refetch: listed_refetch,
    fetchMore: listed_fetchMore,
  } = useQuery(GQL_GETAUCTION, {
    // variables: { address: account?.toLowerCase() },
    fetchPolicy: "no-cache",
  });

  if (listed_loading) return <></>;

  console.log("data here");
  console.log(listed_data);

  const placeBid = () => {
    console.log("working yay")
  }

  const newNfts = listed_data.nfts.map((item, index) => ({
    tokenId: Number(item.tokenId),
    id: (item.id),
    img: `${PUFF_IMAGE_URL}${Number(item.tokenId)}.png`, // fix this
    // rarity: PUFF_RARITY[Number(item.id) - 1].nftRarity,
    currentOwner: item.type === 0 ? item.owner : CONTRACT_MARKETPLACE,
    listed: item.type,
    originalOwner: item.owner,
    price: item.type > 0 ? Number(formatEther(item.originalPrice)) : 0,
    highestBid:
      item.type === 2 && item.bids.length > 0
        ? Number(formatEther(item.bids[item.bids.length - 1].price))
        : 0,
    highestBidder:
      item.type === 2 && item.bids.length > 0
        ? item.bids[item.bids.length - 1].address
        : ZERO_ADDRESS,
    timeEnd: item.type === 2 ? Number(item.timeEnd) : 0,
    bids: item.bids,
    auctionDuration: item.auctionDuration,
  }));
  console.log("############", listed_data.nfts, newNfts);
  // setNfts(newNfts);

  // useEffect(() => {
  //   setNfts(newNfts);
  // }, [listed_loading]);

  const fuzzySearch = () => {
    let param = searchParam.current.value;
    console.log(param);

    let finalRes = [];

    const results = fuzzysort.go(param, rawData, { key: "title" });
    for (let i = 0; i < results.length; i++) {
      finalRes.push(results[i].obj);
    }

    const authResults = fuzzysort.go(param, rawData, { key: "nameAuthor" });
    for (let i = 0; i < authResults.length; i++) {
      finalRes.push(authResults[i].obj);
    }

    const colResults = fuzzysort.go(param, rawData, { key: "nameCollection" });
    for (let i = 0; i < colResults.length; i++) {
      finalRes.push(colResults[i].obj);
    }

    // console.log(results)
    // console.log(authResults)
    console.log(finalRes);

    setDataBox(finalRes);
  };

  return (
    <div className="auctions">
      <Header />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">Auctions</h1>
              </div>
              <div className="breadcrumbs style2">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  {/* <li><Link to="#">Explore</Link></li> */}
                  <li>Auctions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="inner custom-search">
        <div className="widget widget-search mgbt-24" id="custom-search-div">
          <form action="#">
            <input
              className="style-2"
              type="text"
              placeholder="Enter keywords, collections..."
              ref={searchParam}
              required
            />
            <button className="style-2" onClick={fuzzySearch}>
              <i className="icon-fl-search-filled"></i>
            </button>
          </form>
        </div>
      </section>
      <LiveAuction data={newNfts} placebidfunc={placeBid}/>
      <Footer />
    </div>
  );
};

export default LiveAuctions;
