# barak-shaham-20-05-2021  
  
## WEATHER APP  
  
  The app uses "AccuWeather" API to display the weather in a given city. It has 2 main screens:  
  1. Weather:  
     - Shows the city's current conditions and the upcoming 5-day forecast (TLV city by default).  
     - At the top, there's a search bar to look for a different city. 
       Logic: uses debounce search to minimize the API calls.  
     - Beneath the current condition, there's a add/remove from favorites. (if a city is in favorites -> show remove button, and vice versa)
     - The Nav header consists of a favorites button which navigates to favorites screen.  
  2. Favorites:  
     - Shows a list of all saved cities, displaying thier current condition.  
     - Clicking on a city will navigate to weather screen, displaying that city's weahter.
     (All favorites are saved on the device's async storage)  
     
#### Server state management is done using "react-query"  
#### App state managemnt is done using "recoil"  
