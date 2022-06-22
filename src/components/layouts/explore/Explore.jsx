/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import ExploreItem from "./ExploreItem";
import Switch from "react-switch";
import puff from "../../../assets/images/a-slider/puff.png";

import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";
import {
  CONTRACT_NFT_PUFF,
  CONTRACT_MARKETPLACE,
  ZERO_ADDRESS,
  PUFF_IMAGE_URL,
  PUFF_DATA_URL,
  HARMOLECULES_IMAGE_URL,
  CONTRACT_NFT_HARMOLECULES,
  PUFF_RARITY_URL,
  HARMOLECULES_RARITY_URL,
  HARMOLECULES_DATA_URL,
} from "../../../constant/index.js";
import { ABI_NFT_PUFF, ABI_MARKETPLACE } from "../../../constant/abis.js";
import { setupMultiCallContract } from "../../../utils";
import { formatEther } from "@ethersproject/units";
import { PUFF_RARITY } from "../../../constant/puff.js";
import {
  GQL_GETLISTED,
  GQL_GETMYLISTED,
  GQL_GETALL,
} from "../../../constant/gqls";
import { useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const axios = require("axios");

const Explore = () => {
  const collectionName = useParams().collection;

  const collectionAddr = {
    puffs: {
      image: PUFF_IMAGE_URL,
      contract: CONTRACT_NFT_PUFF,
      data: PUFF_DATA_URL,
      rarity: PUFF_RARITY_URL,
    },
    harmolecules: {
        image: HARMOLECULES_IMAGE_URL,
        contract: CONTRACT_NFT_HARMOLECULES,
        data: HARMOLECULES_DATA_URL ,
        rarity: HARMOLECULES_RARITY_URL
    },
    eggs: "",
  };





  const CONTRACT_NFT = collectionAddr[collectionName].contract
  const IMAGE_URL = collectionAddr[collectionName].image
  const RARITY_URL = collectionAddr[collectionName].rarity


  const count = 12;
  const { account, library } = useWeb3React();
  console.log(account, "account here")

  const [status, setStatus] = useState([
    { field: "Buy Now", checked: true },
    { field: "On Auctions", checked: true },
  ]);
  const [isMine, setIsMine] = useState(false);
  const [isListing, setIsListing] = useState(false);

  // const [myNftIdsNotList, setMyNftIdsNotList] = useState([]);
  // const [myNftIdsList, setMyNftIdsList] = useState([]);

  const [startNft, setStartNft] = useState(0);
  const [nfts, setNfts] = useState([]);
  const [isAll, setIsAll] = useState(false);

  const updateStatus = (val) => {
    setStatus(status.map((item) => (item.field === val.field ? val : item)));
  };
  // through graphql
//   const getAllNfts = async (start) => {
//     if (!library) {
//       console.log("No provider");
//       return;
//     }
//     try {
//       const contract = new Contract(CONTRACT_NFT, ABI_NFT_PUFF, library);
//       const nftCount = Number(await contract.totalSupply());

//       console.log("total supply", nftCount);

//       const [multicallProvider, multicallContract] =
//         await setupMultiCallContract(CONTRACT_NFT, ABI_NFT_PUFF, library); // use this for multicalls

//       const possibleCount = Math.min(count, nftCount - start);
//       setIsAll(nftCount <= count + start);
//       const nftIds = await multicallProvider.all(
//         Array.from(Array(possibleCount).keys()).map((u, index) =>
//           multicallContract.tokenByIndex(start + index)
//         )
//       );

//       const owners = await multicallProvider.all(
//         nftIds.map((id) => multicallContract.ownerOf(id))
//       );

//       const [multicallMarketProvider, multicallMarketContract] =
//         await setupMultiCallContract(
//           CONTRACT_MARKETPLACE,
//           ABI_MARKETPLACE,
//           library
//         );

//       const listed = await multicallMarketProvider.all(
//         nftIds.map((id) => multicallMarketContract.listed(id))
//       );

//       const infos = await multicallMarketProvider.all(
//         listed.map((listed, index) =>
//           Number(listed) === 1
//             ? multicallMarketContract.directSales(nftIds[index])
//             : multicallMarketContract.auctionSales(nftIds[index])
//         )
//       );

      //   const { loading, error, data, refetch, fetchMore } = useQuery(GQL_GETALL, {
      //     // variables: { address: account?.toLowerCase() },
      //     fetchPolicy: 'no-cache',
      //   });

      //   console.log("found infos?")

      //   const newNfts = data.nfts.map((item, index) => ({
      //     id: Number(item.tokenId),
      //     img: `${PUFF_IMAGE_URL}${Number(item.id)}.png`,
      //     // rarity: PUFF_RARITY[Number(item.id) - 1].nftRarity,
      //     currentOwner: item.type===0?item.owner:CONTRACT_MARKETPLACE,
      //     listed: item.type,
      //     originalOwner: item.owner,
      //     price: item.type > 0 ? Number(formatEther(item.originalPrice)) : 0,
      //     highestBid: item.type === 2 && item.bids.length > 0 ? Number(formatEther(item.bids[item.bids.length - 1].price)) : 0,
      //     highestBidder: item.type === 2 && item.bids.length > 0 ? item.bids[item.bids.length - 1].address : ZERO_ADDRESS,
      //     timeEnd: item.type === 2 ? Number(item.timeEnd) : 0,
      // }))
      // console.log('############', data.nfts, newNfts)
      // setNfts(newNfts)

      // const newNfts = infos.map((info, index) => ({
      //     id: Number(nftIds[index]),
      //     img: `${PUFF_IMAGE_URL}${Number(nftIds[index])}.png`,
      //     rarity: PUFF_RARITY[Number(nftIds[index]) - 1].nftRarity,
      //     currentOwner: owners[index],
      //     listed: Number(listed[index]),
      //     originalOwner: info.owner,
      //     price: Number(listed[index]) === 1 ? Number(formatEther(info.price)) : 0,
      //     highestBid: Number(listed[index]) === 2 ? Number(formatEther(info.highestBid)) : 0,
      //     highestBidder: Number(listed[index]) === 2 ? (info.highestBidder) : ZERO_ADDRESS,
      //     timeEnd: Number(listed[index]) === 2 ? Number(info.timeEnd) * 1000 : 0,
      // }))

      // console.log(newNfts)
      // setNfts(start === 0 ? newNfts : [...nfts, ...newNfts]);
      // setStartNft(start + possibleCount);
//     } catch (err) {
//       console.log(err);
//     }
//   };

  //   const getCharacters = async (id) => {
  //     console.log("trying to get chars of ", id)
  //     const response = await axios.get(
  //       `https://puffs.mypinata.cloud/ipfs/QmSNZ4yb1caWZB9bu18xeeqGLnyhaoCD3WoDkkpbhvQPhj/${id}.json`
  //     );
  //     console.log('found data', response.data);

  //     const req = await response.data.image

  //     return(req)
  //   }

  //   async function getCharacters(id) {
  //     try {
  //       const response = await fetch(
  //         `https://puffs.mypinata.cloud/ipfs/QmSNZ4yb1caWZB9bu18xeeqGLnyhaoCD3WoDkkpbhvQPhj/${id}.json`
  //       );
  //       if (!response.ok) {
  //         throw new Error(`HTTP error: ${response.status}`);
  //       }
  //       const json = await response.json();
  //       return json;
  //     } catch (error) {
  //       console.error(`Could not get products: ${error}`);
  //     }
  //   }

  //   function callingfunc(id) {
  //     const jsonPromise = getCharacters(id);
  //     jsonPromise.then((json) => {
  //       console.log("inner loop shit json", json.image);
  //       return json.image;
  //     });
  //   }

  const getURL = (id) => {
    let str = IMAGE_URL + id.toString() + ".png";
    return str;
  };

  // through graphql
//   const getListedNfts = async (start) => {
//     if (!library) {
//       console.log("No provider");
//       return;
//     }
//     try {
//       const contract = new Contract(CONTRACT_NFT, ABI_NFT_PUFF, library);

//       const nftCount = Number(await contract.balanceOf(CONTRACT_MARKETPLACE));

//       const [multicallProvider, multicallContract] =
//         await setupMultiCallContract(CONTRACT_NFT, ABI_NFT_PUFF, library);
//       const possibleCount = Math.min(count, nftCount - start);
//       const nftIds = await multicallProvider.all(
//         Array.from(Array(possibleCount).keys()).map((u, index) =>
//           multicallContract.tokenOfOwnerByIndex(
//             CONTRACT_MARKETPLACE,
//             start + index
//           )
//         )
//       );

//       const [multicallMarketProvider, multicallMarketContract] =
//         await setupMultiCallContract(
//           CONTRACT_MARKETPLACE,
//           ABI_MARKETPLACE,
//           library
//         );

//       const listed = await multicallMarketProvider.all(
//         nftIds.map((id) => multicallMarketContract.listed(id))
//       );

//       const infos = await multicallMarketProvider.all(
//         listed.map((listed, index) =>
//           Number(listed) === 1
//             ? multicallMarketContract.directSales(nftIds[index])
//             : multicallMarketContract.auctionSales(nftIds[index])
//         )
//       );

//       const newNfts = infos.map((info, index) => ({
//         id: Number(nftIds[index]),
//         // img: `${PUFF_IMAGE_URL}${Number(nftIds[index])}.png`,
//         // img: getCharacters(Number(nftIds[index])),
//         rarity: PUFF_RARITY[Number(nftIds[index]) - 1].nftRarity,
//         currentOwner: CONTRACT_MARKETPLACE,
//         listed: Number(listed[index]),
//         originalOwner: info.owner,
//         price:
//           Number(listed[index]) === 1 ? Number(formatEther(info.price)) : 0,
//         highestBid:
//           Number(listed[index]) === 2
//             ? Number(formatEther(info.highestBid))
//             : 0,
//         highestBidder:
//           Number(listed[index]) === 2 ? info.highestBidder : ZERO_ADDRESS,
//         timeEnd: Number(listed[index]) === 2 ? Number(info.timeEnd) * 1000 : 0,
//       }));

//       console.log(newNfts);
//       setNfts(start === 0 ? newNfts : [...nfts, ...newNfts]);
//       setStartNft(start);
//     } catch (err) {
//       console.log(err);
//     }
//   };

  const {
    loading: your_loading,
    error: your_error,
    data: your_data,
    refetch: your_refetch,
    fetchMore: your_fetchMore,
  } = useQuery(GQL_GETMYLISTED, {
    variables: { address: account.toLowerCase(), contract: CONTRACT_NFT.toLowerCase() },
    fetchPolicy: "no-cache",
  });

  const {
    loading: listed_loading,
    error: listed_error,
    data: listed_data,
    refetch: listed_refetch,
    fetchMore: listed_fetchMore,
  } = useQuery(GQL_GETLISTED, {
    variables: { contract: CONTRACT_NFT.toLowerCase() },
    fetchPolicy: "no-cache",
  });

  const {
    loading: all_loading,
    error: all_error,
    data: all_data,
    refetch: all_refetch,
    fetchMore: all_fetchMore,
  } = useQuery(GQL_GETALL, {
    variables: { contract: CONTRACT_NFT.toLowerCase() },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    // setIsLoadingProcessing(loading);

    // this code goes in get all nfts

    if (your_error) {
      console.log(your_error);
    }

    console.log("loading your nfts...");
    console.log(your_data);
    console.log(all_data);
    console.log(listed_data);
    console.log("data end");

    if (!your_loading && your_data && isMine) {
      console.log("inside your loop");

      const newNfts = your_data.nfts.map((item, index) => ({
        tokenId: Number(item.tokenId),
        id: item.id,
        // img: `${PUFF_IMAGE_URL}${Number(item.id)}.png`,
        // img: getCharacters(Number(item.tokenId)),
        img: getURL(Number(item.tokenId)),
        // img: `https://puffs.mypinata.cloud/ipfs/QmSNZ4yb1caWZB9bu18xeeqGLnyhaoCD3WoDkkpbhvQPhj/${item.tokenID}.json`,
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
      }));
      console.log("############", your_data.nfts, newNfts);
      setNfts(newNfts);

    } else if (!listed_loading && listed_data && isListing) {
      console.log("inside listed loop");
      const newNfts = listed_data.nfts.map((item, index) => ({
        tokenId: Number(item.tokenId),
        id: item.id,
        img: getURL(Number(item.tokenId)),

        // img: `https://puffs.mypinata.cloud/ipfs/QmSNZ4yb1caWZB9bu18xeeqGLnyhaoCD3WoDkkpbhvQPhj/${Number(item.tokenID)}.json`,
        // rarity: PUFF_RARITY[Number(item.id) - 1].nftRarity,
        currentOwner: item.type === 0 ? item.owner : CONTRACT_MARKETPLACE,
        listed: item.type,
        originalOwner: item.owner,
        price: item.type > 0 ? Number(item.originalPrice) : 0,
        highestBid:
          item.type === 2 && item.bids.length > 0
            ? Number(item.bids[item.bids.length - 1].price)
            : 0,
        highestBidder:
          item.type === 2 && item.bids.length > 0
            ? item.bids[item.bids.length - 1].address
            : ZERO_ADDRESS,
        timeEnd: item.type === 2 ? Number(item.timeEnd) : 0,
      }));
      console.log("############", listed_data.nfts, newNfts);
      setNfts(newNfts);
    } else if (!all_loading && all_data && !isListing) {
      console.log("inside all loop");
      const newNfts = all_data.nfts.map((item, index) => ({
        tokenId: Number(item.tokenId),
        id: item.id,
        // img: `${PUFF_IMAGE_URL}${Number(item.id)}.png`,
        // img: puff,
        // img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVeXX6aYNgHs-EH9PB9xuEU0Y37JN97d9ggw&usqp=CAU",
        img: getURL(Number(item.tokenId)),
        // img: `puffs.mypinata.cloud/ipfs/QmcfT6TK8BpuptbGaabPes8eJM37Py7Kq4Jj2E37mGH6LU/${(item.tokenID).toString()}.png`,
        // rarity: PUFF_RARITY[Number(item.id) - 1].nftRarity,
        currentOwner: item.type === 0 ? item.owner : CONTRACT_MARKETPLACE,
        listed: item.type,
        originalOwner: item.owner,
        price: item.type > 0 ? Number(item.originalPrice) : 0,
        highestBid:
          item.type === 2 && item.bids.length > 0
            ? Number(item.bids[item.bids.length - 1].price)
            : 0,
        highestBidder:
          item.type === 2 && item.bids.length > 0
            ? item.bids[item.bids.length - 1].address
            : ZERO_ADDRESS,
        timeEnd: item.type === 2 ? Number(item.timeEnd) : 0,
      }));
      console.log("############", all_data.nfts, newNfts);
      setNfts(newNfts);
    }
  }, [
    your_loading,
    listed_loading,
    all_loading,
    your_error,
    listed_error,
    all_error,
    your_data,
    listed_data,
    all_data,
    isMine,
    isListing,
  ]);

//   const getMore = (start) => {
//     if (isMine) {
//     } else {
//       if (isListing) getListedNfts(start);
//       getAllNfts(start);
//     }
//   };

  //   useEffect(() => {
  //     if (library) {
  //       getMore(startNft);
  //     }
  //   }, [library]);

  return (
    <section className="tf-explore tf-section">
      <div className="themesflat-container">
        <div className="row">
          <div className="col-xl-3 col-lg-3 col-md-12">
            <div id="side-bar" className="side-bar style-3">
              <div className="widget widget-category mgbt-24 boder-bt">
                <div className="nft-switch">
                  My NFT
                  <Switch
                    onChange={() => {
                      if (!isMine) {
                        your_refetch({ address: account?.toLowerCase() });
                      } else {
                        if (!isListing)
                          // getListedNfts(0);
                          // listed_refetch();
                          console.log("is not listing");
                        // getAllNfts(0);
                        // all_refetch();
                        else console.log("all refetch here");
                      }
                      setIsMine(!isMine);
                    }}
                    checked={isMine}
                    disabled={false}
                    height={24}
                  />
                </div>
              </div>
              <div className="widget widget-category mgbt-24">
                <div className="nft-switch">
                  {isListing ? "Listed Tokens Only" : "All Tokens"}
                  <Switch
                    onChange={() => {
                      if (!isMine) {
                        if (!isListing)
                          // listed_refetch();
                          console.log("is not listing");
                        // all_refetch();
                        else console.log("all refetch here");
                      }
                      setIsListing(!isListing);
                    }}
                    checked={isListing}
                    disabled={false}
                    checkedIcon={false}
                    uncheckedIcon={false}
                    onColor="#5142FC"
                    offColor="#E13F71"
                    height={24}
                  />
                </div>
              </div>
              <div className="widget widget-category mgbt-24 boder-bt">
                {isListing && (
                  <div className="content-wg-category">
                    {/* <Accordion title="Status" show={true}> */}
                    <form action="#">
                      {status.map((itemm, index) => (
                        <div key={`status-${index}`}>
                          <label>
                            {itemm.field}
                            <input
                              type="checkbox"
                              defaultChecked={itemm.checked}
                              onChange={(e) => {
                                updateStatus({
                                  ...itemm,
                                  checked: e.target.checked,
                                });
                              }}
                            />
                            <span className="btn-checkbox"></span>
                          </label>
                          <br />
                        </div>
                      ))}
                    </form>
                    {/* </Accordion> */}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-xl-9 col-lg-9 col-md-12">
            <ExploreItem
              data={nfts
                .filter((x) => {
                  if (!isListing) return true;
                  if (x.listed === 0) return false;
                  if (x.listed === 1 && !status[0].checked) return false;
                  if (x.listed === 2 && !status[1].checked) return false;
                  return true;
                })
                .sort((a, b) => a.tokenId - b.tokenId)}
              isAll={isAll}
              isMine={isMine}
              rarity_url = {RARITY_URL}
              getMore={() => {
                console.log("get more called");
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Explore;
