import 'dart:convert';

import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:sih_app/api/api.dart';
import 'package:sih_app/helpers/navigator_helper.dart';
import 'package:sih_app/modal/login_response.dart';
import 'package:sih_app/utils/components/flut_toast.dart';

import 'package:sih_app/utils/components/my_button.dart';
import 'package:sih_app/utils/components/my_textfield.dart';
import 'package:sih_app/utils/components/square_tile.dart';
import 'package:sih_app/views/home/home.dart';
import 'package:sih_app/views/map/mapscreen.dart';
import 'package:sih_app/views/register/pages/registration_page.dart';

class LoginPage extends StatelessWidget {
  LoginPage({super.key});

  // text editing controllers
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  final auth = FirebaseAuth.instance;

  // sign user in method
  pushtoHome(BuildContext context) async {
    final locations = await API().getAllParkings();
    print(locations);
    List<dynamic> jsonList = jsonDecode(locations);

    List<Map<String, dynamic>> mapsList =
        List<Map<String, dynamic>>.from(jsonList);
    if (context.mounted) {
      NavigationHelper.navigateToSecondRoute(
          context, MapScreen(locs: mapsList));
    }
  }

  Future<LoginResponse> signUserIn() async {
    try {
      final credential = await auth.signInWithEmailAndPassword(
          email: emailController.text, password: passwordController.text);
      User? user = credential.user;
      if (user != null) {
        String? idToken = await user.getIdToken();
        //print('JWT Token: $idToken');
        LoginResponse response = await API().signin(token: idToken);
        return response;

        // You can now use this JWT token for authentication or authorization in your application.
      } else {
        return LoginResponse(
            status: 404, data: {"message": "Something went wrong"});
      }
    } on FirebaseAuthException catch (e) {
      if (e.code == 'user-not-found') {
        print('No user found for that email.');
        return LoginResponse(
            status: 404, data: {"message": "Something went wrong"});
      } else if (e.code == 'wrong-password') {
        print('Wrong password provided for that user.');
        return LoginResponse(
            status: 404, data: {"message": "Something went wrong"});
      }
      return LoginResponse(status: 404, data: {"message": "${e.message}"});
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[300],
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const SizedBox(height: 50),

                SquareTile(imagePath: 'assets/images/logo.png'),

                const SizedBox(height: 50),

                // welcome back, you've been missed!
                Text(
                  'Welcome back you\'ve been missed!',
                  style: TextStyle(
                    color: Colors.grey[700],
                    fontSize: 16,
                  ),
                ),

                const SizedBox(height: 25),

                // username textfield
                MyTextField(
                  controller: emailController,
                  hintText: 'Email',
                  obscureText: false,
                ),

                const SizedBox(height: 10),

                // password textfield
                MyTextField(
                  controller: passwordController,
                  hintText: 'Password',
                  obscureText: true,
                ),

                const SizedBox(height: 10),

                // forgot password?
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 25.0),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      Text(
                        'Forgot Password?',
                        style: TextStyle(color: Colors.grey[600]),
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 25),

                // sign in button
                MyButton(
                  onTap: () async {
                    LoginResponse res = await signUserIn();
                    if (res.status == 200) {
                      if (context.mounted) {
                        var username = res.data["username"];
                        showToast("Successfully logged in as ${username}");
                        pushtoHome(context);
                      }
                    } else {
                      showToast(res.data["message"]);
                      print(res.data["message"]);
                    }
                  },
                ),

                const SizedBox(height: 50),

                // or continue with
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 25.0),
                  child: Row(
                    children: [
                      Expanded(
                        child: Divider(
                          thickness: 0.5,
                          color: Colors.grey[400],
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 10.0),
                        child: Text(
                          'Or continue with',
                          style: TextStyle(color: Colors.grey[700]),
                        ),
                      ),
                      Expanded(
                        child: Divider(
                          thickness: 0.5,
                          color: Colors.grey[400],
                        ),
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 50),

                // google + apple sign in buttons
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: const [
                    // google button
                    SquareTile(imagePath: 'assets/images/google.png'),

                    SizedBox(width: 25),

                    // apple button
                    // SquareTile(imagePath: 'assets/images/apple.png')
                  ],
                ),

                const SizedBox(height: 50),

                // not a member? register now
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      'Not a member?',
                      style: TextStyle(color: Colors.grey[700]),
                    ),
                    const SizedBox(width: 4),
                    GestureDetector(
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => RegisterPage()),
                        );
                      },
                      child: const Text(
                        'Register now',
                        style: TextStyle(
                          color: Colors.blue,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ],
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
