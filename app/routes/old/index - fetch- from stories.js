import React, {Component} from 'react';
import { View, Text, StyleSheet, ListView, ScrollView, Image, Dimensions, TouchableHighlight, TouchableOpacity } from 'react-native';
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  ShareDialog,
  AccessToken
} = FBSDK;


var photoPics = [
  "https://s-media-cache-ak0.pinimg.com/564x/8d/02/c1/8d02c1a3aff0c490067eda5c35202313.jpg",
  "https://s-media-cache-ak0.pinimg.com/474x/c5/66/09/c566095c603fb9927fbd483a33cc7f29.jpg",
  "https://s-media-cache-ak0.pinimg.com/236x/be/5b/1f/be5b1fb075e65042b2f355d2c60b4f08.jpg",
  "https://s-media-cache-ak0.pinimg.com/564x/13/63/36/136336a0cff1d84cc4f80b047b1d954c.jpg",

]

const CARD_PREVIEW_WIDTH = 20
const CARD_MARGIN = 10;
const CARD_WIDTH = Dimensions.get('window').width - (CARD_MARGIN + CARD_PREVIEW_WIDTH) * 3;
const HEIGHT = Dimensions.get('window').height - 70

var responseData =
    [  // all the stories coming in // stories that need to be looped through
      { // a story
        "user": "Senhit",
        "event": "dance",
        "outfits":
        [
        { "id": 1,
         "votes": 3,
         "closet_id": 1,
         "photo_url": photoPics[0]
       },
       { "id": 2,
        "votes": 3,
        "closet_id": 1,
        "photo_url": photoPics[2]
      },
      { "id": 3,
       "votes": 3,
       "closet_id": 1,
       "photo_url": photoPics[3]
     },
     ]
     },
     { // a story
       "user": "Meron",
       "event": "Wedding",
       "outfits":
       [
       { "id": 4,
        "votes": 3,
        "closet_id": 1,
        "photo_url": photoPics[1]
      }]
     }
    ]


class Stories extends Component{



  constructor(props) {
     super(props);
    //  this.allData = responseData;  //stoiresData = data
     this.state = {change: false, nextImage: false, skipImage: false, storiesData: [], likedImage: false, loaded : false,};
    //  this.state.likedImage = responseData[0].outfits[0]
     this.outfitStory = responseData[0]

   }


  componentWillMount() {
    this.fetchData();
  }

  fetchData () {
    var API_URL = 'http://localhost:3000/users/1/outfitStories';
    fetch(API_URL).then((response) => response.json()).then((responseData) => {

      this.setState({
          storiesData : responseData.body,
          loaded     : true
      });

  }).done();
}

  stories (){
    var self = this
    var outfitStory = responseData[0]
    this.state.likedImage ? likedImage = this.state.likedImage : likedImage = outfitStory.outfits[0]
    console.log(this.state.data)
    console.log(this.outfitStory)

      return (
        <View style={[styles.story]}>
          <Text style={styles.name}>{outfitStory.user}</Text>
          <Image key={likedImage.id} source={{uri: likedImage.photo_url}} style={[{width: 250, height: 250}, styles.display]} resizeMode={'cover'}>
         </Image>
          <ScrollView
            style={styles.contain}
            automaticallyAdjustInsets={true}
            horizontal={true}
            decelerationRate={0}
            snapToInterval={CARD_WIDTH + CARD_MARGIN*2}
            snapToAlignment="start"
            contentContainerStyle={styles.content}>

            {outfitStory.outfits.map(function(outfit, index) {
              return (
                <View key={index}>
                  {<TouchableOpacity  underlayColor="blue"  onPress={()=>self.handleImageLikeClick(outfit)} style={styles.outfitsStrip}>
                    <Image key={outfit.id} source={{uri: outfit.photo_url}} style={[{width: 100, height: 100}]} resizeMode={'cover'}>
                   </Image>
                  </TouchableOpacity>}
                </View>
              );
            })}
          </ScrollView>
          <Text style={styles.event}>{outfitStory.event}</Text>
          <View style={styles.buttonWrapper}>
          <TouchableOpacity underlayColor="blue" onPress={this.handleVotePress.bind(this)} style={[styles.button, styles.voteButton]}>
            <Text >Vote</Text>
          </TouchableOpacity>
          <TouchableOpacity underlayColor="blue" onPress={this.handlePassPress.bind(this)} style={[styles.button, styles.passButton]}>
            <Text >Pass</Text>
          </TouchableOpacity>

          </View>
         </View>
       )
     }



  handleImageLikeClick (outfit) {
    this.setState ({change: !this.change})
    this.setState ({likedImage: outfit})

    console.log(this.likedImage)
  }
  handleVotePress (outfit, index) {
    this.setState ({data: responseData.shift(), likedImage: false})
  }
  handlePassPress (outfit, index) {
    this.setState ({data: responseData.shift(), likedImage: false})
  }

  renderView () {
    return (
      <View style={[styles.container, this.border('purple')]}>
        <ScrollView style={[styles.stories, this.border('purple')]}>
          {this.stories()}
        </ScrollView>
      </View>
    );
  }

  render() {
    if (!this.state.loaded) {
        return this.renderLoadingView();
    }

    return this.renderView();
  }

  renderLoadingView() {
      return (
          <View style={styles.header}>
              <Text style={styles.headerText}>What to Wear?</Text>
              <View style={styles.container}>
                  <ActivityIndicatorIOS
                      animating={!this.state.loaded}
                      style={[styles.activityIndicator, {height: 80}]}
                      size="large"
                  />
              </View>
          </View>
      );
  }

  border(color){
    return {
      borderColor: color,
      // borderWidth: 4
    }
  }

}



    fetch('http://localhost:3000/users', data)
    .then(response => response.json())  // promise
    .then((responseJson) => {
        AlertIOS.alert(
          "POST Response",
          "Response Body -> " + (responseJson.body)
        )
      })

    // fetch("http://localhost:3000/users", {method: "POST", body: JSON.stringify({uid: this.props.uid})})
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     AlertIOS.alert(
    //       "POST Response",
    //       "Response Body -> " + (responseJson.body)
    //     )
    //   })
    //   .done();
}

var styles = StyleSheet.create({

  container: {
    flex: 5,
    // alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    height: HEIGHT,
    // justifyContent: 'space-around',

  },
  stories:{
  },
  display: {
    borderWidth: 4,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 10,
    height: 375,

    // padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    // justifyContent: 'space-around',

    shadowRadius: 3,
  },
  name: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    paddingTop: 5,
    height: 30,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    fontWeight: 'bold',
    fontFamily: 'Cochin',


  },
  outfitsStrip: {
    borderWidth: 0.5,
    alignItems: 'center',
    backgroundColor: 'grey',
    justifyContent: 'center',
    flexDirection: 'column',

    alignItems: 'center',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 1,
    // padding: 2,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  button: {
    borderWidth: 2,
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  buttonWrapper: { // Green
    flex: 1, // takes up 3/8ths of the available space
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

  },
  voteButton: {
    backgroundColor: 'green',
    borderColor: '#00CC00',
  },
  passButton: {
    backgroundColor: 'orange',
    borderColor: '#CC0000',
  },
});

export default Stories;
