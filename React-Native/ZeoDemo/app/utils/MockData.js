import React from 'react';
import IconMen from '../Icons/IconMen';
import IconWomen from '../Icons/IconWomen';
import IconDevices from '../Icons/IconDevices';
import IconGadget from '../Icons/IconGadget';
import IconGaming from '../Icons/IconGaming';
import {appColors} from './appColors';

export const features = [
  'Always up-to-date React Native scaffolding',
  'Modular and well-documented structure for application code',
  'Redux for state management',
  'React Navigation for simple navigation',
  'Dropdown Alert Helper for showing success/error/info message',
  'Basic custom components like Text input,Label and picker select etc',
];
export const starterIntro = [
  'We love building apps with React Native, because it helps us create high quality products for both major mobile platforms quickly and cost-effectively.',
  'Getting started on a new app just takes too long. Most apps need the same basic building blocks and developer infrastructure, and we are bored of reinventing the wheel time and time again.',
  'This Starter Kit reflects the best practices of React Native development we have discovered while building real-world applications for our customers. It is opinionated about tooling, patterns and development practices. It might not be a one-size-fits-all solution for everyone, but feel free to customize it for your needs, or just take inspiration from it.',
];
export const bestSellersList = [
  {
    name: 'BeoPlay Speaker',
    description: 'Bang and Olufsen',
    price: '755',
    category: 'men',
    id: 'men_1',
    image: require('../static/images/products/men_1.jpeg'),
  },
  {
    name: 'Wrist watch',
    description: 'Tag Heuer',
    price: '499',
    category: 'men',
    id: 'men_2',
    image: require('../static/images/products/men_2.jpeg'),
  },
  {
    name: 'Nike FIT Sleeve',
    description: 'Nike Dri-FIT longer.',
    price: '1500',
    category: 'devices',
    id: 'ele_2',
    image: require('../static/images/products/ele_2.jpeg'),
  },
  {
    name: 'BeoPlay Speaker',
    description: 'Bang and Olufsen',
    price: '755',
    category: 'women',
    id: 'women_2',
    image: require('../static/images/products/women_2.jpeg'),
  },
];

