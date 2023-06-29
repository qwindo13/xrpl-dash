import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from '../../Button/Button';
import Dropdown from '../../Dropdown/Dropdown';
import SearchBar from '../../SearchBar/SearchBar';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import tokensJsonData from '../../../../public/jsons/tokens.json';
//[
// {
//     "tokenString": "534F4C4F00000000000000000000000000000000:rsoLo2S1kiGeCcn6hCUXVrCpGMWLrRrLZz",
//     "volume_24h": "162697.725567",
//     "trustlines": 283709,
//     "image": "https://static.xrplmeta.org/icons/SOLO.png",
//     "issuerName": "Sologenic"
// },
// {
//     "tokenString": "USD:rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
//     "volume_24h": "148530.255971",
//     "trustlines": 27547,
//     "image": "https://static.xrplmeta.org/icons/USD.png",
//     "issuerName": "Bitstamp"
// }
// ]
//tokensJsonData format

const TokenDropdown = ({ onSelect, num = 10 }) => {
    const [selectedToken, setSelectedToken] = useState("");
    const [tokens, setTokens] = useState([]);
    const [top10, setTop10] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [images, setImages] = useState([]);
    const [searchImages, setSearchImages] = useState([]); //images for search results
    const [issuers, setIssuers] = useState([]); //issuers for search results
    const [searchIssuers, setSearchIssuers] = useState([]); //issuers for search results
    const [tokenCached, setTokenCached] = useState([]); //token cached for search results, [{token: "token",tokenString: "tokenString"},{token: "token",tokenString: "tokenString"},...]

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

    const handleTokenClick = (token) => {
        // setSelectedToken(token.split(":")[0]); // Set the selected token
        if (token.split(":")[0].length > 3) {
            setSelectedToken(hexToString(token.split(":")[0]));
        } else {
            setSelectedToken(token.split(":")[0]);
        }
        onSelect(token); // Invoke the onSelect callback with the selected token
        setSearchImages([]);
        setSearchIssuers([]);
        setTokens([]);
    };

    const getTop10Tokens = () => {
        const url = `https://api.xrpldashboard.com:3000/top10`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                // setTop10(data);
                const top10 = [];
                const images = [];
                const issuers = [];
                for (let i = 0; i < data.length; i++) {
                    if (i === num) break;
                    let currency = data[i].currency;
                    let icon;
                    let issuername;
                    if ('icon' in data[i].meta.token) {
                        icon = data[i].meta.token.icon;
                    } else {
                        icon = '/images/hound.png';
                    }
                    if ('name' in data[i].meta.issuer) {
                        issuername = data[i].meta.issuer.name;
                    } else {
                        issuername = data[i].issuer;
                    }
                    if (currency.length > 3) {
                        currency = hexToString(currency);
                    }
                    const issuer = data[i].issuer;
                    const token = currency + ":" + issuer;
                    images.push(icon);
                    top10.push(token);
                    issuers.push(issuername);
                }
                setTop10(top10);
                setImages(images);
                setIssuers(issuers);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleSearch = (event) => {
        const searchQuery = event.target.value;
        if (searchQuery.length === 0) {
            setSearchImages([]);
            setSearchIssuers([]);
            setTokens([]);
        } else {
            setSearchValue(searchQuery);
            let search = searchQuery.toUpperCase();
            const searchResults = [];
            const searchImages = [];
            const searchIssuers = [];

            //the tokenCached has the token data, to match the search with `tokenCached.token`
            for (let i = 0; i < tokenCached.length; i++) {
                if (tokenCached[i].token.includes(search)) {
                    searchResults.push(tokenCached[i].tokenString);
                    searchImages.push(tokenCached[i].image);
                    searchIssuers.push(tokenCached[i].issuerName);
                }
            }

            setSearchImages(searchImages);
            setSearchIssuers(searchIssuers);
            setTokens(searchResults);
        }
    };

    useEffect(() => {
        getTop10Tokens();
        //cache tokens, if the length is more than 3, convert to hex to string
        const cachedTokens = [];
        for (let i = 0; i < tokensJsonData.length; i++) {
            let token = tokensJsonData[i].tokenString.split(":")[0];
            if (token.length > 3) {
                token = hexToString(token);
            }
            //convert string to uppercase
            token = token.toUpperCase();
            cachedTokens.push({
                token: token,
                tokenString: tokensJsonData[i].tokenString,
                image: tokensJsonData[i].image,
                issuerName: tokensJsonData[i].issuerName
            });
        }
        setTokenCached(cachedTokens);
    }, []);

    return (
        <div className='flex flex-row justify-between align-middle gap-2'>
            <div className='flex flex-col gap-2 w-full'>
                <span className='font-semibold text-base'>Token</span>
                <Dropdown
                    className={"w-full gap-4"}
                    trigger={
                        <Button className="text-sm w-full font-semibold justify-between" disableAnimation endIcon={<KeyboardArrowDownRoundedIcon />}>
                            {selectedToken || "Select token"}
                        </Button>
                    }
                    closeDropdown={(e) => {
                        // Here, we check if the search bar was clicked
                        if (e.target !== document.getElementById('searchBar')) {
                            // If it wasn't the search bar, we trigger the close
                            e.stopPropagation();
                        }
                    }}
                >
                    <SearchBar
                        id="searchBar"
                        className="!bg-[#1A1A22] rounded-xl"
                        placeholder={'Search for address'}
                        onChange={handleSearch}
                    // onKeyDown={onEnterKey}
                    />
                    {
                        tokens.length > 0 ? (
                            tokens.map((token, index) => (
                                <>
                                    <div className='flex flex-row items-center cursor-pointer'>
                                        <img width="30" height="30" src={searchImages[index]} alt="icon" className='mr-2 rounded-full' />
                                        <span className="whitespace-nowrap font-semibold" key={index} onClick={() => handleTokenClick(token)}>
                                            {
                                                // token.split(":")[0] change from hex to string if it is longer than 3 characters
                                                token.split(":")[0].length > 3 ? hexToString(token.split(":")[0]) : token.split(":")[0]
                                            }
                                        </span>
                                        <span className=' text-xs'>&nbsp;{ searchIssuers[index] ? `(${searchIssuers[index]})` : '' }</span>
                                    </div>
                                </>
                            ))
                        ) : (
                            top10.map((token, index) => (
                                <>
                                    <div className='flex flex-row items-center cursor-pointer'>
                                        <Image width="30" height="30" src={images[index]} alt="icon" className='mr-2 rounded-full' />
                                        <span className="whitespace-nowrap font-semibold" key={index} onClick={() => handleTokenClick(token)}>{token.split(":")[0]} </span>
                                        <span className=' text-xs'>&nbsp;{issuers[index] ? `(${issuers[index]})` : ''}</span>
                                    </div>
                                </>
                            ))
                        )
                    }
                </Dropdown>
                <span className='opacity-60 font-semibold text-xs'>Select the XRPL token you want to display</span>
            </div>

        </div>
    );
};

export default TokenDropdown;
