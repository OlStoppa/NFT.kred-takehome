
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

export enum ParamsActionType {
  UPDATE_COUNT = 'UPDATE_COUNT',
  INCREMENT_PAGE = 'INCREMENT_PAGE',
  TOGGLE_FORSALE = 'TOGGLE_FORSALE',
}

interface CountAction {
  type: ParamsActionType.UPDATE_COUNT,
  payload: number,
}

interface PageAction {
  type: ParamsActionType.INCREMENT_PAGE,
}

interface SaleAction {
  type: ParamsActionType.TOGGLE_FORSALE,
  payload: boolean,
}

export type ParamsAction = CountAction | PageAction | SaleAction;