export const productsList = {
  men: [
    {
      name: 'Calibre 400',
      description: 'The New Standard',
      price: '755',
      category: 'men',
      id: 'men_1',
      image: require('../static/images/products/men_1.jpeg'),
    },
    {
      name: 'Land Rover',
      description: 'Beast Within The Beauty',
      price: '499',
      category: 'men',
      id: 'men_2',
      image: require('../static/images/products/men_2.jpeg'),
    },
    {
      name: 'Bulgari Octo',
      description: 'Thin Is In',
      price: '1500',
      category: 'men',
      id: 'men_3',
      image: require('../static/images/products/men_3.jpeg'),
    },
    {
      name: 'The Girard',
      description: 'The Versatile Sport Watch',
      price: '755',
      category: 'men',
      id: 'men_4',
      image: require('../static/images/products/men_4.jpeg'),
    },
    {
      name: 'An Ode',
      description: 'Louis Moinet Geograph',
      price: '755',
      category: 'men',
      id: 'men_5',
      image: require('../static/images/products/men_5.jpeg'),
    },
    {
      name: 'Galactic Scale',
      description: 'SpaceTime GunMetal',
      price: '755',
      category: 'men',
      id: 'men_6',
      image: require('../static/images/products/men_6.jpeg'),
    },
  ],
  women: [
    {
      name: 'Buglaris Serpenti',
      description: 'Icons Latest Skin',
      price: '755',
      category: 'women',
      id: 'women_1',
      image: require('../static/images/products/women_1.jpeg'),
    },
    {
      name: 'Feline Disposition',
      description: 'Eye Celestial',
      price: '499',
      category: 'women',
      id: 'women_2',
      image: require('../static/images/products/women_2.jpeg'),
    },
    {
      name: 'Frederique',
      description: 'Roaring 20s On Wrist',
      price: '1500',
      category: 'women',
      id: 'women_3',
      image: require('../static/images/products/women_3.jpeg'),
    },
    {
      name: 'Baume',
      description: 'Everyday Classic',
      price: '755',
      category: 'women',
      id: 'women_4',
      image: require('../static/images/products/women_4.jpeg'),
    },
    {
      name: 'Manhattan',
      description: 'Omega Constellation',
      price: '755',
      category: 'women',
      id: 'women_5',
      image: require('../static/images/products/women_5.jpeg'),
    },
    {
      name: 'Bulgari Lvcea',
      description: 'Bang and Olufsen',
      price: '755',
      category: 'women',
      id: 'women_6',
      image: require('../static/images/products/women_6.jpeg'),
    },
  ],
  devices: [
    {
      name: 'Mi 4',
      description: 'Smart Band 4',
      price: '755',
      category: 'devices',
      id: 'ele_1',
      image: require('../static/images/products/ele_1.jpeg'),
    },
    {
      name: 'Fitbit',
      description: 'FB507BKBK Versa 2',
      price: '499',
      category: 'devices',
      id: 'ele_2',
      image: require('../static/images/products/ele_2.jpeg'),
    },
    {
      name: 'Noise',
      description: 'Colorfit Pro 2',
      price: '1500',
      category: 'devices',
      id: 'ele_3',
      image: require('../static/images/products/ele_3.jpeg'),
    },
    {
      name: 'HONOR',
      description: 'HONOR Band 5',
      price: '755',
      category: 'devices',
      id: 'ele_4',
      image: require('../static/images/products/ele_4.jpeg'),
    },
    {
      name: 'Garmin',
      description: 'Forerunner 245',
      price: '755',
      category: 'devices',
      id: 'ele_5',
      image: require('../static/images/products/ele_5.jpeg'),
    },
    {
      name: 'Samsung',
      description: 'Galaxy Watch',
      price: '755',
      category: 'devices',
      id: 'ele_6',
      image: require('../static/images/products/ele_6.jpeg'),
    },
  ],
  gadget: [
    {
      name: 'Apple',
      description: 'Apple AirTag',
      price: '755',
      category: 'gadget',
      id: 'gadget_1',
      image: require('../static/images/products/gadget_1.jpeg'),
    },
    {
      name: 'Ear Buds',
      description: 'Apple Ear Buds',
      price: '499',
      category: 'gadget',
      id: 'gadget_2',
      image: require('../static/images/products/gadget_2.jpeg'),
    },
    {
      name: 'iPhone',
      description: 'Apple Smart Phone',
      price: '1500',
      category: 'gadget',
      id: 'gadget_3',
      image: require('../static/images/products/gadget_3.jpeg'),
    },
    {
      name: 'Cam',
      description: 'Web Camera',
      price: '755',
      category: 'gadget',
      id: 'gadget_4',
      image: require('../static/images/products/gadget_4.jpeg'),
    },
  ],
  gaming: [
    {
      name: 'Game in',
      description: 'Game Console',
      price: '755',
      category: 'gaming',
      id: 'game_1',
      image: require('../static/images/products/game_1.jpeg'),
    },
    {
      name: 'Amkette',
      description: 'Remote control',
      price: '499',
      category: 'gaming',
      id: 'game_2',
      image: require('../static/images/products/game_2.jpeg'),
    },
    {
      name: 'Sony',
      description: 'Game Control',
      price: '1500',
      category: 'gaming',
      id: 'game_3',
      image: require('../static/images/products/game_3.jpeg'),
    },
    {
      name: 'PS2',
      description: 'Play Station 2',
      price: '755',
      category: 'gaming',
      id: 'game_4',
      image: require('../static/images/products/game_4.jpeg'),
    },
  ],
};

export const productDetail = {
  name: 'Leather Wrist watch',
  detail:
    'Nike Dri-FIT is a polyester fabric designed to help you keep dry so you can more comfortably work harder, longer.',
  price: '499',
  size: 'XL',
  color: 'blue',
  image: require('../static/images/products/2.png'),
  isFav: false,
};

