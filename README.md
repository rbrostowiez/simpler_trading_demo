# Simpler Trading Demo App

## Overview
This is a demo application that utilizes the data provided by Simpler Trading.  The requirements are listed below, but I
did not fully implement all requirements.  Filters were not implemented at all, due to the requirement being too large
and not well defined for a demo application(I capped this at 8hrs and spent about 7.5hrs total). Instead I mocked out
some of the filters -that could be used- from the format of the provided data and left them disabled w/ the current
implicit filters set.

The implementation within React has 3 endpoints, the root or home endpoint which is a mocked up search of the securities
available. The second endpoint is a details page for the specific securities, which will contain totals listed on the
home page in addition to a table of each interval of data available for the security(per the implicit filters).  The 3rd
endpoint is a simple About page that directs the user to this file.

## Requirements
> Leverage a JavaScript library to build a sample web application that consumes the attached json object.
- Displays information in a readable format by symbol
- Filterable
- Minimum two navigable pages
- Caches selected filters

## Installation & Use
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

## Thoughts and Ideas
I limited myself to 8hrs for this demo application, and put in about 7.5hrs total, including documentation.

I stopped at that point because implementing functioning filters would've consumed more time than I had remaining
(excluding what I had already allotted for documentation).  Persisting the current filters for later use is just a case
of serialization to cookies and/or local storage coupled with deserialization steps upon the React App's initialization.

React + Flux is amazing for supporting an application that utilizes dynamic filters as all filters can update the state
of all other components on the page in real-time.  This quality of the libraries comes with a cost of longer development
times, especially when discovery is needed for specifying the nature of the interconnectedness of the data.

Beyond filters; I really wanted to implement a candlestick chart for the details page of each security.  I did look
into this and determined the D3 library would be ideal when coupled with React + Flux, but due do some complexities of
using D3 with React, I decided not to pursue this course of action.  That being said, it would just require a bit of
code-shimming via a mock-DOM instance for D3 which has been done already by othe developers, and would result in
high-speed, dynamic graphs and charts.

Other items I'd like to add would be to have actual transfer of data from server to client-side.  I began work on this,
but felt the time would be wasted, since the dataset was very limited.  I would like to add this and put a small bit of
API in front of the data so our Stores in client-side code and directly consume an API as opposed to internalizing a
small bit of JSON.

I do have some regrets; I began a little too ambitiously and needed to rein in the implementation; too much time was
spent on D3 charts, and along those lines I decided to cut out filter functionality.  I also wired up express to handle
serving static assets and a JSON API when ultimately it served two static files and no API endpoints.  Granted, these
are valuable components for a more robust implementation, but they serve me very little for the demo as-is.

### TODOs
I went through my code and added several TODO items.  Most modern editors scan for them, and you can see code-specific
items I feel need to be addressed beyond the minimum needed for this implementation.


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