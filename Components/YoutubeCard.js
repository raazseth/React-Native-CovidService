import moment from "moment";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";

const YoutubeCard = ({ YT }) => {
  return (
    <TouchableOpacity
      style={styles.mainYt}
      onPress={() =>
        Linking.openURL(`https://www.youtube.com/watch?v=${YT.id.videoId}`)
      }
    >
      <Image
        style={{
          width: 120,
          height: 100,
          borderRadius: 6,
        }}
        source={{
          uri: YT.snippet.thumbnails.default.url,
        }}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: 1,
          marginLeft: 10,
        }}
      >
        <Text style={{ color: "white", fontSize: 13 }}>{YT.snippet.title}</Text>
        <Text style={{ color: "#b8b8b8", fontSize: 12 }}>
          {YT.snippet.channelTitle}
        </Text>
        <Text style={{ color: "#b8b8b8", fontSize: 12 }}>
          {moment(YT.snippet.publishTime).fromNow(true)} ago
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default YoutubeCard;

const styles = StyleSheet.create({
  mainYt: {
    width: 200,
    height: 110,
    padding: 8,
    display: "flex",
    flexDirection: "row",
  },
});
