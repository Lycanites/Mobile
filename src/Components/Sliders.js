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

const {width} = Dimensions.get('window')

export default () => {
    const images = data
    return(
        
        <View style={styles.container}>
            <ScrollView 
            style={styles.scrool}
            pagingEnabled 
            onMomentumScrollBegin={() => {}}
            showsHorizontalScrollIndicator={false}
            horizontal={true}>
                    {
                        images.map((x, i) => 
                            <View style={{flex:1}} key={x.id}>
                                <View style={styles.header}>
                                    <Text>{x.title}</Text>
                                </View>
                            </View>
                        )
                    }
            </ScrollView>
        </View>
     
    )
}

const styles = StyleSheet.create({
container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white'
},
header:{
    height:'auto',
    width,
    paddingHorizontal: 20,
}
})
  