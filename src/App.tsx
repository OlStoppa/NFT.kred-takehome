import React, { useState, useEffect, useReducer } from 'react';
import './App.scss';
import { ApiResponse, NFT } from './model/types';
import Dropdown from './components/Dropdown';
import Tab from './components/TabPane';
import Toggle from './components/Toggle';
import LoadMore from './components/LoadMore';
import { Tabs, Options } from './constants';
import axios from 'axios';


const defaultParams = {
  token: '734d4bf5-e766-46a9-be21-94035c1343d6',
  batched: true,
  count: 20,
  page: 1,
  hidden: true,
  onsale: true,
}
const url = `https://api.nft.kred/nft/nfts?`;

// function debounce(func: () => void, timeout = 300) {
//   let timer: ReturnType<typeof setTimeout>;
//   return () => {
//     clearTimeout(timer);
//     timer = setTimeout(() => { func(); }, timeout);
//   };
// }

// const Search = ({ action }: { action: (term: string) => void }) => {
//   const [search, setSearch] = useState('')

//   const eventHandler = (search: string) => {
//     action(search);
//   }

//   const debouncedEvent = useMemo(
//     () => debounce(() => eventHandler, 300)
//     , [search])

//   const handler = (e: ChangeEvent<HTMLInputElement>) => {
//     setSearch(e.target.value)
//     console.log('before debounce', search);
//     debouncedEvent()
//   }

//   return (
//     <div>
//       <input value={search} onChange={(e) => handler(e)} />
//     </div>
//   )
// }


function App() {
  const [selectedTab, setTab] = useState<typeof Tabs[0]>(Tabs[0]);
  const [data, setData] = useState<NFT[]>([]);
  const [isFiltered, setFiltered] = useState<boolean>(false);
  const [isSortByTime, setSort] = useState<boolean>(false);
  const [currentPage, setPage] = useState(1);
  const [count, setCount] = useState(Options[0]);

  const [params, dispatchParams] = useReducer(paramsReducer, defaultParams);

  function paramsReducer(state: typeof defaultParams, action) {
    switch (action.type) {
      case 'increment_page':
        return { ...state, page: state.page + 1 };
    }
  }

  useEffect(() => {
    const currentParams = {
      ...params,
      page: currentPage,
      count,
    }
    axios.get<ApiResponse>(url, {
      params: currentParams,
    }).then(res => res.data)
      .then(({ nfts }) => {
        setData((data) => [...data, ...nfts])
      })

  }, [currentPage])


  const switchTabs = (tab: typeof Tabs[0]) => setTab(tab);

  const nftList = () => {
    let nfts = [...data];
    if (isFiltered) nfts = nfts.filter(nft => nft.name[0].toLowerCase() !== 't')
    if (isSortByTime) nfts = nfts.sort((a, b) => +new Date(a.created).getTime() - +new Date(b.created).getTime());
    return nfts;

  }

  const hiddenNftList = () => {
    return data.filter(nft => !nft.show);
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
      <header className="App-header" style={{ textAlign: 'left' }}>
        GizzaJob NFT Marketplace
      </header>
      <ul className="nav nav-tabs">
        {renderTabs()}
      </ul>
      {
        selectedTab.key === Tabs[0].key ?
          <Tab nftList={nftList()}>
            <div style={{ display: 'flex', padding: '25px' }}>
              <Dropdown options={Options} change={setCount} currentCount={count} />
              <Toggle isChecked={isFiltered} changeHandler={() => setFiltered(!isFiltered)} label="Filter T" />
              <Toggle isChecked={isSortByTime} changeHandler={() => setSort(!isSortByTime)} label="Sort By Created Time" />
            </div>
          </Tab> :
          <Tab nftList={hiddenNftList()}>
            {/* <div style={{ display: 'flex' }}>
              <Search action={setSearchTerm} />
            </div> */}
          </Tab>
      }
      <LoadMore loadMoreAction={() => setPage(currentPage + 1)} />
    </div>
  );
}

export default App;
