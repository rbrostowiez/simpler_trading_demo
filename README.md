# Simpler Trading Demo App

## Overview
This is a demo application that utilizes the data provided by Simpler Trading and generates additional data in the same
format.  The requirements are listed below, but have also changed since this project began.

Currently, the application will generate 1 year of data for a random number of fake companies ad append those to the
provided data set.  The UI is mostly unchanged except date and volume range filters have been added and this ReadMe is
now available under the About page.

All data is retrieved via separate HTTP requests and a full React + Flux implementation is in place.  I have added a few
libraries to accommodate the new controls.  Session storage for search filters is not implemented, however at this time,
it would be fairly trivial as the Search is managed through a SecuritySearchFilter object that is shared between client
and server side code.  I have even added a middleware to manage this, but implementing it through all requests is too
much effort at this time.

**NOTE:** The generated security data is created when the application initializes, so restarting will change the app and may
result in 404's for no-longer-existent securities.

## Thoughts and Ideas
I felt a fully functional application with full round trips and proper expression of the internal architecture would be
more important than some of the layout implementation.  I put about 18 hours of effort into this set of revisions and
saved a branch of the original submission along with these changes before I merged into master.  I dedicated some time
to documenting all major functions and updating this ReadMe as well.  In total, 35 files were modified and 1212 additions
/ 348 deletions were performed as a part of these changes(excluding the package lockfile).

Link to Diff: https://github.com/rbrostowiez/simpler_trading_demo/compare/original-submission...filter-implementation


## Process for the revisions
In order to properly implement some of the filters; I needed more data.  I wrote up a few functions to generate security
data and added that to the Express app's initialization.  From there, I re-wired the React app to consume the bulk of
data via HTTP requests.  I migrated all logic to the server-side and made the data objects shared between server and
client side.  Once that was implemented, components were created to support the filtering and the round trips
and server-side support were implemented completely.

The current autosuggest and datepicker components were not the first used; I ran in to a few compatibility issues with
 React versions before I found some that both were compatible and supported my requirements.

## Requirements
> Leverage a JavaScript library to build a sample web application that consumes the attached json object.
- Displays information in a readable format by symbol
- Filterable
- Minimum two navigable pages
- Caches selected filters

## Installation and Use
After checking out the repository, you will just need to execute `npm install` then `npm start`.  The start script will
execute 2 commands; one will build the app bundle via webpack,  the other will start the server on port 3000.  You can
also use the environment variable `PORT=xxx npm start` to override the port.

The site should be available via: http://localhost:3000/

## Components
This application is written with the current Node.js LTS version(8.9) and uses Babel to provide ES6/7 syntax within the
Node.js runtime as well as client-side.  Express is used to serve the basic assets and also has single endpoint which
will output the provided JSON data, although it is not consumed by the client-side application at this time.

The client-side implementation is written using React + Flux and leverages the Bootstrap 4 CDN CSS file.  It uses
webpack to apply ES6/JSX translations for bundling the client-side application.

### Libraries Used
- Express
- Babel
- Webpack
- Flux
- Moment
- React
- React Router
- Underscore
- Shrinkwrap
- Concurrently
- Bluebird(for filesystem promises)
- uuid
- body-parser - Middleware for express
- react-autosuggest - Used in the Symbol lokup
- react-datepicker - Datepicker component
- react-markdown - Used to display this file in the browser
- whatwg-fetch - Used for performing HTTP requests in the react application

## Provided JSON
~~~javascript
[
    {
        "Meta Data": {
            "1. Information": "Weekly Adjusted Prices and Volumes",
            "2. Symbol": "MSFT",
            "3. Last Refreshed": "2017-11-20",
            "4. Time Zone": "US/Eastern"
        },
        "Weekly Adjusted Time Series": {
            "2017-11-20": {
                "1. open": "82.4000",
                "2. high": "82.5900",
                "3. low": "82.2500",
                "4. close": "82.5300",
                "5. adjusted close": "82.5300",
                "6. volume": "16072495",
                "7. dividend amount": "0.0000"
            },
            "2017-11-17": {
                "1. open": "83.6600",
                "2. high": "84.1000",
                "3. low": "82.2400",
                "4. close": "82.4000",
                "5. adjusted close": "82.4000",
                "6. volume": "94156894",
                "7. dividend amount": "0.4200"
            },
            "2017-11-10": {
                "1. open": "84.2000",
                "2. high": "84.9000",
                "3. low": "82.9000",
                "4. close": "83.8700",
                "5. adjusted close": "83.4476",
                "6. volume": "94491207",
                "7. dividend amount": "0.0000"
            },
            "2017-11-03": {
                "1. open": "83.7000",
                "2. high": "84.5400",
                "3. low": "82.8800",
                "4. close": "84.1400",
                "5. adjusted close": "83.7163",
                "6. volume": "121452467",
                "7. dividend amount": "0.0000"
            },
            "2017-10-27": {
                "1. open": "78.9900",
                "2. high": "86.2000",
                "3. low": "78.0100",
                "4. close": "83.8100",
                "5. adjusted close": "83.3879",
                "6. volume": "156867173",
                "7. dividend amount": "0.0000"
            }
        }
    },
    {
        "Meta Data": {
            "1. Information": "Weekly Adjusted Prices and Volumes",
            "2. Symbol": "GOOG",
            "3. Last Refreshed": "2017-11-20",
            "4. Time Zone": "US/Eastern"
        },
        "Weekly Adjusted Time Series": {
            "2017-03-03": {
                "1. open": "64.5400",
                "2. high": "64.9900",
                "3. low": "63.6200",
                "4. close": "64.2500",
                "5. adjusted close": "63.2325",
                "6. volume": "108727793",
                "7. dividend amount": "0.0000"
            },
            "2017-02-24": {
                "1. open": "64.6100",
                "2. high": "64.9500",
                "3. low": "64.0500",
                "4. close": "64.6200",
                "5. adjusted close": "63.5966",
                "6. volume": "82018448",
                "7. dividend amount": "0.0000"
            },
            "2017-02-17": {
                "1. open": "64.2400",
                "2. high": "65.2400",
                "3. low": "64.0200",
                "4. close": "64.6200",
                "5. adjusted close": "63.5966",
                "6. volume": "104828847",
                "7. dividend amount": "0.3900"
            },
            "2017-02-10": {
                "1. open": "63.5000",
                "2. high": "64.4400",
                "3. low": "63.1400",
                "4. close": "64.0000",
                "5. adjusted close": "62.6083",
                "6. volume": "98985116",
                "7. dividend amount": "0.0000"
            },
            "2017-02-03": {
                "1. open": "65.6900",
                "2. high": "65.7900",
                "3. low": "62.7500",
                "4. close": "63.6800",
                "5. adjusted close": "62.2952",
                "6. volume": "172722294",
                "7. dividend amount": "0.0000"
            }
        }
    }
]
~~~
