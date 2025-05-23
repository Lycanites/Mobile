import React, { useRef, useState } from "react";
import {
 Animated,
 View,
 Image, 
 ScrollView, 
 Dimensions, 
 Text, 
 TouchableOpacity, 
 SafeAreaView,
 StyleSheet
} from "react-native";
import {data} from '../../data/information'
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';

const {width} = Dimensions.get('window')

export default () => {
    const images = data
    const scrollX = useRef(new Animated.Value(0)).current;
    const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setCurrentIndex(index);
  };

    return(
        
        <View style={styles.container}>
            <Animated.ScrollView
            
            style={styles.scrool}
            pagingEnabled 
            onMomentumScrollBegin={() => {}}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false, listener: handleScroll }
              )}
              scrollEventThrottle={16}
           >
                    {
                        images.map((x, i) => 
                            <View style={{flex:1}} key={x.id}>
                                <View style={{flex:1}} />
                                <View style={styles.headerContent}>
                                    <Text style={[styles.titletext, {color: x.titleColor}]}>{x.title}</Text>
                                </View>
                                <View style={styles.imageContent}>
                                    <Image
                                        style={{width:275, height:275, resizeMode:'contain'}}
                                        source={x.image}
                                    />
                                </View>
                                <View style={styles.footerContent}>
                                    <Text style={styles.subtext }>{x.subtitle}</Text>
                                </View>
                                <View style={{flex:1}}/>
                            </View>
                        )
                    }
            </Animated.ScrollView>
            <View style={styles.paginationContent}>
                {
                    images.map((x, i) =>
                        <View
            key={i}
            style={[
              styles.paginationItem,
              i === currentIndex ? styles.paginationItemActive : null, 
            ]}
          />
                )
                }
            </View>
        </View>
     
    )
}

const styles = StyleSheet.create({
    scrool:{
        flex:1,
        alignSelf:'stretch',
    },
container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white'
},
headerContent:{
    height:responsiveHeight(5),
    width:responsiveWidth(),
    paddingHorizontal: 20,
    justifyContent:'center',
    alignItems:'center',
},
imageContent:{
    width:responsiveWidth(),
    height:responsiveHeight(35),
    justifyContent:'center',
    alignItems:'center',
    marginTop: 20,
    marginBottom: 20,
},
footerContent:{
    height: 'auto',
    width,
    paddingHorizontal:20,
    justifyContent:'center',
    alignItems:'center',
},
titletext:{
    fontFamily: 'CreamBeige',
    fontSize:responsiveFontSize(4),
},
subtext:{
    fontSize:20,
    fontFamily:'MaryKate',
    textAlign:'justify'
},
paginationContent:{
    flexDirection: 'row',
    position:'absolute',
    bottom:10,
    alignItems:'center',
    justifyContent:'center',
    paddingHorizontal:50,
    width
},
paginationItem:{
    width:responsiveWidth(4),
    height:responsiveHeight(2),
    backgroundColor:'#996ee5',
    borderRadius:1.5,
    marginRight:5
},
paginationItemActive: {
    backgroundColor: "#34008f",
    height:responsiveHeight(2),
    width:responsiveWidth(4),
  },
})
  