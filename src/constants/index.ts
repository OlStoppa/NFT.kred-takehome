export const Options = [20, 40, 60];

export const Tabs = [{
  key: 'ALL',
  name: 'All NFTs'
}, {
  key: 'HIDDEN',
  name: 'Hidden NFTs'
}];

const TOKEN = process.env.API_TOKEN;

export const defaultParams = {
  token: TOKEN,
  batched: true,
  count: 20,
  page: 1,
  hidden: true,
  onsale: false,
}