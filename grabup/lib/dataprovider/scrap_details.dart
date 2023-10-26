import 'package:latlong2/latlong.dart';

class ScrapItem {
  final String? image;
  final String? title;
  final LatLng? location;

  ScrapItem({
    required this.image,
    required this.title,
    required this.location,
  });
}

final ScrapItems = [
  ScrapItem(
    image: 'assets/images/scrap_1.PNG',
    title: 'Second Hand Cooler',
    location: LatLng(28.677979, 77.501794),
  ),
  ScrapItem(
    image: 'assets/images/scrap_2.jpg',
    title: 'Iron Scrap',
    location: LatLng(28.677826, 77.500315),
  ),
  ScrapItem(
    image: 'assets/images/scrap_3.PNG',
    title: 'Scrap Refridgerator',
    location: LatLng(28.676519, 77.503236),
  ),
  ScrapItem(
    image: 'assets/images/scrap_4.PNG',
    title: 'Raddi Akhbaar',
    location: LatLng(28.681464, 77.499915),
  ),
  ScrapItem(
    image: 'assets/images/scrap_5.PNG',
    title: 'Second hand Washing Machine Part',
    location: LatLng(28.681841, 77.500900),
  ),
];
