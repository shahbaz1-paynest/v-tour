export const scenes = {
    bedroom: {
      image: "/panaroma.webp",
      circles: [
        {
          radius: 49,
          theta: -Math.PI / 2,
          phi: Math.PI / 1.8,
          showTooltip: true,
          tooltipContent: {
            title: "Bed",
            description: "This is a comfortable bed.",
            link: ""
          },
          targetScene: null  // No transition for this hotspot
        },
        {
          radius: 49,
          theta: -Math.PI / 4,
          phi: Math.PI / 2,
          showTooltip: true,
          tooltipContent: {
            title: "To Living Room",
            description: "Click to enter living room",
            link: ""
          },
          targetScene: "living" 
        }
      ]
    },
    living: {
      image: "/pan.webp",
      circles: [
        {
          radius: 49,
          theta: Math.PI / 2,
          phi: Math.PI / 2,
          showTooltip: true,
          tooltipContent: {
            title: "To Bedroom",
            description: "Click to return to bedroom",
            link: ""
          },
          targetScene: "bedroom"
        }
      ]
    }
  };
  
  export const AppartmentProps = {
    "image": "/appartment.webp",
    "alt": "Map",
    "links": [
      {
        "to": "/room",
        "position": { "top": "52%", "left": "34%" },
        "content": "1"
      },
      {
        "to": "/room",
        "position": { "top": "44%", "left": "33%" },
        "content": "2"
      },
      {
        "to": "/room",
        "position": { "top": "41%", "left": "45%" },
        "content": "3"
      },
      {
        "to": "/room",
        "position": { "top": "41%", "left": "53%" },
        "content": "4"
      },
      {
        "to": "/room",
        "position": { "top": "47%", "left": "45%" },
        "content": "5"
      },
      {
        "to": "/room",
        "position": { "top": "47%", "left": "52%" },
        "content": "6"
      }
    ]
  }
  
  export const FloorProps = {
    "image": "/single-building.png",
    "alt": "Floor Map",
    "links": [
      {
        "to": "/appartment",
        "position": { "top": "35%", "left": "50%" }
      },
      {
        "to": "/appartment",
        "position": { "top": "39%", "left": "51%" }
      },
      {
        "to": "/appartment",
        "position": { "top": "43%", "left": "52%" }
      },
      {
        "to": "/appartment",
        "position": { "top": "47%", "left": "53%" }
      },
      {
        "to": "/appartment",
        "position": { "top": "52%", "left": "54%" }
      },
      {
        "to": "/appartment",
        "position": { "top": "56%", "left": "55%" }
      },
      {
        "to": "/appartment",
        "position": { "top": "60%", "left": "56%" }
      },
      {
        "to": "/appartment",
        "position": { "top": "64%", "left": "57%" }
      },
      {
        "to": "/appartment",
        "position": { "top": "68%", "left": "58%" }
      },
      {
        "to": "/appartment",
        "position": { "top": "72%", "left": "59%" }
      }
    ]
  }
  
  export const BuildingProps = {
    "image": "/building.webp",
    "alt": "Map",
    "links": [
      {
        "to": "/floor",
        "position": { "top": "50%", "left": "60%" }
      },
      {
        "to": "/floor",
        "position": { "top": "47%", "left": "80%" }
      },
      {
        "to": "/floor",
        "position": { "top": "39%", "left": "68%" }
      },
      {
        "to": "/floor",
        "position": { "top": "39%", "left": "29%" }
      },
      {
        "to": "/floor",
        "position": { "top": "47%", "left": "17%" }
      },
      {
        "to": "/floor",
        "position": { "top": "49.5%", "left": "35%" }
      }
    ]
  }
  
  export const RoomProps = {
    "image": "/room.webp",
    "alt": "Room Map",
    "rooms": [
      {
        "name": "Bedroom",
        "position": { "top": "45%", "left": "60%" },
        "link": "/panorama"
      },
      {
        "name": "Kitchen",
        "position": { "top": "60%", "left": "39%" },
        "link": "/panorama"
      },
      {
        "name": "Living Room",
        "position": { "top": "50%", "left": "40%" },
        "link": "/panorama"
      },
      {
        "name": "Dining Room",
        "position": { "top": "50%", "left": "50%" },
        "link": "/panorama"
      }
    ]
  }