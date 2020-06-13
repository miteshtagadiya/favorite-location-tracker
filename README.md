# Favourite Location Tracker

Project is a web app that lets a user make a list of favorite locations. Users can add a favorite location to the list by selecting a location from the map and adding the details of that location.
User can select the favorite location list of cards and can see the distance between his/her current location and favorite location.

##

The app is developed with ReactJs. Authentication is done by firebase and for location google maps are used.
To render the map [react-google-maps](https://tomchentw.github.io/react-google-maps/) library used. 

## Installation

To get started developing right away:

* Install all project dependencies with `npm install`
* Start the development server with `npm start`

Type a command to directly run the development server:
```
npm install && npm start
```

## App Structure
```bash
├── README.md - This file.
├── package.json # npm package manager file.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # Index file
└── src
      ├── components
      |     ├── App # container components
      |     |    ├── Home
      |     |    |    ├── Home.jsx #Home page contains maps and sidebar
      |     |    |    ├── Home.sass #Home sass file contains styles
      |     |    ├── Maps # Contains Maps
      |     |    |    ├── Map.jsx #Map component that shows locations
      |     |    |    ├── SearchMap.jsx #Component to select the location from map
      |     |    ├── SignIn
      |     |    |    ├── SignIn.jsx #Login component
      |     |    ├── SignUp
      |     |    |    ├── SignUp.jsx #SignUp component
      |     ├── Ui #Contains reusable ui components
      |     |    ├── Card
      |     |    |    ├── Card.jsx #Card component
      |     |    |    ├── MapCard.jsx #MapCard component to show the card on map
      |     |    |    ├── Card.sass #Card sass file contains styles
      |     |    ├── Header
      |     |    |    ├── Header.jsx #Header component
      |     |    ├── Modal
      |     |    |    ├── Modal.jsx #Modal component to add new location
      |     |    |    ├── Modal.sass #Modal component's styles
      |     |    ├── SignUp
      |     |    |    ├── SignUp.jsx #SignUp component
      ├── helpers
      |     ├── auth.js # contains firebase login, signup, logout helper methods
      ├── services
      |     ├── firebase.js # firebase config file
      ├── utils
      |     ├── utils.js # contains commom functions that are used in the app
      ├── App.jsx # Contains authenticated routes
      ├── index.css # Global styles. You probably won't need to change anything here.
      └── index.js # Index file
```

## Usage


* Register in the app if you have not registered else log in to the app by registered email and password.


* Add your favorite location by click on Add New Location Button

    * Type location name in the search box in the map then press enter
    * Add you favorite location name
    * Add details description of that place 
    * Click on Add Button and location is added to the list.

* See the distance between your current location and favorite location.
    * Click on any favorite location that you what to see the distance between your current location and that location.
    * New Card is displayed on the map that shows details of selected card and distance.

