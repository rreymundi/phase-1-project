# Phase 1 Project: EZ TV

## App Requirements 

- Design and architect a Single Page Application (SPA)
- App must be a HTML/CSS/JS frontend that accesses data from a public API
- App must run on a single page
- App must at least 3 unique event-listeners that enable interactivity
- Implement at least one instance of array iteration
- Keep code DRY by utilizing functions to abstract repetitive code

## Introduction

There are way too many TV shows to keep track of these days. With so much content available at any given time, I wanted to create a simple app that allows folks to keep track of what they're watching or interested in watching.

EZ TV is a single page app that allows you to search for TV shows and keep track of them by adding them to a watch list. Once you've watched a show, you can simply remove it from your list!

## Getting Started

Type in whatever show or keyword you'd like to search for in the "Search" bar and click "Search". This will generate list of search results displayed as cards.

Once you've spotted a show you'd like to add to your watch list, simply click the "❤️" button. This will create a copy of the card which will be added to the "My Watch List" section of the page.

To remove a show from your watch list, simply click the "✖️" button on that show's card. EZ, right?

## App Functionality

EZ TV is a single page application that accesses and displays search results fetched using the [TV Maze API](https://www.tvmaze.com/api).

Upon load, the page displays a header showing the app name, a "search" bar which can be used to search for TV shows, and footer which contains a button to toggle between ligh/dark mode.

**Accessing public API data**
The "search" bar is accessing the "https://api.tvmaze.com/search/shows" endpoint to find show information. In order to account for search queries, I've set up a "url" variable for "https://api.tvmaze.com/search/shows" and a "searchQuery" variable for "e.target[0].value" which I then interpolated into my GET URL as "${url}?q=${searchQuery}".

**App functionality**

The *darkMode()* function has two event listeners. Listener #1 is for "load" and it checks the local storage and sets the theme as "light" if none has been selected. Listener #2 is for "click" and it works on the "theme selector" button to toggle between light and dark mode. I was able to set up this functionality by following Brian Munoz's guide from [Codinglead](https://codinglead.co/javascript/add-dark-mode-to-your-website).

The *formSubmit()* function has an event listener for "submit" which allows for submitting a GET request to the API. The returning results are filtered using the filterResults() function and rendered using the renderResults() function.

The *saveButton()* and *deleteButton()* functions each have an event listener for "click", which allows to save or remove a TV show from the "My Watch List" section of the page.

**Thanks for reading!**