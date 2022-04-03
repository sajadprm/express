const form=document.querySelector("form");
const search=document.querySelector("input");
const locationPlace=document.querySelector("#locationPlace");
const temperaturePlace=document.querySelector("#temperaturePlace");

form.addEventListener("submit",function(event){

    event.preventDefault();
    
    const location =search.value;

    locationPlace.innerHTML=`Searching For ${location} Weather`;
    temperaturePlace.innerHTML="";
    document.getElementById("icon").src="";


    fetch(`${window.location.href}/${location}`).then((response)=>{
             if(response.ok)
             {
                    response.json().then((result)=>{
                    locationPlace.innerHTML=`The ${location} Weather Is : ${result.current.weather_descriptions[0]}`;
                    temperaturePlace.innerHTML=`Temperature :  ${result.current.temperature}`;
                    document.getElementById("icon").src=`${result.current.weather_icons[0]}`
                    
                });
             }else
             {
                locationPlace.innerHTML=`The ${location} Weather Is : Access Denied ...:(`;
                 }
       
    });
});
