import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:intl_phone_field/intl_phone_field.dart';
import 'package:pinput/pinput.dart';
import 'package:provider/provider.dart';
import 'package:taxiflex/Screens/screens.dart';
import '../Services/services.dart';
import '../Utils/utils.dart';

class RiderSignIn extends StatefulWidget {
  const RiderSignIn({Key? key}) : super(key: key);

  @override
  State<RiderSignIn> createState() => _RiderSignInState();
}

class _RiderSignInState extends State<RiderSignIn> {
  final cursor = Column(
    mainAxisAlignment: MainAxisAlignment.end,
    children: [
      Container(
        width: 56,
        height: 3,
        decoration: BoxDecoration(
          color: const Color(0xFFD48608),
          borderRadius: BorderRadius.circular(8),
        ),
      ),
    ],
  );
  final preFilledWidget = Column(
    mainAxisAlignment: MainAxisAlignment.end,
    children: [
      Container(
        width: 56,
        height: 3,
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(8),
        ),
      ),
    ],
  );

  final defaultPinTheme = const PinTheme(
    width: 56,
    height: 56,
    textStyle: TextStyle(
      fontSize: 22,
      color: Color.fromRGBO(30, 60, 87, 1),
    ),
    decoration: BoxDecoration(),
  );

  final formKey = GlobalKey<FormState>();
  // controller -> phone, email, name, otp code
  TextEditingController phoneController = TextEditingController();
  TextEditingController nameController = TextEditingController();
  TextEditingController otpCodeController = TextEditingController();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        leading: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Container(
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: Theme.of(context).primaryColor,
            ),
            child: IconButton(
              icon: Icon(
                Icons.arrow_back_ios_new,
                color: Theme.of(context).colorScheme.onPrimary,
              ),
              onPressed: () {
                Navigator.pop(context);
              },
            ),
          ),
        ),
      ),
      body: Stack(
        children: [
          Container(
            width: double.maxFinite,
            height: double.maxFinite,
            decoration: const BoxDecoration(
              image: DecorationImage(
                alignment: Alignment.bottomCenter,
                fit: BoxFit.cover,
                image: AssetImage(
                  "lib/Assets/img_2.jpg",
                ),
              ),
            ),
          ),
          Align(
            alignment: Alignment.bottomCenter,
            child: Container(
              color: Theme.of(context).backgroundColor,
              height: MediaQuery.of(context).size.height * 0.70,
              child: Padding(
                padding: const EdgeInsets.only(top: 20, left: 20, right: 20),
                child: ListView(
                  children: [
                    SizedBox(
                      width: MediaQuery.of(context).size.width * 0.90,
                      child: const Text(
                        "Rider Registration",
                        softWrap: true,
                        maxLines: 2,
                        style: TextStyle(
                            fontSize: 32, fontWeight: FontWeight.w700),
                      ),
                    ),
                    const SizedBox(height: 20),
                    Form(
                      key: formKey,
                      child: Column(
                        children: [
                          //* Rider Name
                          TextFormField(
                            validator: (value) {
                              if (value!.isEmpty) {
                                return "Name cannot be empty";
                              }
                              return null;
                            },
                            controller: nameController,
                            textInputAction: TextInputAction.next,
                            decoration: InputDecoration(
                              prefixIcon: const Icon(Icons.account_circle),
                              hintText: "Your Name",
                              hintStyle: TextStyle(color: Colors.grey[600]),
                            ),
                          ),
                          const SizedBox(
                            height: 20,
                          ),
                          //* Rider Number
                          IntlPhoneField(
                            controller: phoneController,
                            decoration: const InputDecoration(
                              isDense: true,
                              hintText: "7855443321",
                              alignLabelWithHint: true,
                            ),
                            validator: (value) {
                              if (value!.number.isEmpty) {
                                return "Phone Number cannot be empty";
                              }
                              return null;
                            },
                            initialCountryCode: 'ZA',
                            keyboardType: TextInputType.phone,
                            textInputAction: TextInputAction.next,
                            onChanged: (phone) {},
                          ),
                          const SizedBox(
                            height: 20,
                          ),
                          ElevatedButton(
                            onPressed: () {
                              login(
                                  context, "+27${phoneController.text.trim()}");
                            },
                            style: ElevatedButton.styleFrom(
                              backgroundColor:
                                  Theme.of(context).colorScheme.secondary,
                            ),
                            child: const Text("Register"),
                          )
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Future login(BuildContext context, String mobile) async {
    final sp = context.read<SignInProvider>();
    final ip = context.read<InternetProvider>();
    await ip.checkInternetConnection();

    if (ip.hasInternet == false) {
      openSnackbar(context, "Check your internet connection", Colors.red);
    } else {
      if (formKey.currentState!.validate()) {
        FirebaseAuth.instance.verifyPhoneNumber(
            phoneNumber: mobile,
            verificationCompleted: (AuthCredential credential) async {
              await FirebaseAuth.instance.signInWithCredential(credential);
            },
            verificationFailed: (FirebaseAuthException e) {
              openSnackbar(context, e.toString(), Colors.red);
            },
            codeSent: (String verificationId, int? forceResendingToken) {
              showDialog(
                  barrierDismissible: false,
                  context: context,
                  builder: (context) {
                    return AlertDialog(
                      title: const Text("Enter Code"),
                      actions: [
                        TextButton(
                          onPressed: () {
                            Navigator.pop(context);
                            otpCodeController.clear();
                          },
                          child: const Text("Close"),
                        ),
                      ],
                      content: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Pinput(
                            length: 6,
                            defaultPinTheme: defaultPinTheme,
                            cursor: cursor,
                            controller: otpCodeController,
                            preFilledWidget: preFilledWidget,
                            pinAnimationType: PinAnimationType.fade,
                          ),
                          const SizedBox(
                            height: 10,
                          ),
                          ElevatedButton(
                            onPressed: () async {
                              try {
                                final code = otpCodeController.text.trim();
                                AuthCredential authCredential =
                                    PhoneAuthProvider.credential(
                                        verificationId: verificationId,
                                        smsCode: code);
                                User user = (await FirebaseAuth.instance
                                        .signInWithCredential(authCredential))
                                    .user!;
                                // save the values
                                sp.phoneNumberRider(
                                  user: user,
                                  name: nameController.text,
                                  phoneNo: phoneController.text,
                                );
                                // checking whether the Rider exists
                                sp.checkRiderExists().then((value) async {
                                  if (value == true) {
                                    // Rider exists
                                    await sp
                                        .getRiderDataFromFirestore(sp.uidR)
                                        .then(
                                          (value) => sp
                                              .saveRiderDataToSharedPreferences()
                                              .then(
                                                (value) =>
                                                    sp.setSignInAsRider().then(
                                                  (value) {
                                                    nextScreenReplace(context,
                                                        const HomeNav(),);
                                                  },
                                                ),
                                              ),
                                        );
                                  } else {
                                    // user does not exist
                                    await sp.saveRiderDataToFirestore().then(
                                          (value) => sp
                                              .saveRiderDataToSharedPreferences()
                                              .then(
                                                (value) =>
                                                    sp.setSignInAsRider().then(
                                                  (value) {
                                                    nextScreenReplace(context,
                                                        const HomeNav());
                                                  },
                                                ),
                                              ),
                                        );
                                  }
                                });
                              } catch (e) {
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(
                                    content: Text(
                                      e.toString(),
                                    ),
                                  ),
                                );
                              }
                            },
                            child: const Text("Confirm"),
                          )
                        ],
                      ),
                    );
                  });
            },
            codeAutoRetrievalTimeout: (String verification) {});
      }
    }
  }
}
