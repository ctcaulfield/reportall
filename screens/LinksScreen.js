import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { Constants, MapView, Location, Permissions } from 'expo';
import * as firebase from 'firebase';
// Initialize Firebase
const config = {
  "apiKey": "",
  "authDomain": "",
  "databaseURL": "",
  "storageBucket": ""
};
firebase.initializeApp(config);
const database = firebase.database();


export default class LinksScreen extends React.Component {

  static navigationOptions = {
    title: 'Map View',
  };

  state = {
    mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
    locationResult: null,
    location: {coords: { latitude: 37.78825, longitude: -122.4324}},
    pins: {address: "Roosevelt Island", latitude: 40.76050310000001, longitude: -73.9509934, subject: "daffy duck's beak"}
  };

  mapObject(object, callback) {
    return Object.keys(object).map(function (key) {
      return callback(key, object[key]);
    });
  }

  componentDidMount() {
    try {
      database.ref("reports").on('value', (snapshot) => {
        var returnArr = [];

        snapshot.forEach(function(child){
          var item = child.val();
          item.key = child.key;
          returnArr.push(item);
        });
        // this.setState({pins: returnArr});
        this.setState({pins: returnArr});
        return returnArr;
      });
    } catch (error) {
        console.log(error);
    }
  }

_handleMapRegionChange = mapRegion => {
  this.setState({ mapRegion });
};

render() {
  const { navigate } = this.props.navigation;
  return (
    <View style={styles.container}>
      <MapView
        style={{ alignSelf: 'stretch', height: 800 }}
        onRegionChange={this._handleMapRegionChange}
      >
      {this.mapObject(this.state.pins, function (key, value) {
        return   <MapView.Marker
            coordinate={{latitude: value.latitude,
            longitude: value.longitude}}
            title= {value.subject}
            description = {"Location: "+value.address+", Handle: "+value.username}
            pinColor= {value.color_code}
            onCalloutPress={() =>navigate("Settings")}
          />;
      })}

      </MapView>
    </View>
  );
}

} //end of react component

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
