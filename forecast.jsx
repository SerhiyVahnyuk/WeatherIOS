import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';

export default function ForecastCard({date, temperature, imageurl}){
    
    return(
            <View style={styles.container}>
                <Image style={{width: '50%', height: '30%'}} source={{uri: imageurl}}/>
                <Text style = {{color:"white"}}>{date}</Text>
                <Text style = {{color:"white"}}>{temperature}℃</Text>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
    backgroundColor: '#6E739A30',
    alignItems: 'center',
    justifyContent: 'center',
    width: 115,
    height: 154,
    display: 'grid',
    marginLeft: "4%",
    textAlign: 'auto',
    borderRadius: 12, // Всё -
    },
    scrol: {
        // marginLeft: "4%",
    }
  });