const axios=require("axios");
// const chalk=require("chalk");
const accessKey="edbc19987367b3aa15b7fd18df27bbb6";
const apiAddress="http://api.weatherstack.com/current";

const getWeather=async(city)=>{
   const data= await callApi(city);
//    showResult(data);
      return data;

}
const callApi = async(city="Tehran")=>
{
    const endPoint=`${apiAddress}?access_key=${accessKey}&query=${city}`;
    const response= await axios.get(endPoint)
        
    
    return response.data;

}
const showResult=(weather)=>{
    console.log(chalk.blue(weather.location.name));
    console.log(chalk.red(weather.current.temperature));
}
const objExport={
    getWeather
}
module.exports=objExport