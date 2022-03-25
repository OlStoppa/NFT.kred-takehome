import { useState, useEffect, useReducer, useRef } from 'react';
import './App.scss';
import { ApiResponse, NFT, ParamsActionType } from './model/types';
import { paramsReducer } from './reducers/params';
import Dropdown from './components/Dropdown';
import Tab from './components/TabPane';
import Toggle from './components/Toggle';
import LoadMore from './components/LoadMore';
import { Tabs, Options, defaultParams } from './constants';
import axios from 'axios';
import Search from './components/Search';

const url = `https://api.nft.kred/nft/nfts?`;

function App() {
  const [selectedTab, setTab] = useState<typeof Tabs[0]>(Tabs[0]);
  const [data, setData] = useState<NFT[]>([]);
  const [isFiltered, setFiltered] = useState<boolean>(false);
  const [isSortByTime, setSort] = useState<boolean>(false);
  const [searchTerm, updateSearch] = useState('');

  const [params, dispatchParams] = useReducer(paramsReducer, defaultParams);

  const prevParams = useRef<typeof params | null>(null);

  useEffect(() => {
    axios.get<ApiResponse>(url, {
      params
    }).then(res => res.data)
      .then(({ nfts }) => {
        setData((data) => {
          return prevParams.current && prevParams.current.page < params.page ? [...data, ...nfts] : nfts;
        });
        prevParams.current = params;
      })
      .catch(e => {
        console.error(e);
      })
  }, [params])


  const switchTabs = (tab: typeof Tabs[0]) => setTab(tab);

  const nftList = () => {
    let nfts = [...data];
    const normalisedTerm = searchTerm.toLowerCase();
    if (searchTerm) nfts = nfts.filter(nft => nft.name.toLowerCase().includes(normalisedTerm));
    if (isFiltered) nfts = nfts.filter(nft => nft.name[0].toLowerCase() !== 't')
    if (isSortByTime) nfts = nfts.sort((a, b) => +new Date(a.created).getTime() - +new Date(b.created).getTime());
    return nfts;

  }

  const hiddenNftList = () => {
    const baseList = searchTerm
      ? data.filter(nft => nft.name.toLowerCase().includes(searchTerm.toLowerCase()))
      : data;
    return baseList.filter((nft: NFT) => !nft.show);
  }

  const renderTabs = () => {
    return Tabs.map(tab => (
      <li className="nav-item" key={tab.key} onClick={() => switchTabs(tab)}>
        <span className={`nav-link ${selectedTab.key === tab.key && 'active'}`}>
          {tab.name}
        </span>
      </li>
    ))
  }

  return (
    <div className="App">
      <header className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <p className="navbar-brand">GizzaJob NFT Marketplace</p>
          <Search action={updateSearch} />
        </div>
      </header>
      <div className="container-fluid">
        <ul className="nav nav-tabs">
          {renderTabs()}
        </ul>
        {
          selectedTab.key === Tabs[0].key ?
            <Tab nftList={nftList()}>
              <div className="d-flex p-3 justify-content-between options-bar">
                <Dropdown options={Options} change={dispatchParams} currentCount={params.count} />
                <Toggle isChecked={isFiltered} changeHandler={() => setFiltered(!isFiltered)} label="Filter T" />
                <Toggle isChecked={isSortByTime} changeHandler={() => setSort(!isSortByTime)} label="Sort By Created Time" />
                <Toggle
                  isChecked={params.onsale}
                  changeHandler={() => dispatchParams({ type: ParamsActionType.TOGGLE_FORSALE, payload: !params.onsale })}
                  label="Show On Sale"
                />
              </div>
            </Tab> :
            <Tab nftList={hiddenNftList()} />
        }
        <LoadMore loadMoreAction={() => dispatchParams({ type: ParamsActionType.INCREMENT_PAGE, payload: params.page + 1 })} />
      </div>
    </div>
  );
}

export default App;
