import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
} from "react-native";
export default function App() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require("../assets/icon.png")} />
            <StatusBar style="auto" />
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email."
                    placeholderTextColor="#003f5c"
                    onChangeText={(email) => setEmail(email)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password."
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>
            <TouchableOpacity>
                <Text style={styles.forgot_button}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn}>
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
            <Link href={"/register"} style={{ paddingTop: 10 }} asChild>
                <TouchableOpacity style={[styles.forgot_button]}>
                    <Text style={styles.loginText}>New User? Register</Text>
                </TouchableOpacity>
            </Link>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#abcdef",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        marginBottom: 40,
        width: 50,
        height: 50
    },
    inputView: {
        backgroundColor: "#2C2D2D01",
        elevation: 1,
        // shadowColor: 'black',
        // borderWidth: 10,
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    forgot_button: {
        height: 30,
    },
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#FF1493",
    },
});