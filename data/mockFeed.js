const mockFeed = [
    {
        id: '1',
        type: 'socials',
        subtype: 'twitter', 
        href: '#',
        user: {
            image: 'https://randomuser.me/api/portraits/men/64.jpg', 
            imageAlt: 'Profile Icon',
            handle: '@username' 
        },
        content: {
            text: 'Thrilled by the disruptive potential of #XRP. Streamlining cross-border transactions and forging ahead with a future that redefines financial boundaries. Ready for the ride. #Ripple #CryptoCurrency #Blockchain ',
        },
        time: '2023-06-09T14:12:21.370Z',
    },
    {
        id: '2',
        type: 'wallets',
        subtype: 'transaction',
        direction: 'sent', 
        href: '#',
        user: {
            image: '',
            imageAlt: '',
            address: 'rwim...u55h'
        },
        content: {
            otherInfo: {
                amount: '20.00 XRP',
                addressFrom: 'rwim...u55h',
                addressTo: 'rPbr...L6NW' 
            },
        },
        time: '2023-06-08T10:13:22.370Z',
    },
    {
        id: '3',
        type: 'projects',
        subtype: 'nft', 
        href: '#',
        user: {
            image: '/url-to-image-3',
            imageAlt: 'Project Icon',
            address: '0x5678...' 
        },
        content: {
            infoType: 'Minted NFT',
            otherInfo: { 
                rightImg: '/url-to-right-image-3',
                rightImgAlt: 'Project Icon'
            },
        },
        time: '2023-06-07T18:14:23.370Z',
    },
    {
        id: '4',
        type: 'wallets',
        subtype: 'balance_update',
        href: '#',
        user: {
            image: '/url-to-image-4',
            imageAlt: '/Wallet Icon',
            address: '0x5678...'
        },
        content: {
            balance: {
                previous: '5.00 XRP',
                current: '15.00 XRP',
                change: '+10.00 XRP',
            },
            otherInfo: {
                rightImg: '/url-to-right-image-4',
                rightImgAlt: '/Wallet Icon'
            },
        },
        time: '2023-06-05T07:15:22.370Z',
    },
    {
        id: '5',
        type: 'socials',
        subtype: 'discord',
        href: '#',
        user: {
            image: 'https://randomuser.me/api/portraits/women/34.jpg',
            imageAlt: 'Profile Icon',
            handle: '@discorduser'
        },
        content: {
            text: 'Just joined the cool new CryptoArtClub! Exciting times ahead. #Discord #CryptoArt',
        },
        time: '2023-06-01T09:15:24.370Z',
    },
    {
        id: '6',
        type: 'wallets',
        subtype: 'transaction',
        direction: 'received',
        href: '#',
        user: {
            image: '/url-to-image-6',
            imageAlt: '/Wallet Icon',
            address: 'rwim...u55h'
        },
        content: {
            transactionType: 'Received Payment',
            otherInfo: {
                amount: '100,000,000.00 HOUND',
                addressFrom: 'rwim...u55h', 
                addressTo: 'rPbr...L6NW' 
            },
        },
        time: '2023-05-30T19:16:25.370Z',
    },
    {
        id: '7',
        type: 'projects',
        subtype: 'nft',
        href: '#',
        user: {
            image: '/url-to-image-7',
            imageAlt: 'Project Icon',
            address: '0x1122...'
        },
        content: {
            infoType: 'Bought NFT',
            otherInfo: {
                NFT: {
                    name: 'CryptoKitty #1234',
                    image: '/url-to-NFT-image',
                    price: '2.00 ETH'
                }
            },
        },
        time: '2023-05-25T21:17:26.370Z',
    },

];

export default mockFeed;
