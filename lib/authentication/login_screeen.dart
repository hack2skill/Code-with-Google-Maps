import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_database/firebase_database.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:users_app/authentication/signup_screen.dart';
import 'package:users_app/splash_Screen/splash_screen.dart';


import '../global/global.dart';
import '../progress_dialog.dart';


class LoginScreen extends StatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {

  validataForm(){
    if(!email.text.contains("@")){
      Fluttertoast.showToast(msg: "Invalid E-mail");
    }
    else if(pass.text.isEmpty){
      Fluttertoast.showToast(msg: "Pls Enter the Password");
    }
    else{
      loginUserNow();
    }
  }
  loginUserNow()async{
    showDialog(context: context,
        barrierDismissible:false,   //The dialog box will not get closed if a user clicks on the screen
        builder:(BuildContext c){
          return ProgressDialog(message: "Processing,Please Wait",);
        });
    final User? firebaseUser=(await fAuth.signInWithEmailAndPassword
      (email: email.text.trim(), password: pass.text.trim(),)
        .catchError((msg){
      Navigator.pop(context);
      Fluttertoast.showToast(msg:"Error" + msg.toString());
    })).user;  //TRIM HELPS US TO ELIMINATE THE EXTRA SPACE
    // WHICH IS ADDED TO THE CONTROLLER
    if(firebaseUser!=Null){        //IF firebase user is null that means the user has not been created

      DatabaseReference driverRef=FirebaseDatabase.instance.ref().child("users");
      driverRef.child(firebaseUser!.uid).once().then((driverKey){            //we are checking that the driver key is there in driver node or not thus restricting the user to enter
        //in drivers app
        final snap = driverKey.snapshot;
        if(snap.value !=null){
          currentFirebaseUser=firebaseUser;
          Fluttertoast.showToast(msg: "Successfully logged in");
          Navigator.push(context, MaterialPageRoute(builder: (c)=>MySplash_Screen()));
        }
        else{
          Fluttertoast.showToast(msg: "No recrod exists with this Username");
          fAuth.signOut();
          Navigator.push(context, MaterialPageRoute(builder: (c)=>MySplash_Screen()));
        }
      });
    }
    else{
      Navigator.pop(context);
      Fluttertoast.showToast(msg: "Error while Signing in");
    }
  }
  TextEditingController email=TextEditingController();
  TextEditingController pass=TextEditingController();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: SingleChildScrollView(
        padding: EdgeInsets.all(20),
        child: Column(
          children: [
            const SizedBox(height: 10),
            Padding(padding: const EdgeInsets.all(20.0),
            child: Image.asset("lib/images/logo.png"),),

            const SizedBox(height: 10,),

            const Text("Login As A User",
            style: TextStyle(
              fontSize: 26,
              color: Colors.grey,
              fontWeight: FontWeight.bold,
            ),),

            TextField(
              controller: email,
              keyboardType: TextInputType.emailAddress,
              style: const TextStyle(
                color: Colors.grey,
              ),
              decoration: const InputDecoration(
                labelText: "Email",
                hintText: "Email",
                enabledBorder: UnderlineInputBorder(
                  borderSide: BorderSide(color: Colors.grey),
                ),
                focusedBorder: UnderlineInputBorder(
                  borderSide: BorderSide(color: Colors.grey),
                ),
                hintStyle: TextStyle(
                  color: Colors.grey,
                  fontSize:10,
                ),
                labelStyle: TextStyle(
                  color: Colors.grey,
                  fontSize:14,
                ),
              ),
            ),
            TextField(
              controller: pass,
              keyboardType: TextInputType.visiblePassword,
              style: const TextStyle(
                color: Colors.red,
              ),
              decoration: const InputDecoration(
                labelText: "password",
                hintText: "password",
                enabledBorder: UnderlineInputBorder(
                  borderSide: BorderSide(color: Colors.grey),
                ),
                focusedBorder: UnderlineInputBorder(
                  borderSide: BorderSide(color: Colors.grey),
                ),
                hintStyle: TextStyle(
                  color: Colors.grey,
                  fontSize: 10,
                ),
                labelStyle: TextStyle(
                  color: Colors.grey,
                  fontSize: 10,
                )
              ),
            ),
            SizedBox(height: 20,),
            ElevatedButton(onPressed:(){
              validataForm();
            },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.lightGreenAccent,
                ),
                child: const Text("Login In",
                style: TextStyle(
                  color: Colors.black54,
                  fontSize: 18
                ),),),
            TextButton(child: Text(
              "Do not have an account? Register here",
              style: TextStyle(color: Colors.grey),
            ),
            onPressed: (){
              Navigator.push(context, MaterialPageRoute(builder: (c)=>SignUpScreen()));
            },)
          ],
        ),
      ),
    );
  }
}
