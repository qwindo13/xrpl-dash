import React, {useState,useEffect} from 'react';
import Button from '../../Button/Button';
import Dropdown from '../../Dropdown/Dropdown';
import SearchBar from '../../SearchBar/SearchBar';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

const TokenDropdown = ({ onSelect }) => {
    const [selectedToken, setSelectedToken] = useState("");
    const [tokens, setTokens] = useState([]); 
    const [top10, setTop10] = useState([]); 
    const [searchValue, setSearchValue] = useState("");

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
      setSelectedToken(token.split(":")[0]); // Set the selected token
      onSelect(token); // Invoke the onSelect callback with the selected token
    };

    const getTop10Tokens = () => {
        const url = `https://api.xrpldashboard.com:3000/top10`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                // setTop10(data);
                const top10 = [];
                for (let i = 0; i < data.length; i++) {
                    let currency = data[i].currency;
                    if (currency.length > 3) {
                        currency = hexToString(currency);
                    }
                    const issuer = data[i].issuer;
                    const token = currency + ":" + issuer;  
                    top10.push(token);
                }
                setTop10(top10);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleSearch = (event) => {
        const searchQuery = event.target.value;
        setSearchValue(searchQuery);
        // const url = `https://api.xrpldashboard.com:3000/tokenname`
        // //check if it has a minimum of 3 characters
        // if (searchQuery.length >= 3) {
        //     //check if it starts with r
        //     if (searchQuery.startsWith("r")) {
        //         const issuerUrl = url + "/issuer/?issuer=" + searchQuery;
        //         fetch(issuerUrl)
        //             .then((response) => response.json())
        //             .then((data) => {
        //                 //response, [{"tokenString":"534F4C4F00000000000000000000000000000000:rsoLo2S1kiGeCcn6hCUXVrCpGMWLrRrLZz"},{},...]
        //                 const tokens = [];
        //                 for (let i = 0; i < data.length; i++) {
        //                     let currency = data[i].tokenString.split(":")[0];
        //                     if (currency.length > 3) {
        //                         currency = hexToString(currency);
        //                     }
        //                     const issuer = data[i].tokenString.split(":")[1];
        //                     const token = currency + ":" + issuer;  
        //                     tokens.push(token);
        //                 }
        //                 setTokens(tokens);
        //             })
        //             .catch((error) => {
        //                 console.log(error);
        //             }
        //         );
        //     } else {
        //         const currencyUrl = url + "/" + searchQuery;
        //         fetch(currencyUrl)
        //             .then((response) => response.json())
        //             .then((data) => {
        //                 //response, [{"tokenString":"534F4C4F00000000000000000000000000000000:rsoLo2S1kiGeCcn6hCUXVrCpGMWLrRrLZz"}] //a single object in a list
        //                 const tokenString = data[0].tokenString;
        //                 let currency = tokenString.split(":")[0];
        //                 if (currency.length > 3) {
        //                     currency = hexToString(currency);
        //                 }
        //                 const issuer = tokenString.split(":")[1];
        //                 const token = currency + ":" + issuer;
        //                 setTokens([token]);
        //             })
        //             .catch((error) => {
        //                 console.log(error);
        //             }
        //         );
        //     }
        // } else {
        //     setTokens([]);
        // };
    };

    const onEnterKey = (event) => {
        if (event.key === "Enter") {
            const searchQuery = searchValue;
            const url = `https://api.xrpldashboard.com:3000/tokenname`
            //check if it has a minimum of 3 characters
            if (searchQuery.length >= 3) {
                //check if it starts with r
                if (searchQuery.startsWith("r")) {
                    const issuerUrl = url + "/issuer/?issuer=" + searchQuery;
                    fetch(issuerUrl)
                        .then((response) => response.json())
                        .then((data) => {
                            //response, [{"tokenString":"534F4C4F00000000000000000000000000000000:rsoLo2S1kiGeCcn6hCUXVrCpGMWLrRrLZz"},{},...]
                            const tokens = [];
                            for (let i = 0; i < data.length; i++) {
                                let currency = data[i].tokenString.split(":")[0];
                                if (currency.length > 3) {
                                    currency = hexToString(currency);
                                }
                                const issuer = data[i].tokenString.split(":")[1];
                                const token = currency + ":" + issuer;  
                                tokens.push(token);
                            }
                            setTokens(tokens);
                        })
                        .catch((error) => {
                            console.log(error);
                        }
                    );
                } else {
                    const currencyUrl = url + "/" + searchQuery;
                    fetch(currencyUrl)
                        .then((response) => response.json())
                        .then((data) => {
                            //response, [{"tokenString":"534F4C4F00000000000000000000000000000000:rsoLo2S1kiGeCcn6hCUXVrCpGMWLrRrLZz"}] //a single object in a list
                            const tokenString = data[0].tokenString;
                            let currency = tokenString.split(":")[0];
                            if (currency.length > 3) {
                                currency = hexToString(currency);
                            }
                            const issuer = tokenString.split(":")[1];
                            const token = currency + ":" + issuer;
                            setTokens([token]);
                        })
                        .catch((error) => {
                            console.log(error);
                        }
                    );
                }
            } else {
                setTokens([]);
            };
        };
    };

    useEffect(() => {   
        getTop10Tokens();
    }, []);


    return (
        <div className='flex flex-row justify-between align-middle gap-2'>
            <div className='flex flex-col gap-2 w-full'>
                <span className='font-semibold text-base'>Token</span>
                <Dropdown
                    className={"w-full"}
                    trigger={
                        <Button className="text-sm w-full font-semibold justify-between" disableAnimation endIcon={<KeyboardArrowDownRoundedIcon />}>
                            {selectedToken || "Select token"}
                        </Button>
                    }
                >
                    <SearchBar
                        className="!bg-[#1A1A22] rounded-xl"
                        placeholder={'Search for address'}
                        onChange={handleSearch}
                        onKeyDown={onEnterKey}
                    />
                    {/* <p onClick={() => handleTokenClick("Dropdown item 1")}>Dropdown item 1</p>
                    <p onClick={() => handleTokenClick("Dropdown item 2")}>Dropdown item 2</p>
                    <p onClick={() => handleTokenClick("Dropdown item 3")}>Dropdown item 3</p> */}
                    {
                    // top10.map((token, index) => (
                    //     <p key={index} onClick={() => handleTokenClick(token)}>{token.split(":")[0]}</p>
                    // )) only show if token is empty
                   }
                    {
                        tokens.length > 0 ? (
                            tokens.map((token, index) => (
                                <p key={index} onClick={() => handleTokenClick(token)}>{token.split(":")[0]}</p>
                            ))
                        ) : (
                            top10.map((token, index) => (
                                <p key={index} onClick={() => handleTokenClick(token)}>{token.split(":")[0]}</p>
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
