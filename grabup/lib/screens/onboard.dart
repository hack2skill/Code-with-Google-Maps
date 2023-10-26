import 'package:flutter/material.dart';
import 'package:concentric_transition/concentric_transition.dart';
import 'package:grabup/screens/authentication/auth.dart';
import 'package:grabup/screens/welcome.dart';
import 'package:lottie/lottie.dart';

final pages = [
  PageData(
    title: "Do you want to \nSell Scrap",
    textColor: Colors.white,
    bgColor: Colors.black,
    background: Lottie.asset('assets/animation/animation1.json'),
  ),
  PageData(
    title: "Make Money by \nSelling Used Items",
    bgColor: Colors.green,
    textColor: Colors.white,
    background: Lottie.asset('assets/animation/animation2.json'),
  ),
  PageData(
    title: "To sell, click the \nphoto and post.",
    bgColor: Color(0xFFFFFFFF),
    background: Lottie.asset('assets/animation/animation3.json'),
  ),
];

class OnBoarding extends StatelessWidget {
  const OnBoarding({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    return Scaffold(
      body: ConcentricPageView(
        colors: pages.map((p) => p.bgColor).toList(),
        radius: screenWidth * 0.1,
        // curve: Curves.ease,
        nextButtonBuilder: (context) => Padding(
          padding: const EdgeInsets.only(left: 3), // visual center
          child: Icon(
            Icons.navigate_next,
            size: screenWidth * 0.08,
          ),
        ),
        itemCount: pages.length,
        duration: const Duration(milliseconds: 1500),
        opacityFactor: 2.0,
        scaleFactor: 0.2,
        // verticalPosition: 0.7,
        // direction: Axis.vertical,
        // physics: NeverScrollableScrollPhysics(),
        itemBuilder: (index) {
          final page = pages[index % pages.length];
          return SafeArea(
            child: _Page(page: page),
          );
        },
        onFinish: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => const AUTHSELLER(),
            ),
          );
        },
      ),
    );
  }
}

class PageData {
  final String? title;
  final IconData? icon;
  final Color bgColor;
  final Color textColor;
  final Widget? background;

  const PageData(
      {this.title,
      this.icon,
      this.bgColor = Colors.white,
      this.textColor = Colors.black,
      this.background});
}

class _Page extends StatelessWidget {
  final PageData page;

  const _Page({Key? key, required this.page}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final screenHeight = MediaQuery.of(context).size.height;
    space(double p) => SizedBox(height: screenHeight * p / 100);
    return Column(
      children: [
        space(10),
        _Image(
          page: page,
          size: 190,
        ),
        space(8),
        _Text(
          page: page,
          style: TextStyle(
            fontSize: screenHeight * 0.046,
          ),
        ),
      ],
    );
  }
}

class _Text extends StatelessWidget {
  const _Text({
    Key? key,
    required this.page,
    this.style,
  }) : super(key: key);

  final PageData page;
  final TextStyle? style;

  @override
  Widget build(BuildContext context) {
    return Text(
      page.title ?? '',
      style: TextStyle(
        color: page.textColor,
        fontWeight: FontWeight.w600,
        fontFamily: 'Helvetica',
        letterSpacing: 0.0,
        fontSize: 18,
        height: 1.2,
      ).merge(style),
      textAlign: TextAlign.center,
    );
  }
}

class _Image extends StatelessWidget {
  const _Image({
    Key? key,
    required this.page,
    required this.size,
  }) : super(key: key);

  final PageData page;
  final double size;

  @override
  Widget build(BuildContext context) {
    const title1 = "To sell, click the \nphoto and post.";

    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        borderRadius: const BorderRadius.all(Radius.circular(60.0)),
        color: page.title != title1 ? Colors.green : Colors.transparent,
      ),
      child: Stack(
        clipBehavior: Clip.none,
        fit: StackFit.expand,
        children: [
          Positioned.fill(
            child: Container(child: page.background),
          ),
        ],
      ),
    );
  }
}
