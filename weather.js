let sButton = $("#sButton");
const sCity = $("#user-input");
let cRequest = "";
const apiKey = "67f11922d4616f0141b883c13b7d07f7";

//https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&units=imperial&appid={your api key}

$(document).ready(function() {
    sButton.on("click",function(){
        getInput();
        cCity();
        console.log(cRequest)
        currDay();
        forecast();
        
        
    });
    
    

    //Get user input function on Click and store to Memory
    function getInput(){
        let city = sCity.val();
        localStorage.setItem("City", city)
        console.log(city);
            
    }
    function cCity(){
        let city = localStorage.getItem("City")
        cRequest = city;
        
    }

    function currDay() {
        var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cRequest}&units=imperial&appid=67f11922d4616f0141b883c13b7d07f7`;
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
                   
          let wData = response;
          let currObj ={};
          currObj.img = wData.weather[0].icon
          currObj.weather= wData.weather[0].description
          currObj["Temperature in Farhenheit"] = wData.main.temp
          currObj["Wind Speed"] = wData.wind.speed
          currObj.humidity=wData.main.humidity

          console.log(currObj)
          $("#today").empty();
          for (let [key, value] of Object.entries(currObj)) {
            if (currObj.key === img){
              console.log(key)
              var imgUrl = `http://openweathermap.org/img/wn/${currObj.img}@2x.png`
              var img = $('<img id="wImg">')
              img.attr("src", imgUrl)
              $("#today").append(img)
            } else {
              var tData = $("<div>").text(`${key}: ${value}`)
              console.log(tData)
              $("#today").append(tData)
              console.log(`${key}: ${value}`);

            }
            
          }
          showCity();
          console.log(response)
          function showCity(){
            var city = response.name
            var countryCode = response.sys.country
            $("#cCity").text(city +"  "+ countryCode)
            console.log(city)
          }
          getDt()

          function getDt(){
            var tOffset = (response.timezone)/60
            console.log(tOffset)
            m1 = moment().utcOffset(tOffset)
            var date = $('<div id="date">').text(m1.format("[Today is] dddd LL"))
            var time = $('<div id="date">').text(m1.format("[Current time is] LTS"))
            $("#lclTime").empty();
            //$("#lclTime").text(m1.toString())
            $("#lclTime").append(date)
            $("#lclTime").append(time)
            


          }
          




        });
      };



      



      

      function forecast(){

        var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cRequest}&units=imperial&appid=67f11922d4616f0141b883c13b7d07f7`;
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          
          var days = response;
          console.log(days)
          var tOffset = (days.city.timezone)/60
          console.log(tOffset)
          m1 = moment().utcOffset(tOffset).startOf("day")
          console.log(m1.toString())
          m2 = m1.add(1,'d')
          console.log(m2.toString())
          for (let i=0; i<5; i++){
            m3 = m2.add(i,'d')
            console.log(m3.toString())
            if (m3.isSame(response.list[i].dt_txt)){
            console.log(m3.toString());
            
            
          }else {
            console.log("Not here")
          }
        }

          //Set number of forcast days starting from m1+1day
          //m=moment()
          //m1 = moment().utcOffset(1)
          //console.log(m.format("LL").toString())
          //console.log(m1.toString())
          




      })

    }
      












    
    
    
    

})

