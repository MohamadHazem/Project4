import axios from "axios";

const BackendAxios = axios.create({
    baseURL: process.env.BACKEND_URL
})

//Dummy data
export const user = [{
    "username":"Hazem",
    "fullName":"Hazem Taj",
    "contactNo":"3343431",
    "email":"hazem@email.com",
},
]

export const cars = [
    {"_id":"Car1",
    "model":"Axia",
    "brand":"Perodua",
    "year": "2014",
    "description":"A-segment hatchback based on the Daihatsu Ayla and the successor to the Perodua Viva.",
    "price": "22,000",
    },

    {"_id":"Car2",
    "model":"Alza",
    "brand":"Perodua",
    "year": "2009",
    "description":"Three-row B-segment MPV based on the Daihatsu Xenia.",
    "price": "62,500",
    },

    {"_id":"Car3", 
    "model":"Myvi",
    "brand":"Perodua",
    "year": "2005",
    "description":"B-segment hatchback. Exported to Indonesia as the Daihatsu Sirion.",
    "price": "46,500",
    },

    {"_id":"Car4", 
    "model":"Ativa",
    "brand":"Perodua",
    "year": "2021",
    "description":"A-segment SUV based on the Daihatsu Rocky.",
    "price": "62,500",
    },

    {"_id":"Car5", 
    "model":"Aruz",
    "brand":"Perodua",
    "year": "2019",
    "description":"Three-row, rear-wheel-drive B-segment SUV based on the Daihatsu Terios.",
    "price": "72,900",
    },

    {"_id":"Car6", 
    "model":"Bezza",
    "brand":"Perodua",
    "year": "2016",
    "description":"A-segment sedan, not shared with other overseas models.",
    "price": "34,580",
    },

    {"_id":"Car7", 
    "model":"Persona",
    "brand":"Proton",
    "year": "2016",
    "description":"A subcompact (B-segment) saloon.",
    "price": "47,800",
    },

    {"_id":"Car8", 
    "model":"Iriz",
    "brand":"Proton",
    "year": "2014",
    "description":"A five-door, five-seater supermini.",
    "price": "42,800",
    },

    {"_id":"Car9", 
    "model":"Exora",
    "brand":"Proton",
    "year": "2009",
    "description":"A compact multi-purpose vehicle (MPV) in the C-segment.",
    "price": "62,800",
    },

    {"_id":"Car10", 
    "model":"X50",
    "brand":"Proton",
    "year": "2020",
    "description":"A B-segment subcompact crossover SUV.",
    "price": "86,300",
    },

    {"_id":"Car11", 
    "model":"X70",
    "brand":"Proton",
    "year": "2018",
    "description":"A compact C-segment crossover SUV.",
    "price": "98,800",
    },

    {"_id":"Car12", 
    "model":"X90",
    "brand":"Proton",
    "year": "2023",
    "description":"A mid-size crossover SUV.",
    "price": "123,800",
    },

    {"_id":"Car13", 
    "model":"Saga",
    "brand":"Proton",
    "year": "1985",
    "description":"A-segment saloon engineered by Malaysian automobile manufacturer Proton.",
    "price": "34,800",
    },

    {"_id":"Car14", 
    "model":"Kancil Turbo",
    "brand":"Perodua",
    "year": "1994",
    "description":"Best car ever. Malaysian version of Ferrari.",
    "price": "100,000",
    }
];

export default BackendAxios