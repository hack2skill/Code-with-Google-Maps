import 'package:latlong2/latlong.dart';

class MapMarker {
  final String? image;
  final String? name;
  final LatLng? location;
  final String? rating;

  MapMarker({
    required this.image,
    required this.name,
    required this.location,
    required this.rating,
  });
}

final mapMarkers = [
  MapMarker(
      image: 'assets/images/men_1.jpg',
      name: 'Ranjan Das',
      location: LatLng(28.677979, 77.501794),
      rating: '⭐⭐⭐⭐'),
  MapMarker(
      image: 'assets/images/men_2.jpg',
      name: 'Himanshu Sakhya',
      location: LatLng(28.677826, 77.500315),
      rating: '⭐⭐⭐'),
  MapMarker(
      image: 'assets/images/men_3.jpg',
      name: 'Jatin laal',
      location: LatLng(28.676519, 77.503236),
      rating: '⭐⭐'),
  MapMarker(
      image: 'assets/images/men_4.jpg',
      name: 'Kesar Sharma',
      location: LatLng(28.681464, 77.499915),
      rating: '⭐⭐⭐⭐'),
  MapMarker(
    image: 'assets/images/men_5.jpg',
    name: 'Abinav Raaj',
    location: LatLng(28.681841, 77.500900),
    rating: '⭐⭐⭐',
  ),
];
