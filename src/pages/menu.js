const menus = [
    {
        id: 1,
        name: 'Home',
        links: '#',
        namesub: [
            {
                id: 1,
                sub: 'Home',
                links: '/'
            },
        ]
    },
    {
        id: 2,
        name: 'Explore',
        links: '#',
        namesub: [
            {
                id: 1,
                sub: 'Explore',
                links: '/explore-01'
            },
            {
                id: 5,
                sub: 'Live Auctions',
                links: '/live-auctions'
            },
        ],
    },
    {
        id: 5,
        name: 'More',
        links: '#',
        namesub: [
            {
                id: 4,
                sub: 'Create Posting',
                links: '/create-item'
            },
            {
                id: 10,
                sub: 'FAQ',
                links: '/faq'
            }
        ],
    },
]

export default menus;