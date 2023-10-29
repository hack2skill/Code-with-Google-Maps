import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Button, Linking } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
export default function App() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOTP] = useState('');
    const [emailSent, setEmailSent] = useState(false);

    const register = async () => {
        try {
            const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/register`, {
                name: name,
                email: email,
                password: password
            });
            if (response.data.success) {
                setEmailSent(true);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const verify = async () => {
        try {
            const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/verifyemail`, {
                email: email,
                otp: otp
            });
            if (response.data.success) {
                // Store token securely using AsyncStorage module
                await AsyncStorage.setItem('token', response.data.token);
                alert('Email verified successfully!');
                router.replace("/")
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Image style={styles.image} source={require('../assets/icon.png')} />
            {!emailSent ? (
                <>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Name"
                            placeholderTextColor="#003f5c"
                            onChangeText={(name) => setName(name)}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Email"
                            placeholderTextColor="#003f5c"
                            onChangeText={(email) => setEmail(email)}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Password"
                            placeholderTextColor="#003f5c"
                            secureTextEntry={true}
                            onChangeText={(password) => setPassword(password)}
                        />
                    </View>

                    <TouchableOpacity style={styles.forgot_button} onPress={() => Linking.openURL('https://example.com/forgot-password')}>
                        <Text style={styles.forgot_button_text}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.loginBtn} onPress={register}>
                        <Text style={styles.loginText}>REGISTER</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="OTP"
                            placeholderTextColor="#003f5c"
                            onChangeText={(otp) => setOTP(otp)}
                        />
                    </View>

                    <TouchableOpacity style={styles.loginBtn} onPress={verify}>
                        <Text style={styles.loginText}>VERIFY</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#abcdef',
        alignItems: 'center',
        justifyContent: 'center',
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
        marginBottom: 30,
    },
    forgot_button_text: {
        color: '#003f5c',
        fontSize: 12,
    },
    loginBtn: {
        width: '80%',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        backgroundColor: '#003f5c',
    },
    loginText: {
        color: 'white',
    },
});