export const reviews = [
  {
    name: 'Amusoftech',
    detail: 'Wonderful jean, perfect gift for my girl for our anniversary!',
    count: 4,
    image: require('../static/images/rate/1.png'),
  },
  {
    name: 'Aman Deep',
    detail: 'Nike Dri-FIT is a polyester fabric designed to help you ',
    count: 3,
    image: require('../static/images/rate/1.png'),
  },
];

export const categoriesList = [
  {
    label: 'Men',
    id: 'men',
    Icon: () => <IconMen fill={appColors.primary} />,
  },
  {
    label: 'Women',
    id: 'women',
    Icon: () => <IconWomen fill={appColors.primary} />,
  },
  {
    label: 'Devices',
    id: 'devices',
    Icon: () => <IconDevices fill={appColors.primary} />,
  },
  {
    label: 'Gadget',
    id: 'gadget',
    Icon: () => <IconGadget fill={appColors.primary} />,
  },
  {
    label: 'Gaming',
    id: 'gaming',
    Icon: () => <IconGaming fill={appColors.primary} />,
  },
];
export const recentSearches = [
  'Shoes',
  'Caps',
  'Apple',
  'Google',
  'Macbook',
  'Sport weares',
];

export const deliveryTypes = [
  {
    label: 'Standard Delivery',
    subLabel: 'Order will be delivered between 3 - 5 business days',
    selected: true,
  },
  {
    label: 'Next Day Delivery',
    subLabel:
      'Place your order before 6pm and your items will be delivered the next day',
    selected: false,
  },
  {
    label: 'Nominated Delivery',
    subLabel:
      'Pick a particular date from the calendar and order will be delivered on selected date',
    selected: false,
  },
];
export const paymentMethods = ['dollar-sign', 'credit-card', 'layout'];

export const profileKeys=[
  {
    lebel:"Edit Profile",
    icon:"edit-3"
  },
  {
    lebel:"Shipping Address",
    icon:"map-pin",
    route:"Address"
  },
  {
    lebel:"Order History",
    icon:"clock",
    route: "Orders"
  },
  {
    lebel:"Track Order",
    icon:"package",
    route: "Orders"
  },
  {
    lebel:"Cards",
    icon:"credit-card"
  },
  {
    lebel:"Notifications",
    icon:"bell"
  },
  {
    lebel:"Sign Out",
    icon:"log-out",
    route: "Login"
  }
]

export const otherKeys=[
  {
    lebel:"Login",
    route:"Login"
  },
  {
    lebel:"Unset UserIdentities",
  },
  {
    lebel:"Privacy Policy",
  },
  {
    lebel: "Custom Consent",
    route:"Consent"
  },
];

export const defaultConfigs = {
  write_key: "3fd5b21e-8b07-4d0c-8167-74aa6c998605",
  logging: true,
  batch_size: 5,
  optout: null,
  service_interval: 500,
  version: "qa",
  maxCacheSize: 500,
  useConsent: false,
  checkForCMP: false,
  checkZeotapVendorConsent: false,
  purposesForTracking: {
    '1': true, 
    '3': true, 
    '4': true
  },
  purposesForIdentify: {
    '1': true, 
    '9': true
  },
  areIdentitiesHashed: null,
  hashIdentities: false
};

export const defaultPreference = {
  displayName: "Zeotap",
  iconColor: appColors.primary,
  age: 30
}

