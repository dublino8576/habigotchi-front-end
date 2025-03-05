import { Text, View, ScrollView, Image, StyleSheet, useWindowDimensions } from "react-native"
import React, { useState } from "react"
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedScrollHandler, interpolate } from "react-native-reanimated"

type CarouselProps = {
    items: any[]
}

export const CarouselView: React.FC<CarouselProps> = ({items}) => {
    const [newItems] = useState([{key: 'spacer-left'}, ...items, {key: 'spacer-right'}])
    const {width} = useWindowDimensions()
    const SIZE = width * 0.7
    const SPACER = (width - SIZE) /2
    const x = useSharedValue(0)
    const onScroll = useAnimatedScrollHandler({onScroll: event => {
        x.value = event.contentOffset.x
    }})
    return (
        <Animated.ScrollView horizontal showsHorizontalScrollIndicator={false} bounces={false}
        scrollEventThrottle={16}
        snapToInterval={SIZE}
        decelerationRate='fast'
        onScroll={onScroll}
        >
            {newItems.map((item, index) => {
                const style = useAnimatedStyle(() => {
                    const scale = interpolate(
                        x.value,
                        [(index - 2) * SIZE, (index - 1) * SIZE, index * SIZE], [0.8, 1, 0.8]
                    )
                    return {
                        transform: [{scale}]
                    }
                })
                if (!item.img_url) {
                    return <View style={{width: SPACER}} key={index}/>
                }
                return (
                    <View key={index} style={{width: SIZE, marginHorizontal: 10}}>
                        <Animated.View style={styles.imageContainer}>
                        <Image
                source={item.img_url} style={[styles.image, style]}
              ></Image>
                        </Animated.View>
                    </View>
                )
            })}
        </Animated.ScrollView>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        borderRadius: 34,
        overflow: "hidden",
        marginBottom: 100
    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
    }
})