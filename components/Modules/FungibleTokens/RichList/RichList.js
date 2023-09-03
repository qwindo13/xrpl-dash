import { useState, useEffect } from 'react';
import Link from 'next/link';
import ModuleCard from '@/components/UI/ModuleCard/ModuleCardcomponents';
import SearchBarSwitch from '@/components/UI/ModuleCard/Settings/SearchBarSwitchcomponents';
import TitleSwitch from '@/components/UI/ModuleCard/Settings/TitleSwitchcomponents';
import TokenDropdown from '@/components/UI/ModuleCard/Settings/TokenDropdowncomponents';
import SearchBar from '@/components/UI/SearchBar/SearchBarcomponents';
const axios = require('axios');
import { config } from '../../../../config';

function formatNumber(num) {
  return new Intl.NumberFormat('en-US').format(num);
}

const columns = [
  { label: 'Rank', sortKey: 'rank', width: 'w-1/12' },
  { label: 'Address', sortKey: 'address', width: 'w-4/12' },
  { label: 'Amount', sortKey: 'amount', width: 'w-3/12' },
  { label: 'Percentage', sortKey: 'percentage', width: 'w-2/12' },
];
const testData = [
  { rank: 1, address: 'rNXhU52ybru7GyhU4duZSrxNGwD2vE7Z9H', amount: 303944484806, change: 20, percentage: 35.24 },
];
const defaultSettings = {
  displayTitle: true,
  displaySearchBar: true,
};

