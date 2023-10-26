import 'package:latlong2/latlong.dart';

class MapMarker {
  final String? image;
  final String? title;
  final String? address;
  final LatLng? location;
  final int? rating;

  MapMarker({
    required this.image,
    required this.title,
    required this.address,
    required this.location,
    required this.rating,
  });
}

final mapMarkers = [
  MapMarker(
      image: 'assets/images/scrap_1.PNG',
      title: 'Second Hand Cooler',
      address: '8 Plender St, London NW1 0JT, United Kingdom',
      location: LatLng(28.677979, 77.501794),
      rating: 4),
  MapMarker(
      image: 'assets/images/scrap_2.jpg',
      title: 'Iron Scrap',
      address: '103 Hampstead Rd, London NW1 3EL, United Kingdom',
      location: LatLng(28.677826, 77.500315),
      rating: 5),
  MapMarker(
      image: 'assets/images/scrap_3.PNG',
      title: 'Scrap Refridgerator',
      address: '122 Palace Gardens Terrace, London W8 4RT, United Kingdom',
      location: LatLng(28.676519, 77.503236),
      rating: 2),
  MapMarker(
      image: 'assets/images/scrap_4.PNG',
      title: 'Raddi Akhbaar',
      address: '2 More London Riverside, London SE1 2AP, United Kingdom',
      location: LatLng(28.681464, 77.499915),
      rating: 3),
  MapMarker(
    image: 'assets/images/scrap_5.PNG',
    title: 'Second hand Washing Machine Part',
    address: '42 Kingsway, London WC2B 6EY, United Kingdom',
    location: LatLng(28.681841, 77.500900),
    rating: 4,
  ),
];
