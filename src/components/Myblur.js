import {
add,
Canvas,
Circle,
LinearGradient,
vec,
sub,
Fill,
useLoop,
mix,
BackdropFilter,
Blur,
useDerivedValue
} from '@shopify/react-native-skia';
import * as React from 'react';
import { Dimensions } from 'react-native';

const{ width, height}=Dimensions.get('window')
const c=vec(width, height)
const r=c.x-32

export default function Myblur() {
    return (
        <Canvas style={{flex:1}}>
            <Circle c={c} r={r}/>
        </Canvas>
    )
}