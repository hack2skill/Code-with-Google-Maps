import 'package:flutter/material.dart';
import '../widgets/backgroundvideo.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {




  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Stack(
        children: [
           BackgroundVideoWidget(),
        ],
      )
    );
  }
}
