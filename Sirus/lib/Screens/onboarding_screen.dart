import 'package:flutter/material.dart';
import 'package:taxiflex/Screens/screens.dart';

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  List images = [
    "img_1.jpg",
    "img_2.jpg",
    "img_3.jpg",
  ];

  List text = [
    "Find a taxi anywhere",
    "Skip the ATM queues",
    "Pay for your taxi in the app"
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: PageView.builder(
        scrollDirection: Axis.vertical,
        itemCount: 3,
        itemBuilder: (context, index) {
          return Stack(
            children: [
              Container(
                width: double.maxFinite,
                height: double.maxFinite,
                decoration: BoxDecoration(
                  image: DecorationImage(
                    alignment: Alignment.bottomCenter,
                    fit: BoxFit.cover,
                    image: AssetImage(
                      "lib/Assets/" + images[index],
                    ),
                  ),
                ),
              ),
              Container(
                height: MediaQuery.of(context).size.height * 0.60,
                width: double.maxFinite,
                decoration: BoxDecoration(
                    gradient: LinearGradient(
                  stops: const [0.5, 1],
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [Theme.of(context).canvasColor, Colors.transparent],
                )),
                child: Padding(
                  padding: const EdgeInsets.only(top: 100, left: 20, right: 20),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        mainAxisAlignment: MainAxisAlignment.start,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          SizedBox(
                            width: MediaQuery.of(context).size.width * 0.70,
                            child: Text(
                              text[index],
                              softWrap: true,
                              maxLines: 2,
                              style: const TextStyle(
                                  fontSize: 32, fontWeight: FontWeight.w700),
                            ),
                          ),
                          const SizedBox(height: 20),
                          TextButton(
                            onPressed: () {},
                            child: const Text("Skip"),
                          )
                        ],
                      ),
                      Column(
                        children: List.generate(
                          images.length,
                          (indexDots) {
                            return Container(
                              margin: const EdgeInsets.only(bottom: 4),
                              width: 8,
                              height: index == indexDots ? 25 : 8,
                              decoration: BoxDecoration(
                                  borderRadius: BorderRadius.circular(8),
                                  color: index == indexDots
                                      ? Theme.of(context)
                                          .colorScheme
                                          .secondaryContainer
                                      : Theme.of(context)
                                          .colorScheme
                                          .secondary),
                            );
                          },
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              Visibility(
                visible: index == 2 ? true : false,
                child: Positioned(
                  bottom: 70,
                  right: 20,
                  left: 20,
                  child: ElevatedButton(
                    onPressed: () => Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (_) => const LandingScreen(),
                  ),
                ),
                    child: const Text(
                      "Done",
                      style: TextStyle(fontWeight: FontWeight.w600),
                    ),
                  ),
                ),
              ),
            ],
          );
        },
      ),
    );
  }
}
