const mockAlerts = [
    {
      id: 1,
      token: "HOUND (Greyhound)",
      symbol: "/images/greyhound-logo.svg",
      alerts: [
        {
          id: 'h1',
          type: "Price Alert",
          description: "Lesser Than 0.20 XRP - Once",
          active: true,
        },
        {
          id: 'h2',
          type: "Price Alert",
          description: "Greater Than 0.23 XRP - Once",
          active: true,
        },
        // more alerts for HOUND...
      ]
    },
    {
      id: 2,
      token: "SOLO (Sologenic)",
      symbol: "/images/solo-logo.png",
      alerts: [
        {
          id: 's1',
          type: "Price Alert",
          description: "Greater Than 0.23 XRP - Once",
          active: true,
        },
        // more alerts for SOLO...
      ]
    },
    // More projects...
  ];
  
export default mockAlerts;