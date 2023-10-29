import 'package:flutter/material.dart';
import 'package:animated_notch_bottom_bar/animated_notch_bottom_bar/animated_notch_bottom_bar.dart';
import 'package:tripn/view/Screens/dashboard.dart';
import 'package:tripn/view/widgets/mapsview.dart';

Map pointMap = {
    "result": [
      {
        "address": "272F+6MH, Queens Walkway, Mulavukad, Kochi, Ernakulam",
        "description":
            "A scenic fishing spot with a stunning view of Queens Walkway in Mulavukad, Kochi, Ernakulam.",
        "etime": 10.512,
        "lat": 10.0005704,
        "lng": 76.27423689999999,
        "name": "Fishing & View Point",
        "pic":
            "No photos found for Fishing & View Point,272F+6MH, Queens Walkway, Mulavukad, Kochi, Ernakulam.",
        "rating": 5,
        "stime": 10.0,
        "ttime": "0.512",
        "type": "travel"
      },
      {
        "address":
            "273G+W5F, Safdar Hashmi Ln, Shanmugapuram Colony, Pachalam, Kochi, Ernakulam",
        "description":
            "Fishland273G+W5F is a seafood restaurant located in Shanmugapuram Colony, Kochi, offering a delightful culinary experience.",
        "etime": 11.536000000000001,
        "lat": 10.0047437,
        "lng": 76.2754405,
        "name": "Fishland",
        "pic":
            "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=AcJnMuFfXMa1o8y2xI9K9TNpxAK_PjjcsLXbCL9W1wD2DEFFfRLK9gtBmXIss9VyPTwyyebb8bRtra2J4Lvdjev3XbP_lspkDtQO4RIGTGZ3f0SwQLs-5B2WT34a3IAWBZ3fW_mUjJ3bxeudWyPJK75N-TjDE85X708r01BooR8Qi9EN6G4K&key=AIzaSyD1eYmck8n38D1TdPRc52RCtg-HnpU0B9U",
        "rating": 5,
        "stime": 11.024000000000001,
        "ttime": "0.512",
        "type": "travel"
      },
      {
        "address": "X7XF+H5G, Goshree Chathiyath Rd, Pachalam, Ernakulam",
        "description":
            "Queen's Walkway is a scenic pathway located in Pachalam, Ernakulam, offering a delightful stroll along Goshree Chathiyath Road.",
        "etime": 12.061000000000002,
        "lat": 9.9989255,
        "lng": 76.27296249999999,
        "name": "Queen's Walkway",
        "pic":
            "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=AcJnMuFN68Msk5-8MZ7cLEVNA-4eKJC3JZIc6OvPqIK6xhYPXwnWdVMPyE1fh4JEKw3G9OfXrrGDZK1QeOdhrtgv9BmesGMCUAz9dN5Y2S-faVP7LuPH2GK6vZenRU8qZuUuyIVbbQm1tki0NQgNd8netwTPVtm7YVHgHRTZtUTuKAs01FIu&key=AIzaSyD1eYmck8n38D1TdPRc52RCtg-HnpU0B9U",
        "rating": 4.6,
        "stime": 11.536000000000001,
        "ttime": "0.525",
        "type": "travel"
      },
      {
        "address": "High Court Junction, Marine Drive, Kochi, Ernakulam",
        "description":
            "Kochi water metroHigh Court Junction, Marine Drive, Kochi, Ernakulam: A scenic and convenient mode of transportation to explore the beautiful waterways of Kochi.",
        "etime": 12.592000000000002,
        "lat": 9.983779199999999,
        "lng": 76.27395059999999,
        "name": "Kochi water metro",
        "pic":
            "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=AcJnMuH4RO5wHgVphzYTBCsmElfLXZK7G1DDB3s60e7bCplZt22Jpsttro33rH_NvWGJiA5vSk9JoaCGt-D5JOhZ_HNeO_xk8yg4QDNsHfhwusl_YZS5EsgPz27hwCGKOCks-WDPAVrhzD8jaBBn7uGV88us32435kLZjKIswgWb-q4AnwUJ&key=AIzaSyD1eYmck8n38D1TdPRc52RCtg-HnpU0B9U",
        "rating": 4.5,
        "stime": 12.061000000000002,
        "ttime": "0.531",
        "type": "travel"
      },
      {
        "address": "Abdul Kalam Marg, Marine Drive, Kochi, Ernakulam",
        "description":
            "New Marine Drive in Kochi offers a scenic coastal promenade with stunning views of the Arabian Sea.",
        "name": "New Marine Drive",
        "pic":
            "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=AcJnMuHxjo0UaSZMOR7ChrqANZnV2GJR08C4MaK4uLBzcsNW9wXXMrWbqhPCBZNJHMMYEfSDy7SjOGdb7PZnC_TfIHrjPRNFYSohRqUqIHmIYXAVBmBUDrFCpnsMCd7m7blhlCOeRxklTLUvo3ljouBa1sML0CtLTZlyyq502vgK8RCpLF5-&key=AIzaSyD1eYmck8n38D1TdPRc52RCtg-HnpU0B9U",
        "rating": 4.5,
        "stime": 12.592000000000002,
        "ttime": "0.393",
        "type": "travel"
      }
    ]
  };


class NavigationPage extends StatefulWidget {
  const NavigationPage({super.key, this.Page});
  final Page;
  @override
  State<NavigationPage> createState() => _NavigationPageState();
}

class _NavigationPageState extends State<NavigationPage> {
  int maxCount = 2;

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  
  /// Controller to handle PageView and also handles initial page
  final _pageController = PageController(initialPage: 0);

  /// Controller to handle bottom nav bar and also handles initial page
  final _controller = NotchBottomBarController(index: 0);

  /// widget list
  final List<Widget> bottomBarPages = [
    const DashBoard(),
   const MapSample(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      backgroundColor: Colors.white,
      body: PageView(
        controller: _pageController,
        physics: const NeverScrollableScrollPhysics(),
        children: List.generate(
            bottomBarPages.length, (index) => bottomBarPages[index]),
      ),
      extendBody: true,
      bottomNavigationBar: (bottomBarPages.length <= maxCount)
          ? AnimatedNotchBottomBar(
              /// Provide NotchBottomBarController
              notchBottomBarController: _controller,
              color: Colors.white,
              showLabel: false,
              notchColor: Colors.white,

              /// restart app if you change removeMargins
              removeMargins: false,
              bottomBarWidth: 500,
              durationInMilliSeconds: 300,
              bottomBarItems: const [
                BottomBarItem(
                  inActiveItem: Icon(
                    Icons.home_filled,
                    color: Colors.blueGrey,
                  ),
                  activeItem: Icon(
                    Icons.home_filled,
                    color: Color(0xff009955),
                  ),
                  itemLabel: 'Page 1',
                ),
                BottomBarItem(
                  inActiveItem: Icon(
                    Icons.map,
                    color: Colors.blueGrey,
                  ),
                  activeItem: Icon(
                    Icons.map,
                    color: Color(0xff009955),
                  ),
                  itemLabel: 'Page 4',
                ),
                BottomBarItem(
                  inActiveItem: Icon(
                    Icons.person,
                    color: Colors.blueGrey,
                  ),
                  activeItem: Icon(
                    Icons.person,
                    color: Color(0xff009955),
                  ),
                  itemLabel: 'Page 5',
                ),
              ],
              onTap: (index) {
                /// perform action on tab change and to update pages you can update pages without pages
                // log('current selected index {$index}');
                _pageController.jumpToPage(widget.Page ?? index);
              },
            )
          : null,
    );
  }
}
