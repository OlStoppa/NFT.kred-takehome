
import { NFT } from "../model/types";
import NFTCard from "./NFT";

const Tab = ({ children, nftList }: { children: React.ReactNode, nftList: NFT[] }) => {
  return (
    <div className="tab-pane">
      {children}
      <div className="grid">
        {
          nftList.map(nft => <NFTCard nft={nft} key={nft.uuid} />)
        }
      </div>
    </div>
  )
}

export default Tab;