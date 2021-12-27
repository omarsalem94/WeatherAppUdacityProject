/* Global Variables */
// api key received from registering in website,, we use it to access and be able to retrieve data
const personalApiKey = "6293efaee167ab0d771b5ddbf3cc2747";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
const feelings = document.getElementById("feelings");
const generate = document.getElementById("generate");
//add event listener when clicking on generate button
generate.addEventListener("click", async ()=> {
    // get the value of the users entries in zip code
    const zipCode = document.getElementById("zip").value;
    //url to get the weather info by using zip codes for the united states! 
    // from api documentation on website ,, add "&units=metric" to get the temp in celsius
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${personalApiKey}&units=metric`;
    try {
        //assign const to save response after fetching URL
        const res = await fetch(url);
        //jason to return data is a string
        const data = await res.json();
        console.log(data);
        // save the temp in a const to use it later 
        const temp = data.main.temp;
        // POST method to save data in server.js in a path we set
        await fetch ('/addWeatherData', {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            // body data type must match "Content-Type" header
            body: JSON.stringify({
                date: newDate,
                temp: temp,
                feelings: feelings.value
            })
        })
        // GET method to retrieve data from server.js
        const response = await fetch ('/sendWeatherData')
        const completeData = await response.json();
        // update UI by adding directly to inner html
        document.getElementById('date').innerHTML = `Date is: ${completeData.date}`;
        document.getElementById('temp').innerHTML = `Temp is: ${completeData.temp}C`;
        document.getElementById('content').innerHTML = `Content: ${completeData.feelings}`;
    } catch(err) {
        console.error('error', err);
        }
});