import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";
import { useState, useEffect } from "react";

const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=10339";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [arrivalTime, setArrivalTime] = useState("");

  async function loadBusstopData() {
    const response = await fetch(BUSSTOP_URL);
    const responseData = await response.json();
    // console.log("async version");
    // console.log(responseData);

    const myBus = responseData.services.filter((item) => item.no === "175")[0];

    // console.log(myBus.next.time);
    setArrivalTime(myBus.next.time);
    setLoading(false);

    // promises method
    // fetch(BUSSTOP_URL)
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((responseData) => {
    //     console.log(responseData);
    //   });
  }

  useEffect(() => {
    loadBusstopData();

    const interval = setInterval(loadBusstopData, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.descriptionText}>Bus arrival time:</Text>
      <Text style={styles.arrivalTimeText}>
        {loading ? <ActivityIndicator size="large" /> : arrivalTime}
      </Text>
      <Pressable
        style={styles.button}
        onPress={() => {
          setTimeout(loadBusstopData, 500);
          setLoading(true);
        }}>
        <Text style={styles.buttonText}>Refresh</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  descriptionText: {
    margin: 24
  },
  arrivalTimeText: {
    fontWeight: "bold",
    fontSize: 24
  },
  button: {
    backgroundColor: "green",
    padding: 10,
    margin: 24
  },
  buttonText: {
    color: "white"
  }
});
