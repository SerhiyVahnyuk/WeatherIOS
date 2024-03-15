import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, ScrollView} from 'react-native';
import ForecastCard from './forecast';
import * as Location from 'expo-location';
import { useState } from 'react';

const TOKEN = "17228a9591a8363d7ebd196857d093a5" 

let dd = []
let swt = 0

const weatherImages = {
  "Clouds":"https://static.vecteezy.com/system/resources/previews/014/063/252/original/3d-clouds-fluffy-clouds-in-the-sky-for-decorating-cartoon-scenes-png.png",
  "Rain":"https://i.ibb.co/6J5Gsty/Rainy-removebg-preview-1.png",
  "Clear":"https://cdn2.iconfinder.com/data/icons/hobbies-misc-1/512/weather___sun_sunny_solar_forecast_day_season_heat_hot.png",
  "Snow":"https://static.vecteezy.com/system/resources/previews/024/683/829/original/3d-icon-cloudy-snow-weather-forecast-illustration-concept-icon-render-free-png.png"
}
let i = 0


export default function App() {

  const [daysLoop, setDaysLoop] = useState([])
  const [switch1, setSwitch1] = useState()
  const [switch2, setSwitch2] = useState()
  const [currentTemp, setCurrentTemp] = useState()
  const [currentCity, setCurrentCity] = useState()
  const [currentWind, setCurrentWind] = useState()
  const [currentHumidity, setCurrentHumidity] = useState()
  

  async function getForecast(){
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status == "granted"){
      let location = await Location.getCurrentPositionAsync()
      let lat = location["coords"]["latitude"]
      let lon = location["coords"]["longitude"]
      let req = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${TOKEN}`
      if(swt == 0){
        console.log(1)
        swt = 1
        fetch(req).then((response)=>{
          return response.json()
        }).then((data)=>{
          setCurrentTemp(data["list"][0]["main"]["temp"])
          setCurrentCity(data["city"]["name"])
          setCurrentWind(data["list"][0]["wind"]["speed"])
          setCurrentHumidity(data["list"][0]["main"]["humidity"])
          setSwitch1(data["list"][0]["weather"][0]["main"])
          let daysLoopArr = []
          while (i <= 32){
            let date = data["list"][i]["dt_txt"]
            let temperature = data["list"][i]["main"]["temp"]
            let weather = data["list"][i]["weather"][0]["main"]
            let weatherImage
            if (weather in weatherImages){
              weatherImage = weatherImages[weather]
            }
            let finalResult = [date, temperature, weatherImage]
            daysLoopArr.push(finalResult)
            console.log('The final result is:', finalResult)
            i += 8
          }
          setDaysLoop(daysLoopArr)
          dd = daysLoopArr ? daysLoopArr.length > 0:
          setSwitch2("lll")
        })
      }
    }
  }

  getForecast()
  
  return (
    <View style={styles.container}>
      <ImageBackground source={{uri: 'https://i.ibb.co/HDJ3RqC/i-Phone-14-15-Pro-Max-2.png'}} resizeMode="cover" style={styles.imageStyle}>

        {/* Кнопка меню */}
      <View style={styles.buttonMenu}>
        <TouchableOpacity >
          <Image style={styles.imageMenu} source={{uri: 'https://i.ibb.co/CBkpDD4/menu-1.png'}}/> 
        </TouchableOpacity>
      </View>

      {/* Заголовок + фото погоди */}
      <Text style={styles.textDnipro}> {currentCity} </Text>
      <View style={styles.containerImage}>
        { switch1 && 
          <Image style={styles.imageWeather} source={{uri: weatherImages[switch1]}}/>
        }
      </View>
      <Text style={styles.textTemp}> {Math.round(Number(currentTemp) - 273)}°с </Text>

      {/* Інформація о вологості + швидкості вітру */}
      <View style={styles.containerStyle}>
        <View style={styles.containerStyle}>
          <Image style={styles.imageSmall} source={{uri: 'https://i.ibb.co/3MPmzPd/wind-1-1.png'}}/>
          <Text style={styles.textStyle}> {Math.round(Number(currentWind)*3.6)}km/h </Text>
        </View>
        <Text>             </Text>
        <View style={styles.containerStyle}>
          <Image style={styles.imageSmall} source={{uri: 'https://i.ibb.co/x6pfR26/humidity-1.png'}}/>
          <Text style={styles.textStyle}> {Math.round(Number(currentHumidity))}% </Text>
        </View>

      </View>

      {/* Прогноз на 5 годин */}
      <View style={styles.containerStyle}> 
        <Image style={styles.imageSmall} source={{uri: 'https://i.ibb.co/hZdrkLB/time-1.png'}}/>
        <Text style={styles.textStyle}> Weather forecast for next 5 days: </Text>
      </View>
      {daysLoop.length > 0 &&
      <ScrollView horizontal>
      <View style={{marginBottom:300, display: 'flex', flexDirection: 'row',}}>
          <ForecastCard date = {daysLoop[0][0]} temperature = {Math.round(daysLoop[0][1] - 273)} imageurl={daysLoop[0][2]}/>
          <ForecastCard date = {daysLoop[1][0]} temperature = {Math.round(daysLoop[1][1] - 273)} imageurl={daysLoop[1][2]}/>
          <ForecastCard date = {daysLoop[2][0]} temperature = {Math.round(daysLoop[2][1] - 273)} imageurl={daysLoop[2][2]}/>
          <ForecastCard date = {daysLoop[3][0]} temperature = {Math.round(daysLoop[3][1] - 273)} imageurl={daysLoop[3][2]}/>
          <ForecastCard date = {daysLoop[4][0]} temperature = {Math.round(daysLoop[4][1] - 273)} imageurl={daysLoop[4][2]}/>
        </View>
      </ScrollView>
        }
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191920',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerStyle: {
    padding: 3,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: "7%"
  },
  textStyle: {
    color: 'white',
    fontWeight: "light",
  },
  textDnipro: {
    padding: 10,
    color: 'white',
    fontWeight: "bold",
    textAlign: "center"
  },
  textTemp: {
    padding: 10,
    color: 'white',
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 30
  },
  imageStyle: {
    width: "100%",
    height: "100%"
  },
  imageWeather: {
    width: 332,
    height: 279,
    // marginLeft: "10%"
  },
  imageSmall: {
    width: 20,
    height: 20,
  },
  imageMenu: {
    width: 33,
    height: 31,
  },
  buttonMenu: {
    padding: 42,
    marginRight: "90%"
  },
  containerImage: {
    padding: 30,
    color: 'white',
    fontWeight: "bold",
    textAlign: "center"
  },
});
