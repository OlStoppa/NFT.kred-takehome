import { NFT } from "../model/types"

const NFTCard = ({ nft }: { nft: NFT }) => {
  return (
    <div className="card">
      <a href={`https://stellarchain.io/ledger/${nft.uuid}`}>
        <img src={nft.face} className="card-img-top" style={{ width: '100%' }} alt="" />
      </a>
      <div className="card-body nft-bottom">
        <img src={nft.creator_details.avatar} alt="creator-avatar" className="avatar-img" />
        <div className="card-text">
          <p>{nft.name}</p>
          <p>{nft.creator_details.name}</p>
        </div>
      </div>
    </div>
  )
}

export default NFTCard;