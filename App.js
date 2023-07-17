import Auth from "@aws-amplify/auth";
import Amplify from "@aws-amplify/core";
import Storage from "@aws-amplify/storage";
import * as Clipboard from "expo-clipboard";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";
import awsconfig from "./aws-exports";
import { Animated, Easing } from "react-native";
import Lottie from "lottie-react-native";
import { suggestions } from "./constants/class-names";
// yellow box warnings - ignore them
console.disableYellowBox = true;

Amplify.configure(awsconfig);

const PREDICTION_INITIAL_STATE = {
  class: "",
  confidence: null,
  suggestion: "",
};

export default function App() {
  const [image, setImage] = useState(null);
  const [percentage, setPercentage] = useState(0);
  const [hasUploaded, setHasUploaded] = useState(false);
  const [prediction, setPrediction] = useState(PREDICTION_INITIAL_STATE);
  const animationProgress = useRef(new Animated.Value(0));

  useEffect(() => {
    console.log("entrou", percentage);
    Animated.timing(animationProgress.current, {
      toValue: percentage / 100,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [percentage]);

  useEffect(() => {
    (async () => {
      if (Constants.platform.ios) {
        const cameraRollStatus =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        if (
          cameraRollStatus.status !== "granted" ||
          cameraStatus.status !== "granted"
        ) {
          // alert("Sorry, we need these permissions to make this work!");
        }
      }
    })();
  }, []);

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: "Images",
      aspect: [4, 3],
    });

    this.handleImagePicked(result);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      aspect: [4, 3],
      quality: 1,
    });

    this.handleImagePicked(result);
  };

  handleImagePicked = async (pickerResult) => {
    try {
      setHasUploaded(false);

      if (pickerResult.cancelled) {
        // alert("Upload cancelado");
        return;
      } else {
        setPercentage(0);
        const img = await fetchImageFromUri(pickerResult.uri);
        const uploadUrl = await uploadImage("demo.jpg", img);
        console.log("upload deu certo");
        predict();
        setHasUploaded(true);
        downloadImage(uploadUrl);
      }
    } catch (e) {
      console.log(e);
      alert("Upload falhou");
    }
  };

  uploadImage = (filename, img) => {
    Auth.currentCredentials();
    return Storage.put(filename, img, {
      level: "public",
      contentType: "image/jpeg",
      progressCallback(progress) {
        setLoading(progress);
      },
    })
      .then((response) => {
        return response.key;
      })
      .catch((error) => {
        console.log(error);
        return error.response;
      });
  };

  const setLoading = (progress) => {
    const calculated = parseInt((progress.loaded / progress.total) * 100);
    updatePercentage(calculated); // due to s3 put function scoped
  };

  const updatePercentage = (number) => {
    setPercentage(number);
  };

  downloadImage = (uri) => {
    Storage.get(uri)
      .then((result) => setImage(result))
      .catch((err) => console.log(err));
  };

  const fetchImageFromUri = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  const copyToClipboard = () => {
    Clipboard.setString(image);
    alert("Copied image URL to clipboard");
  };

  const predict = async () => {
    setPrediction(PREDICTION_INITIAL_STATE);
    try {
      const response = await axios.get("http://192.168.86.210:5000/evaluate");
      console.log({ response: response.data });
      setPrediction({
        class: response.data.class,
        confidence: response.data.confidence,
        suggestion: response.data.suggestion,
      });
    } catch (error) {
      console.log("Request failed");
      console.log(error);
      console.error(error);
    }
  };

  console.log({ hasUploaded, percentage });

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>AWS Storage Upload Demo</Text> */}
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Classificador de Patologias Vegetais
      </Text>
      <Text
        style={{
          fontSize: 16,
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Para utilizar, selecione uma imagem de uma folha de uma planta com
        alguma patologia de sua galeria ou tire uma nova foto.
      </Text>
      {percentage !== 0 && !hasUploaded && percentage !== 100 && (
        <>
          <Lottie
            source={require("./assets/animation_lk6by1dw.json")}
            progress={animationProgress.current}
            loop={false}
            style={{
              height: 100,
            }}
          />
          {/* <Text style={styles.percentage}>Upload: {percentage}%</Text> */}
        </>
      )}

      {image && hasUploaded && (
        <View
          style={{
            width: "100%",
            height: 250,
            marginBottom: 20,
            borderRadius: 8,
          }}
        >
          {/* <Text style={styles.result} onPress={copyToClipboard}> */}
          <Image
            source={{ uri: image }}
            style={{
              borderRadius: 16,
              flex: 1,
            }}
            resizeMode="contain"
          />
          {/* </Text> */}
          {/* <Text style={styles.info}>Long press to copy the image url</Text> */}
        </View>
      )}
      {hasUploaded && prediction.class && (
        <View>
          <Text style={styles.class.label}>
            Classe: <Text style={styles.class.value}>{prediction.class}</Text>
          </Text>
          <Text style={styles.class.label}>
            Confiança:{" "}
            <Text style={styles.class.value}>{prediction.confidence}</Text>
          </Text>
          <Text style={styles.class.label}>
            Sugestão:{" "}
            <Text style={styles.class.value}>
              {
                suggestions.find((item) => item.item === prediction.class)
                  .suggestion
              }
            </Text>
          </Text>
        </View>
      )}

      {/* {hasUploaded && (
        <TouchableOpacity style={styles.predictButton} onPress={predict}>
          <Text style={styles.predictButtonLabel}>Avaliar</Text>
        </TouchableOpacity>
      )} */}
      <TouchableOpacity
        style={
          !hasUploaded && percentage > 0 && percentage < 100
            ? styles.disabledButton.container
            : styles.galeryButton.container
        }
        onPress={pickImage}
        disabled={!hasUploaded && percentage > 0 && percentage < 100}
      >
        <Text
          style={
            !hasUploaded && percentage > 0 && percentage < 100
              ? styles.disabledButton.label
              : styles.galeryButton.label
          }
        >
          Selecione uma foto da galeria
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={takePhoto}
        disabled={!hasUploaded && percentage > 0 && percentage < 100}
        style={
          !hasUploaded && percentage > 0 && percentage < 100
            ? styles.disabledButton.container
            : styles.galeryButton.container
        }
      >
        <Text
          style={
            !hasUploaded && percentage > 0 && percentage < 100
              ? styles.disabledButton.label
              : styles.galeryButton.label
          }
        >
          Tirar uma foto
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  disabledButton: {
    container: {
      backgroundColor: "#ddd",
      padding: 16,
      borderRadius: 8,
      marginBottom: 16,
    },
    label: {
      fontSize: 16,
    },
  },
  predictButton: {
    backgroundColor: "#39743B",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  predictButtonLabel: { fontSize: 16, color: "#F5FCFF" },
  galeryButton: {
    container: {
      backgroundColor: "#346936",
      padding: 16,
      borderRadius: 8,
      marginBottom: 16,
    },
    label: { fontSize: 16, color: "#F5FCFF" },
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    marginHorizontal: 15,
  },
  percentage: {
    marginBottom: 10,
  },
  result: {
    paddingTop: 5,
  },
  info: {
    textAlign: "center",
    marginBottom: 20,
  },
  class: {
    label: {
      fontSize: 16,
      marginBottom: 8,
    },
    value: {
      fontWeight: "bold",
      fontSize: 16,
    },
  },
});
