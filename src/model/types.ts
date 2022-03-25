
export type creator = {
  avatar: string;
  name: string;
}

export type NFT = {
  creator: string;
  face: string;
  name: string;
  uuid: string;
  creator_details: creator;
  show: number;
  created: string;
}

export type ApiResponse = {
  nfts: NFT[];
}