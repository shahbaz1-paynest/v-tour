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
          targetScene: null
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
        },
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
    },
  };
  
  export const AppartmentProps = {
    apt1: {
        "image": "/appartment.webp",
        "alt": "Map",
        "links": [
          {
            "to": "/room/room1",
            "position": { "top": "52%", "left": "34%" },
            "content": "1"
          },
          {
            "to": "/room/room2",
            "position": { "top": "44%", "left": "33%" },
            "content": "2"
          },
          {
            "to": "/room/room1",
            "position": { "top": "41%", "left": "45%" },
            "content": "3"
          },
          {
            "to": "/room/room1",
            "position": { "top": "41%", "left": "53%" },
            "content": "4"
          },
          {
            "to": "/room/room1",
            "position": { "top": "47%", "left": "45%" },
            "content": "5"
          },
          {
            "to": "/room/room1",
            "position": { "top": "47%", "left": "52%" },
            "content": "6"
          }
        ]
    },
    apt2: {
        "image": "/appartment.webp",
        "alt": "Map",
        "links": [
          {
            "to": "/room/room1",
            "position": { "top": "52%", "left": "34%" },
            "content": "1"
          },
          {
            "to": "/room/room2",
            "position": { "top": "44%", "left": "33%" },
            "content": "2"
          }
        ]
    }
   
  }
  
  export const FloorProps = {
    floor1: {
        "image": "/single-building.png",
        "alt": "Floor Map",
        "links": [
          {
            "to": "/appartment/apt1",
            "position": { "top": "35%", "left": "50%" }
          },
          {
            "to": "/appartment/apt2",
            "position": { "top": "39%", "left": "51%" }
          },
          {
            "to": "/appartment/apt1",
            "position": { "top": "43%", "left": "52%" }
          },
          {
            "to": "/appartment/apt2",
            "position": { "top": "47%", "left": "53%" }
          },
          {
            "to": "/appartment/apt1",
            "position": { "top": "52%", "left": "54%" }
          },
          {
            "to": "/appartment/apt1",
            "position": { "top": "56%", "left": "55%" }
          },
          {
            "to": "/appartment/apt1",
            "position": { "top": "60%", "left": "56%" }
          },
          {
            "to": "/appartment/apt1",
            "position": { "top": "64%", "left": "57%" }
          },
          {
            "to": "/appartment/apt1",
            "position": { "top": "68%", "left": "58%" }
          },
          {
            "to": "/appartment/apt1",
            "position": { "top": "72%", "left": "59%" }
          }
        ]
    },
    floor2: {
        "image": "/single-building.png",
        "alt": "Floor Map",
        "links": [
          {
            "to": "/appartment/apt1",
            "position": { "top": "35%", "left": "50%" }
          },
          {
            "to": "/appartment/apt1",
            "position": { "top": "39%", "left": "51%" }
          },
          {
            "to": "/appartment/apt1",
            "position": { "top": "43%", "left": "52%" }
          },
          {
            "to": "/appartment/apt1",
            "position": { "top": "47%", "left": "53%" }
          },
          {
            "to": "/appartment/apt1",
            "position": { "top": "52%", "left": "54%" }
          },

        ]
    },

 
  }
  
  export const BuildingProps = {
    building1:{
        "image": "/building.webp",
        "alt": "Map",
        "links": [
          {
            "to": "/floor/floor1",
            "position": { "top": "50%", "left": "60%" }
          },
          {
            "to": "/floor/floor2",
            "position": { "top": "47%", "left": "80%" }
          },
          {
            "to": "/floor/floor1",
            "position": { "top": "39%", "left": "68%" }
          },
          {
            "to": "/floor/floor1",
            "position": { "top": "39%", "left": "29%" }
          },
          {
            "to": "/floor/floor1",
            "position": { "top": "47%", "left": "17%" }
          },
          {
            "to": "/floor/floor1",
            "position": { "top": "49.5%", "left": "35%" }
          }
        ]
    },
    building2:{
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
        ]
    },

   
  }
  
  export const RoomProps = {
    room1:{
        "image": "/room.webp",
        "alt": "Room Map",
        "rooms": [
          {
            "name": "Bedroom",
            "position": { "top": "45%", "left": "60%" },
            "link": "/panorama/bedroom"
          },
          {
            "name": "Kitchen",
            "position": { "top": "60%", "left": "39%" },
            "link": "/panorama/living"
          },
          {
            "name": "Living Room",
            "position": { "top": "50%", "left": "40%" },
            "link": "/panorama/living"
          },
          {
            "name": "Dining Room",
            "position": { "top": "50%", "left": "50%" },
            "link": "/panorama/living"
          }
        ]
    },
    room2:{
        "image": "/room.webp",
        "alt": "Room Map",
        "rooms": [
          {
            "name": "Bedroom",
            "position": { "top": "45%", "left": "60%" },
            "link": "/panorama/bedroom"
          },
          {
            "name": "Kitchen",
            "position": { "top": "60%", "left": "39%" },
            "link": "/panorama/living"
          },
        ]
    }
 
  }