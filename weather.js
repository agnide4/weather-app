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

          uvIndex()
          function uvIndex(){
            var uvUrl = `http://api.openweathermap.org/data/2.5/uvi?appid=67f11922d4616f0141b883c13b7d07f7&lat=${response.coord.lat}&lon=${response.coord.lon}`
            $.ajax({
              url: uvUrl,
              method: "GET"
            }).then(function(uvResponse){
              console.log(uvResponse)
              var uvData = $("<div>").text("UV Index: " + uvResponse.value)
              uvData.attr({id:'vIndex', title:''})
              
              $("#today").append(uvData)
              let uvColor = parseInt(uvResponse.value)
              console.log(uvColor)
              console.log(uvData)
              if (0 <= uvColor && uvColor <=2){
                $("#vIndex").css("color", "green")
                $("#vIndex").tooltip({
                  content: "Low"
                })}
                    else if (3 <= uvColor && uvColor <=5){
                    $("#vIndex").css( "color", "yellow")
                    $("#vIndex").tooltip({
                    content: "Moderate",
                    track:  true

                })
              }else if (6 <= uvColor && uvColor <=7){
                $("#vIndex").css( "color", "orange")
                $("#vIndex").tooltip({
                  content: "High",
                  track:  true

              })


              }else if (uvColor >=8  && uvColor <=10){
                $("#vIndex").css("color", "red")
                console.log("here")
                $("#vIndex").tooltip({
                  content: "Very High",
                  track:  true

              })


              } else{
                $("#vIndex").css("color", "violet")
                
                $("#vIndex").tooltip({
                  content: "Extreme",
                  track:  true

              })
              }



            }) 
          }
          showCity();
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
          
          
          $("#fCard").empty()
          for (let i=7; i<41; i+=8){
            
            var wCard = $("<card class='wCard'>");
            var imgUrl = `http://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png`
            var img = $("<img>").attr("src", imgUrl)
            var y = response.list[i].dt_txt
            var date = $("<div>").text(moment(`${y}`, 'YYYY-MM-DD hh:mm:ss').format("dddd LL"))
            var humidity = $("<div>").text("Humidity: " + response.list[i].main.humidity)
            var temp = $("<div>").text("Temperature: " + response.list[i].main.temp)
            wCard.append(img)
            wCard.append(date)
            wCard.append(humidity)
            wCard.append(temp)
            $("#fCard").append(wCard)
            
          }
        })
      
        

          //Set number of forcast days starting from m1+1day
          //m=moment()
          //m1 = moment().utcOffset(1)
          //console.log(m.format("LL").toString())
      }    //console.log(m1.toString())
          




      

    
})

