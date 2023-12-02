import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';

function ImageButton({onPress, source}) {
  return (
    <View style={{position: 'absolute', bottom: 35, right: 35}}>
      <TouchableOpacity onPress={onPress}>
        <Image source={source} style={{width: 50, height: 50}} />
      </TouchableOpacity>
    </View>
  );
}

export default ImageButton;
