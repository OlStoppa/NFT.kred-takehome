
export const Options = [20, 40, 60];

export const Tabs = [{
  key: 'ALL',
  name: 'All NFTs'
}, {
  key: 'HIDDEN',
  name: 'Hidden NFTs'
}];

const TOKEN = '734d4bf5-e766-46a9-be21-94035c1343d6';

export const defaultParams = {
  token: TOKEN,
  batched: true,
  count: 20,
  page: 1,
  hidden: true,
  onsale: false,
}