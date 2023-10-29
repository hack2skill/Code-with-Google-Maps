import { StatusBar } from "expo-status-bar";
import { Link, router } from "expo-router";
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
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async () => {
        console.log(process.env.EXPO_PUBLIC_API_URL)
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            const data = await response.json();
            if (data.success) {
                // Login successful, navigate to home screen
                // Store token securely using AsyncStorage module
                await AsyncStorage.setItem('token', data.token);
                router.replace("/")
            } else {
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("An error occurred while logging in.");
        }
    };

    const handleForgotPassword = async () => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}api/resendotp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                }),
            });
            const data = await response.json();
            if (data.success) {
                // OTP sent successfully, navigate to OTP verification screen
            } else {
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("An error occurred while sending OTP.");
        }
    };

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
            <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={styles.forgot_button}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
            <Link href={"/register"} style={{ paddingTop: 10 }} asChild>
                <TouchableOpacity style={[styles.forgot_button]}>
                    <Text style={styles.loginText}>New User? Register</Text>
                </TouchableOpacity>
            </Link>
            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
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
        width: 200,
        height: 200,
    },
    inputView: {
        backgroundColor: "#2C2D2D01",
        elevation: 1,
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
    loginText: {
        color: "white",
    },
    error: {
        color: "red",
        marginTop: 10,
    },
});