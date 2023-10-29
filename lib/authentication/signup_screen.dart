import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_database/firebase_database.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:users_app/splash_Screen/splash_screen.dart';
import '../global/global.dart';
import '../progress_dialog.dart';
import 'login_screeen.dart';


class SignUpScreen extends StatefulWidget {
  const SignUpScreen({Key? key}) : super(key: key);
  @override
  State<SignUpScreen> createState() => _SignUpScreenState();
}

class _SignUpScreenState extends State<SignUpScreen> {
  TextEditingController name=TextEditingController();
  TextEditingController mail=TextEditingController();
  TextEditingController phone=TextEditingController();
  TextEditingController password=TextEditingController();

  validataForm(){
    if(name.text.length<3){
      Fluttertoast.showToast(msg: "name must have atleast 3 characters");
    }
    else if(!mail.text.contains("@")){
      Fluttertoast.showToast(msg: "The mail is invaid");
    }
    else if(phone.text.isEmpty){
      Fluttertoast.showToast(msg: "Please enter the phone number");
    }
    else if(password.text.length<6){
      Fluttertoast.showToast(msg: "Please write a password of length more than 6");
    }
    else{
     saveUserInfo();
    }
  }

  saveUserInfo()async{
    showDialog(context: context,
        barrierDismissible:false,   //The dialog box will not get closed if a user clicks on the screen
        builder:(BuildContext c){
          return ProgressDialog(message: "Processing,Please Wait",);
        });
    final User? firebaseUser=(await fAuth.createUserWithEmailAndPassword
      (email: mail.text.trim(), password: password.text.trim(),)
    .catchError((msg){
      Navigator.pop(context);
      Fluttertoast.showToast(msg:"Error" + msg.toString());
    })).user;  //TRIM HELPS US TO ELIMINATE THE EXTRA SPACE
               // WHICH IS ADDED TO THE CONTROLLER
    if(firebaseUser!=Null){        //IF firebase user is null that means the user has not been created
        Map userMap={
          "id":firebaseUser!.uid,
          "name":name.text.trim(),
          "email":mail.text.trim(),
          "phone":phone.text.trim(),
        };
        DatabaseReference userRef=FirebaseDatabase.instance.ref().child("users");
        userRef.child(firebaseUser.uid).set(userMap);
        currentFirebaseUser=firebaseUser;
        Fluttertoast.showToast(msg: "ACCOUNT HAS BEEN CREATED");
        Navigator.push(context, MaterialPageRoute(builder: (c)=>MySplash_Screen()));
    }
    else{
      Navigator.pop(context);
      Fluttertoast.showToast(msg: "ACCOUNT HAS NOT BEEN CREATED");
    }
  }

  @override

  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          children: [
            SizedBox(
              height: 10,
            ),
            Padding(
              padding: const EdgeInsets.all(20.0),
              child: Image.asset("lib/images/logo.png"),
            ),
            SizedBox(
              height: 10,
            ),

            Text("Register as a User",
            style: TextStyle(
              fontSize: 26,
              color: Colors.grey,
              fontWeight: FontWeight.bold,
            ),),
            TextField(
              controller: name,
              keyboardType: TextInputType.name,
              style: const TextStyle(
                color: Colors.grey,
              ),
              decoration: const InputDecoration(
                labelText: "Name",
                hintText: "Name",
                enabledBorder: UnderlineInputBorder(
                  borderSide: BorderSide(color: Colors.grey),
                ),
                focusedBorder: UnderlineInputBorder(
                  borderSide: BorderSide(color: Colors.blueGrey,)
                ),
                hintStyle: TextStyle(
                  color: Colors.grey,
                  fontSize: 10,
                ),
                labelStyle: TextStyle(
                  color: Colors.grey,
                  fontSize: 14,
                )
              ),
            ),

            TextField(
              controller: mail,
              keyboardType: TextInputType.emailAddress,
              style: const TextStyle(
                color: Colors.grey,
              ),
              decoration: const InputDecoration(
                  labelText: "e-mail",
                  hintText: "email",
                  enabledBorder: UnderlineInputBorder(
                    borderSide: BorderSide(color: Colors.grey),
                  ),
                  focusedBorder: UnderlineInputBorder(
                      borderSide: BorderSide(color: Colors.blueGrey,)
                  ),
                  hintStyle: TextStyle(
                    color: Colors.grey,
                    fontSize: 10,
                  ),
                  labelStyle: TextStyle(
                    color: Colors.grey,
                    fontSize: 14,
                  )
              ),
            ),
            TextField(
              controller: phone,
              keyboardType: TextInputType.phone,
              style: const TextStyle(
                color: Colors.grey,
              ),
              decoration: const InputDecoration(
                  labelText: "Phone",
                  hintText: "phone",
                  enabledBorder: UnderlineInputBorder(
                    borderSide: BorderSide(color: Colors.grey),
                  ),
                  focusedBorder: UnderlineInputBorder(
                      borderSide: BorderSide(color: Colors.blueGrey,)
                  ),
                  hintStyle: TextStyle(
                    color: Colors.grey,
                    fontSize: 10,
                  ),
                  labelStyle: TextStyle(
                    color: Colors.grey,
                    fontSize: 14,
                  )
              ),
            ),
            TextField(
              controller: password,
              keyboardType: TextInputType.text,
              obscureText: true,
              style: const TextStyle(
                color: Colors.grey,
              ),
              decoration: const InputDecoration(
                  labelText: "Password",
                  hintText: "password",
                  enabledBorder: UnderlineInputBorder(
                    borderSide: BorderSide(color: Colors.grey),
                  ),
                  focusedBorder: UnderlineInputBorder(
                      borderSide: BorderSide(color: Colors.blueGrey,)
                  ),
                  hintStyle: TextStyle(
                    color: Colors.grey,
                    fontSize: 10,
                  ),
                  labelStyle: TextStyle(
                    color: Colors.grey,
                    fontSize: 14,
                  )
              ),
            ),

            SizedBox(
              height: 20,
            ),

            ElevatedButton(onPressed: (){
              validataForm();
                //Navigator.push(context, MaterialPageRoute(builder: (c)=>CarInfoScreen()));
            },
                style: ElevatedButton.styleFrom(
                  primary: Colors.lightGreenAccent
                ),
                child: Text(
              "Create Account",style: TextStyle(
              color: Colors.black54,
              fontSize: 18,
            ),
            )),

            TextButton(onPressed: () {
              Navigator.push(context, MaterialPageRoute(builder: (c)=>LoginScreen()));
            },
            child:Text("If you already have an account? Login here",
            style: TextStyle(
              color: Colors.grey,
            ),),)
          ],
        ),
      ),
    );
  }
}
