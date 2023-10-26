class DealItem {
  final String? image;
  final int? amount;
  final String? offer;

  DealItem({
    required this.image,
    required this.amount,
    required this.offer,
  });
}

final DealItems = [
  DealItem(
    image: 'assets/images/bottle.jpg',
    amount: 800,
    offer: 'Water Bottle',
  ),
  DealItem(
    image: 'assets/images/bucket.jpg',
    amount: 700,
    offer: 'Bucket',
  ),
  DealItem(
    image: 'assets/images/mouse.png',
    amount: 1100,
    offer: 'Mouse',
  ),
  DealItem(
    image: 'assets/images/pvr.png',
    amount: 600,
    offer: 'Movie Ticket',
  ),
  DealItem(
    image: 'assets/images/spray.jpg',
    offer: 'Body Spray',
    amount: 1200,
  ),
];
