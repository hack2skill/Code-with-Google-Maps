import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';

import '../models/user_model.dart';

final FirebaseAuth fAuth=FirebaseAuth.instance;
User? currentFirebaseUser;
UserModel ?userModelCurrentInfo;