const RichList = () => {
  const [title, setTitle] = useState('Greyhound');
  const [toFetch, setToFetch] = useState('47726579686F756E640000000000000000000000:rJWBaKCpQw47vF4rr7XUNqr34i4CoXqhKJ');
  const [data, setData] = useState(testData);
  const [filteredData, setFilteredData] = useState(testData);
  const [sortConfig, setSortConfig] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(true);

  const [moduleSettings, setModuleSettings] = useState(defaultSettings);
  const updateSettings = (key, value) => {
    setModuleSettings((prevSettings) => ({
      ...prevSettings,
      [key]: value,
    }));
  };

  function hexToString(hex) {
    var string = '';
    for (var i = 0; i < hex.length; i += 2) {
      var code = parseInt(hex.substr(i, 2), 16);
      if (code !== 0) {
        string += String.fromCharCode(code);
      }
    }
    return string;
  }

  const renderSortingIcon = (key) => {
    if (!sortConfig || sortConfig.key !== key) {
      return;
    }
    const iconRotation = sortConfig.direction === 'descending' ? '0' : '180';
    return (
      <svg
        width="7"
        height="5"
        viewBox="0 0 7 5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: `rotate(${iconRotation}deg)` }}
      >
        <path
          d="M3.58808 0.833414L5.75475 3.00008C6.01864 3.26397 6.07753 3.56591 5.93142 3.90591C5.78586 4.24647 5.52558 4.41675 5.15058 4.41675L0.858917 4.41675C0.483917 4.41675 0.223639 4.24647 0.078084 3.90591C-0.0680275 3.56591 -0.00913858 3.26397 0.25475 3.00008L2.42142 0.833414C2.50475 0.750081 2.59503 0.687582 2.69225 0.645915C2.78947 0.604248 2.89364 0.583414 3.00475 0.583414C3.11586 0.583414 3.22003 0.604248 3.31725 0.645915C3.41447 0.687582 3.50475 0.750081 3.58808 0.833414Z"
          fill="#fff"
          fillOpacity="1"
        />
      </svg>
    );
  };

  const sortBy = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    setFilteredData((prevData) => {
      return [...prevData].sort((a, b) => {
        if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
        if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
        return 0;
      });
    });
  };

  const handleTokenSelect = (token) => {
    if (token === toFetch) return;
    console.log("Selected Token:", token);
    setToFetch(token);
    setLoading(true);
  };

  useEffect(() => {
    const [token, address] = toFetch.split(':');
    if (token.length > 3) {
      setTitle(hexToString(token));
    } else {
      setTitle(token);
    }
    console.log("Fetching:", address);
    const fetchData = async () => {
      const result = await axios.get(
        `${config.api_url}/richlist/${address}`
      );
      //add rank to the data
      let rank = 1;
      result.data.forEach((element) => {
        element.rank = rank;
        element.amount = element.balance;
        rank++;
      });
      setData(result.data);
      setFilteredData(result.data);
      setLoading(false);
    }
    fetchData();
  }, [toFetch]);

  useEffect(() => {
    // setFilteredData(data.filter((item) => item.address.toLowerCase().includes(searchValue.toLowerCase())));
    if (data !== null || data !== undefined) {
      // setFilteredData(
      // data.filter((item) => item.address.toLowerCase().includes(searchValue.toLowerCase()) || item.account.toLowerCase().includes(searchValue.toLowerCase()))
      // );
      if ('address' in data[0]) {
        setFilteredData(
          data.filter((item) => item.address.toLowerCase().includes(searchValue.toLowerCase()))
        );
      } else {
        setFilteredData(
          data.filter((item) => item.account.toLowerCase().includes(searchValue.toLowerCase()))
        );
      }
    }
  }, [data, searchValue]);

  return (
    <ModuleCard
      title={"Richlist - " + title}
      settings={
        <>
          <TitleSwitch
            value={moduleSettings.displayTitle}
            onChange={(value) => updateSettings("displayTitle", value)}
          />
          <SearchBarSwitch
            value={moduleSettings.displaySearchBar}
            onChange={(value) => updateSettings("displaySearchBar", value)}
          />
          <TokenDropdown onSelect={handleTokenSelect} num={5} selectToken={title} />
        </>
      }
      disableTitle={!moduleSettings.displayTitle}
    >
      <div className="w-full flex flex-col gap-8">

        {moduleSettings.displaySearchBar && (
          <SearchBar
            className="!bg-[#1A1A22] rounded-xl"
            placeholder={'Search for address'}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        )}

        <div className='flex flex-col gap-4 overflow-x-auto'>
          <div className="flex flex-row justify-between pb-4 border-b border-opacity-5 border-white">
            {columns.map((column) => {
              const isActive = sortConfig && sortConfig.key === column.sortKey;
              return (
                <div
                  key={column.sortKey}
                  className={`cursor-pointer text-left text-xs font-semibold flex flex-row items-center gap-2 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-60'
                    } ${column.width}`}
                  onClick={() => sortBy(column.sortKey)}
                >
                  {column.label}
                  {isActive && renderSortingIcon(column.sortKey)}
                </div>
              );
            })}
          </div>
          <div className='flex flex-col gap-2'>

            {loading ?
           
                Array.from({length: 33 }).map((_, index) => (
                <div key={index} className="flex flex-row justify-between animate-pulse">
                  <span className="h-4 bg-[#A6B0CF] bg-opacity-5 rounded w-1/12" />
                  <span className="h-4 bg-[#A6B0CF] bg-opacity-5 rounded w-4/12" />
                  <span className="h-4 bg-[#A6B0CF] bg-opacity-5 rounded w-3/12" />
                  <span className="h-4 bg-[#A6B0CF] bg-opacity-5 rounded w-2/12" />
                </div>
                ))
              :

              filteredData.map((item) => (
                <div key={item.rank} className="flex flex-row justify-between">
                  <div className="text-left w-1/12">{item.rank}</div>

                  <Link href={'https://bithomp.com/explorer/' + item.account} target="_blank" rel="noreferrer" className="text-left w-4/12 truncate pr-4">{item.address || item.account}</Link>
                  <div className="text-left w-3/12 truncate">
                    {formatNumber(Math.round(item.amount * 100) / 100)}
                  </div>
                  <div className="text-left w-2/12 truncate">
                    {Math.round(item.percentage * 1000) / 1000}%
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>

    </ModuleCard>
  );
};

export default RichList;