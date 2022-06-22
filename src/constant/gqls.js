import gql from "graphql-tag";

export const GQL_GETMYLISTED = gql`
  query GetMyListedNft($address: String!, $contract: String!) {
    nfts(
      where: { owner: $address, type: 0,  contract: $contract}
      orderBy: id
      orderDirection: desc
    ) {
      id
      tokenId
      owner
      type
      contract
      originalPrice
      bids {
        id
        price
        address
      }
    }
  }
`;

// update getlisted to get only listed nfts

export const GQL_GETLISTED = gql`
  query GetListedNft($contract: String!) {
    nfts (
        where: {contract: $contract}
        orderBy: id
        orderDirection: desc
      ){
      id
      lastListedBy
      type
      bids {
        id
        price
        address
        createdAt
      }
      owner
      tokenId
      contract
      originalPrice
      auctionDuration
    }
  }
`;

export const GQL_GETLIVE = gql`
  query GetListedNft($contract: String!) {
    nfts(where: { type: 2, contract: $contract }) {
      id
      lastListedBy
      type
      bids {
        id
        price
        address
        createdAt
      }
      owner
      tokenId
      contract
      originalPrice
      auctionDuration
    }
  }
`;

export const GQL_GETALL = gql`
  query GetAllNft($contract: String!) {
    nfts (where: { contract: $contract }){
      id
      lastListedBy
      type
      bids {
        id
        price
        address
        createdAt
      }
      owner
      tokenId
      contract
      originalPrice
      auctionDuration
    }
  }
`;

export const GQL_GETAUCTION = gql`
  query GetAll {
    nfts (where: { type: 2 }){
      id
      lastListedBy
      type
      bids {
        id
        price
        address
        createdAt
      }
      owner
      tokenId
      contract
      originalPrice
      auctionDuration
    }
  }
`;