export const SDKConfigOptions = {
  purposesForTrackingKey: "purposesForTracking",
  optout: [
    {id: 1, label: "True", value: true},
    {id: 2, label: "False", value: false},
    {id: 3, label: "Not set", value: null},
  ],
  areIdentitiesHashed: [
    {id: 1, label: "True", value: true},
    {id: 2, label: "False", value: false},
    {id: 3, label: "Not set", value: null},
  ],
  roleForConsent: [
    {
      item: 'Publisher',
      id: 'publisher'
    },
    {
      item: 'Vendor',
      id: 'vendor'
    }
  ],
  tcfPublisherConsentCategory: [
    {
      item: 'Consents',
      id: 'consents'
    },
    {
      item: 'LegitimateInterests',
      id: 'legitimateInterests'
    }
  ],
  purposesForTracking: [
    { item: 'Store and/or access information on a device', id: 1, category: 'purposesForTracking' },
    { item: 'Select basic ads', id: 2, category: 'purposesForTracking' },
    { item: 'create a personalized ad profile', id: 3, category: 'purposesForTracking' },
    { item: 'Select personalised ads', id: 4, category: 'purposesForTracking' },
    { item: 'Create a personalized content profile', id: 5, category: 'purposesForTracking' },
    { item: 'Select personalized content', id: 6, category: 'purposesForTracking' },
    { item: 'Measure ad performance', id: 7, category: 'purposesForTracking' },
    { item: 'Measure content performance', id: 8, category: 'purposesForTracking' },
    { item: 'Apply market research to generate audience insights', id: 9, category: 'purposesForTracking' },
    { item: 'Develop and improve products', id: 10, category: 'purposesForTracking' }
  ],
  purposesForIdentify: [
    { item: 'Store and/or access information on a device', id: 1, category: 'purposesForIdentify' },
    { item: 'Select basic ads', id: 2, category: 'purposesForIdentify' },
    { item: 'create a personalized ad profile', id: 3, category: 'purposesForIdentify' },
    { item: 'Select personalised ads', id: 4, category: 'purposesForIdentify' },
    { item: 'Create a personalized content profile', id: 5, category: 'purposesForIdentify' },
    { item: 'Select personalized content', id: 6, category: 'purposesForIdentify' },
    { item: 'Measure ad performance', id: 7, category: 'purposesForIdentify' },
    { item: 'Measure content performance', id: 8, category: 'purposesForIdentify' },
    { item: 'Apply market research to generate audience insights', id: 9, category: 'purposesForIdentify' },
    { item: 'Develop and improve products', id: 10, category: 'purposesForIdentify' }
  ]
}

export const orderList =[
  {
    label: 'AMU - 9249296 - N',
    amount: '3503',
    status: 'In transit',
    color: 'yellow',
  },
  {
    label:"OD - 424923192 - N",
    amount:"3453",
    status:"Delivered",
    color:"primary"
  },
  {
    label:"OD - 424923192 - N",
    amount:"3503",
    status:"Delivered",
    color:"primary"
  },
  {
    label:"OD - 424923192 - N",
    amount:"4453",
    status:"Delivered",
    color:"primary"
  }, 
  /* {
    label:"",
    amount:"",
    status:"",
    color:""
  },
  {
    label:"",
    amount:"",
    status:"",
    color:""
  } */
]

