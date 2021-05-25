import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { LinearProgress } from "react-native-elements";
import moment from "moment";
import Icon from "react-native-vector-icons/FontAwesome5";
import IconIonic from "react-native-vector-icons/Ionicons";

const News = ({ navigation }) => {
  const [NewsAPi, setNewsAPi] = useState([]);
  const [NewsDataIO, setNewsDataIO] = useState([]);

  useEffect(() => {
    fetch(
      "https://newsdata.io/api/1/news?apikey=pub_290922174d60307bc3a9267cd5bd0d71b71&category=health&country=in"
    )
      .then((res) => res.json())
      .then((data) => setNewsDataIO(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=c630aeaafd994be98b3c9377bed4fe13"
    )
      .then((res) => res.json())
      .then((data) => setNewsAPi(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <View style={styles.mainNews}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          paddingTop: 6,
          paddingBottom: 10,
          paddingRight: 10,
          paddingLeft: 10,
        }}
      >
        <IconIonic
          name="menu-outline"
          size={30}
          color="black"
          onPress={() => navigation.toggleDrawer()}
        />
        <Icon
          name="user"
          size={24}
          color="black"
          style={{ marginLeft: "auto", marginRight: 5 }}
        />
      </View>
      <ScrollView
        vertical={true}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
      >
        {NewsAPi.status === "ok" ? (
          NewsAPi.articles.map((news, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => Linking.openURL(news.url)}
              style={styles.NewsApiCard}
            >
              <View
                style={
                  news.urlToImage === null
                    ? styles.nullNewsAPiImg
                    : styles.NewsAPiImg
                }
              >
                <Text style={styles.newsApiTitle}>{news.title}</Text>
                <Text style={styles.newsApiSrc}>
                  {news.source.name} | {moment(news.publishedAt).fromNow(true)}{" "}
                  ago
                </Text>
                <Text style={styles.newsApiDesc}>{news.description}</Text>
              </View>
              {news.urlToImage === null ? null : (
                <Image
                  style={{
                    height: 100,
                    width: "40%",
                    borderRadius: 4,
                    marginLeft: "auto",
                  }}
                  source={{
                    uri: news.urlToImage ? news.urlToImage : null,
                  }}
                />
              )}
            </TouchableOpacity>
          ))
        ) : (
          <LinearProgress
            color="primary"
            style={{ marginTop: "auto", marginBottom: "auto" }}
          />
        )}
        {NewsDataIO.results
          ? NewsDataIO.results.map((news, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => Linking.openURL(news.link)}
                style={styles.NewsApiCard}
              >
                <View
                  style={
                    news.image_url === null
                      ? styles.nullNewsAPiImg
                      : styles.NewsAPiImg
                  }
                >
                  <Text style={styles.newsApiTitle}>{news.title}</Text>
                  <Text style={styles.newsApiSrc}>
                    {news.source_id} | {moment(news.pubDate).fromNow(true)} ago
                  </Text>
                  <Text style={styles.newsApiDesc}>{news.description}</Text>
                </View>
                {news.image_url === null ? null : (
                  <Image
                    style={{
                      height: 100,
                      width: "40%",
                      backgroundColor: "red",
                      borderRadius: 4,
                      marginLeft: "auto",
                    }}
                    source={{
                      uri: news.image_url ? news.image_url : null,
                    }}
                  />
                )}
              </TouchableOpacity>
            ))
          : null}
      </ScrollView>
    </View>
  );
};

export default News;

const styles = StyleSheet.create({
  mainNews: {
    padding: 14,
  },
  NewsAPiImg: {
    width: "55%",
  },
  nullNewsAPiImg: {
    width: "100%",
  },
  NewsApiCard: {
    display: "flex",
    flexDirection: "row",
    padding: 8,
    borderWidth: 1,
    borderColor: "#e0dede",
    borderRadius: 8,
    marginBottom: 8,
  },
  newsApiTitle: {
    marginTop: 5,
    color: "black",
    fontFamily: "RobotoBold",
    fontWeight: "bold",
  },
  newsApiSrc: {
    marginTop: 2,
    color: "#6b6b6b",
    fontWeight: "normal",
    fontFamily: "RobotoRegular",
    fontSize: 11,
  },
  newsApiDesc: {
    marginTop: 3,
    color: "#333",
    fontWeight: "normal",
    fontFamily: "RobotoRegular",
    fontSize: 12,
  },
});
