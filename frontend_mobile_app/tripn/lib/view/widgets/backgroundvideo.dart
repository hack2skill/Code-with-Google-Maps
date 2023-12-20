import 'package:flutter/material.dart';
import 'package:video_player/video_player.dart';

class BackgroundVideoWidget extends StatefulWidget {
  const BackgroundVideoWidget({super.key});

  @override
  State<BackgroundVideoWidget> createState() => _BackgroundVideoWidgetState();
}

class _BackgroundVideoWidgetState extends State<BackgroundVideoWidget> {
  late final VideoPlayerController _Controller;
  @override
  void initState() {
    _Controller = VideoPlayerController.asset('assets/images/video1.mp4')
      ..initialize().then((value) {
        _Controller.play();
        _Controller.setLooping(true);
      });
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return VideoPlayer(
      
      _Controller);
  }
}