export const sampleEventData = [
  {
    name: "View Product",
    prop: {name: productsList.men[0].name, description: productsList.men[0].description, price: productsList.men[0].price}
  },
  {
    name: "View Product",
    prop: {name: productsList.men[1].name, description: productsList.men[1].description, price: productsList.men[1].price}
  },
  {
    name: "View Product",
    prop: {name: productsList.men[2].name, description: productsList.men[2].description, price: productsList.men[3].price}
  },
  {
    name: "Add To Cart", 
    prop: {name: productsList.men[0].name, price: productsList.men[0].price, quantity:1}
  },
  {
    name: "Add To Cart", 
    prop: {name: productsList.men[2].name, price: productsList.men[2].price, quantity:1}
  },
  {
    name: "Add To Cart", 
    prop: {name: productsList.men[3].name, price: productsList.men[3].price, quantity:1}
  },
  {
    name: "Category Selected",
    prop: {selectedCategory: categoriesList[0].label}
  },
  {
    name: "Product Search",
    prop: {search_text: "Sample"}
  },
  {
    name: "View Product",
    prop: {name: productsList.women[0].name, description: productsList.women[0].description, price: productsList.women[0].price}
  },
  {
    name: "View Product",
    prop: {name: productsList.women[1].name, description: productsList.women[1].description, price: productsList.women[1].price}
  },
  {
    name: "View Product",
    prop: {name: productsList.women[2].name, description: productsList.women[2].description, price: productsList.women[3].price}
  },
  {
    name: "Add To Cart", 
    prop: {name: productsList.women[0].name, price: productsList.women[0].price, quantity:1}
  },
  {
    name: "Add To Cart", 
    prop: {name: productsList.women[2].name, price: productsList.women[2].price, quantity:1}
  },
  {
    name: "Add To Cart", 
    prop: {name: productsList.women[3].name, price: productsList.women[3].price, quantity:1}
  },
  {
    name: "Category Selected",
    prop: {selectedCategory: categoriesList[1].label}
  },
  {
    name: "Product Search",
    prop: {search_text: "test"}
  },
  {
    name: "View Product",
    prop: {name: productsList.women[0].name, description: productsList.women[0].description, price: productsList.women[0].price}
  },
  {
    name: "View Product",
    prop: {name: productsList.women[1].name, description: productsList.women[1].description, price: productsList.women[1].price}
  },
  {
    name: "View Product",
    prop: {name: productsList.women[2].name, description: productsList.women[2].description, price: productsList.women[3].price}
  },
  {
    name: "Add To Cart", 
    prop: {name: productsList.women[0].name, price: productsList.women[0].price, quantity:1}
  },
  {
    name: "Add To Cart", 
    prop: {name: productsList.women[2].name, price: productsList.women[2].price, quantity:1}
  },
  {
    name: "Add To Cart", 
    prop: {name: productsList.women[3].name, price: productsList.women[3].price, quantity:1}
  },
  {
    name: "Category Selected",
    prop: {selectedCategory: categoriesList[0].label}
  },
  {
    name: "Product Search",
    prop: {search_text: "Sample"}
  },
  {
    name: "View Product",
    prop: {name: productsList.women[0].name, description: productsList.women[0].description, price: productsList.women[0].price}
  },
  {
    name: "View Product",
    prop: {name: productsList.women[1].name, description: productsList.women[1].description, price: productsList.women[1].price}
  },
  {
    name: "View Product",
    prop: {name: productsList.women[2].name, description: productsList.women[2].description, price: productsList.women[3].price}
  },
  {
    name: "Add To Cart", 
    prop: {name: productsList.women[0].name, price: productsList.women[0].price, quantity:1}
  },
  {
    name: "Add To Cart", 
    prop: {name: productsList.women[2].name, price: productsList.women[2].price, quantity:1}
  },
  {
    name: "Add To Cart", 
    prop: {name: productsList.women[3].name, price: productsList.women[3].price, quantity:1}
  },
  {
    name: "Category Selected",
    prop: {selectedCategory: categoriesList[0].label}
  },
  {
    name: "Product Search",
    prop: {search_text: "Sample"}
  },
  {
    name: "View Product",
    prop: {name: productsList.women[0].name, description: productsList.women[0].description, price: productsList.women[0].price}
  },
  {
    name: "View Product",
    prop: {name: productsList.women[1].name, description: productsList.women[1].description, price: productsList.women[1].price}
  },
  {
    name: "View Product",
    prop: {name: productsList.women[2].name, description: productsList.women[2].description, price: productsList.women[3].price}
  },
  {
    name: "Add To Cart", 
    prop: {name: productsList.women[0].name, price: productsList.women[0].price, quantity:1}
  },
  {
    name: "Add To Cart", 
    prop: {name: productsList.women[2].name, price: productsList.women[2].price, quantity:1}
  },
  {
    name: "Add To Cart", 
    prop: {name: productsList.women[3].name, price: productsList.women[3].price, quantity:1}
  },
  {
    name: "Category Selected",
    prop: {selectedCategory: categoriesList[0].label}
  },
  {
    name: "Product Search",
    prop: {search_text: "Sample"}
  },
  {
    name: "View Product",
    prop: {name: productsList.women[0].name, description: productsList.women[0].description, price: productsList.women[0].price}
  },
  {
    name: "View Product",
    prop: {name: productsList.women[1].name, description: productsList.women[1].description, price: productsList.women[1].price}
  },
  {
    name: "View Product",
    prop: {name: productsList.women[2].name, description: productsList.women[2].description, price: productsList.women[3].price}
  },
  {
    name: "View Product",
    prop: {name: productsList.women[0].name, description: productsList.women[0].description, price: productsList.women[0].price}
  },
  {
    name: "View Product",
    prop: {name: productsList.women[1].name, description: productsList.women[1].description, price: productsList.women[1].price}
  },
  {
    name: "View Product",
    prop: {name: productsList.women[2].name, description: productsList.women[2].description, price: productsList.women[3].price}
  },
  {
    name: "Add To Cart", 
    prop: {name: productsList.women[0].name, price: productsList.women[0].price, quantity:1}
  },
  {
    name: "Add To Cart", 
    prop: {name: productsList.women[2].name, price: productsList.women[2].price, quantity:1}
  },
  {
    name: "Add To Cart", 
    prop: {name: productsList.women[3].name, price: productsList.women[3].price, quantity:1}
  },
  {
    name: "Category Selected",
    prop: {selectedCategory: categoriesList[0].label}
  },
  {
    name: "Product Search",
    prop: {search_text: "Sample"}
  },
  {
    name: "View Product",
    prop: {name: productsList.men[0].name, description: productsList.men[0].description, price: productsList.men[0].price}
  },
  {
    name: "View Product",
    prop: {name: productsList.men[1].name, description: productsList.men[1].description, price: productsList.men[1].price}
  },
  {
    name: "View Product",
    prop: {name: productsList.men[2].name, description: productsList.men[2].description, price: productsList.men[3].price}
  },
  {
    name: "Add To Cart", 
    prop: {name: productsList.men[0].name, price: productsList.men[0].price, quantity:1}
  },
  {
    name: "Add To Cart", 
    prop: {name: productsList.men[2].name, price: productsList.men[2].price, quantity:1}
  },
  {
    name: "Add To Cart", 
    prop: {name: productsList.men[3].name, price: productsList.men[3].price, quantity:1}
  },
  {
    name: "Category Selected",
    prop: {selectedCategory: categoriesList[0].label}
  },
  {
    name: "Product Search",
    prop: {search_text: "Sample"}
  },
  {
    name: "View Product",
    prop: {name: productsList.women[0].name, description: productsList.women[0].description, price: productsList.women[0].price}
  },
  {
    name: "View Product",
    prop: {name: productsList.women[1].name, description: productsList.women[1].description, price: productsList.women[1].price}
  },
  {
    name: "View Product",
    prop: {name: productsList.women[2].name, description: productsList.women[2].description, price: productsList.women[3].price}
  },
  {
    name: "Add To Cart", 
    prop: {name: productsList.women[0].name, price: productsList.women[0].price, quantity:1}
  },
  {
    name: "Add To Cart", 
    prop: {name: productsList.women[2].name, price: productsList.women[2].price, quantity:1}
  },
  {
    name: "Add To Cart", 
    prop: {name: productsList.women[3].name, price: productsList.women[3].price, quantity:1}
  },
  {
    name: "Category Selected",
    prop: {selectedCategory: categoriesList[1].label}
  },
  {
    name: "Product Search",
    prop: {search_text: "test"}
  },
  {
    name: "View Product",
    prop: {name: productsList.women[0].name, description: productsList.women[0].description, price: productsList.women[0].price}
  },
  {
    name: "View Product",
    prop: {name: productsList.women[1].name, description: productsList.women[1].description, price: productsList.women[1].price}
  },
  {
    name: "View Product",
    prop: {name: productsList.women[2].name, description: productsList.women[2].description, price: productsList.women[3].price}
  },
  {
    name: "Add To Cart", 
    prop: {name: productsList.women[0].name, price: productsList.women[0].price, quantity:1}
  },
  {
    name: "Add To Cart", 
    prop: {name: productsList.women[2].name, price: productsList.women[2].price, quantity:1}
  },
  {
    name: "Add To Cart", 
    prop: {name: productsList.women[3].name, price: productsList.women[3].price, quantity:1}
  },
  {
    name: "Category Selected",
    prop: {selectedCategory: categoriesList[0].label}
  },
  {
    name: "Product Search",
    prop: {search_text: "Sample"}
  },
  {
    name: "View Product",
    prop: {name: productsList.women[0].name, description: productsList.women[0].description, price: productsList.women[0].price}
  },
  {
    name: "View Product",
    prop: {name: productsList.women[1].name, description: productsList.women[1].description, price: productsList.women[1].price}
  },
  {
    name: "View Product",
    prop: {name: productsList.women[2].name, description: productsList.women[2].description, price: productsList.women[3].price}
  },
  {
    name: "Add To Cart", 
    prop: {name: productsList.women[0].name, price: productsList.women[0].price, quantity:1}
  },
  {
    name: "Add To Cart", 
    prop: {name: productsList.women[2].name, price: productsList.women[2].price, quantity:1}
  },
  {
    name: "Add To Cart", 
    prop: {name: productsList.women[3].name, price: productsList.women[3].price, quantity:1}
  },
  {
    name: "Category Selected",
    prop: {selectedCategory: categoriesList[0].label}
  },
  {
    name: "Product Search",
    prop: {search_text: "Sample"}
  },
  {
    name: "View Product",
    prop: {name: productsList.women[0].name, description: productsList.women[0].description, price: productsList.women[0].price}
  },
  {
    name: "View Product",
    prop: {name: productsList.women[1].name, description: productsList.women[1].description, price: productsList.women[1].price}
  },
  {
    name: "View Product",
    prop: {name: productsList.women[2].name, description: productsList.women[2].description, price: productsList.women[3].price}
  },
  {
    name: "Add To Cart", 
    prop: {name: productsList.women[0].name, price: productsList.women[0].price, quantity:1}
  },
  {
    name: "Add To Cart", 
    prop: {name: productsList.women[2].name, price: productsList.women[2].price, quantity:1}
  },
  {
    name: "Add To Cart", 
    prop: {name: productsList.women[3].name, price: productsList.women[3].price, quantity:1}
  },
  {
    name: "Category Selected",
    prop: {selectedCategory: categoriesList[0].label}
  },
  {
    name: "Product Search",
    prop: {search_text: "Sample"}
  },
  {
    name: "View Product",
    prop: {name: productsList.women[0].name, description: productsList.women[0].description, price: productsList.women[0].price}
  },
  {
    name: "View Product",
    prop: {name: productsList.women[1].name, description: productsList.women[1].description, price: productsList.women[1].price}
  },
  {
    name: "View Product",
    prop: {name: productsList.women[2].name, description: productsList.women[2].description, price: productsList.women[3].price}
  },
  {
    name: "View Product",
    prop: {name: productsList.women[0].name, description: productsList.women[0].description, price: productsList.women[0].price}
  },
  {
    name: "View Product",
    prop: {name: productsList.women[1].name, description: productsList.women[1].description, price: productsList.women[1].price}
  },
  {
    name: "View Product",
    prop: {name: productsList.women[2].name, description: productsList.women[2].description, price: productsList.women[3].price}
  },
  {
    name: "Add To Cart", 
    prop: {name: productsList.women[0].name, price: productsList.women[0].price, quantity:1}
  },
  {
    name: "Add To Cart", 
    prop: {name: productsList.women[2].name, price: productsList.women[2].price, quantity:1}
  },
  {
    name: "Add To Cart", 
    prop: {name: productsList.women[3].name, price: productsList.women[3].price, quantity:1}
  },
  {
    name: "Category Selected",
    prop: {selectedCategory: categoriesList[0].label}
  },
  {
    name: "Product Search",
    prop: {search_text: "Sample"}
  }
]