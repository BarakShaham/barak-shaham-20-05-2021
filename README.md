# Barak-Shaham-20-05-2021  
  
## WEATHER APP  
  
  The app uses "AccuWeather" API to display the weather in a given city. It has 2 main screens:  
  1. Weather:  
     - Shows the city's current conditions and the upcoming 5-day forecast 
     - At the top cetner, there's a search bar to look for a different city.   
       Logic: uses debounce search to minimize the API calls.  
     - Beneath the current condition, there's a add/remove from favorites. (if a city is in favorites -> show remove button, and vice versa)
     - The Nav header consists of a favorites button which navigates to favorites screen.  
  2. Favorites:  
     - Shows a list of all saved cities, displaying thier current condition.  
     - Clicking on a city will navigate to weather screen, displaying that city's weahter.
     (All favorites are saved on the device's async storage)  
       
       ### Bonus: 
       1. Uses react-native location to get the current location and present it's weather.  
       2. Dark mode toggle at the top left corner on weather screen (implemented using styled components).  
       3. Celcius/ Farenheit toggle button at the top right corner (refetching data with a differnt query param)
     
#### Server state management is done using "react-query"  
#### App state managemnt is done using "recoil"  
