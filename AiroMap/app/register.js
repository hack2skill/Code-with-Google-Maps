import { StatusBar } from "expo-status-bar";
import { Link, router } from "expo-router";
import React, { useState } from "react";
// import EncryptedStorage from 'react-native-encrypted-storage';
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
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailSent, setEmailSent] = useState(false)
    const [OTP, setOTP] = useState("")
    const register = async () => {
        const r = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        })
        const data = await r.json()
        alert(data.success)
        if (data.success) {
            setEmailSent(true)
            // return router.replace("/")
        }
        alert(data)
    }
    const verify = async () => {
        const r = await fetch(`${process.env.EXPO_PUBLIC_API_KEY}/api/verifyemail`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                email, otp: OTP
            })
        })
        const data = await r.json()
        if (data.success) {
            try {
                await EncryptedStorage.setItem('token', data.token);
                alert('Value stored successfully');
            } catch (error) {
                console.log('Error storing value:', error);
            }
        }
        else {
            alert(data.message)
        }
    }
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            {!emailSent ? <View style={{ width: "100%", margin: 'auto', display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image style={styles.image} source={require("../assets/icon.png")} />
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Name"
                        placeholderTextColor="#eee"
                        onChangeText={(name) => setName(name)}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        keyboardType="email-address"
                        style={styles.TextInput}
                        placeholder="Email."
                        placeholderTextColor="#eee"
                        onChangeText={(email) => setEmail(email)}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Password"
                        placeholderTextColor="#eee"
                        secureTextEntry={true}
                        onChangeText={(password) => setPassword(password)}
                    />
                </View>
                <TouchableOpacity>
                    <Text style={styles.forgot_button}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={register} style={styles.loginBtn}>
                    <Text style={styles.loginText}>REGISTER</Text>
                </TouchableOpacity>
                <Link href={"/login"} style={{ paddingTop: 10 }} asChild>
                    <TouchableOpacity style={[styles.forgot_button, { paddingTop: 10 }]}>
                        <Text style={styles.loginText}>Already registered? Login </Text>
                    </TouchableOpacity>
                </Link>
            </View> : <View style={{ width: "100%", margin: 'auto', display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image style={styles.image} source={require("../assets/icon.png")} />
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="OTP"
                        placeholderTextColor="#eee"
                        onChangeText={(otp) => setOTP(otp)}
                    />
                </View>
                <TouchableOpacity onPress={verify} style={styles.loginBtn}>
                    <Text style={styles.loginText}>VERIFY</Text>
                </TouchableOpacity>
            </View>}
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
        color: '#fff',
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