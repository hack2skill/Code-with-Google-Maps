import 'package:flutter/material.dart';
import 'package:grabup/dataprovider/dealdata.dart';
import 'package:grabup/widgets/deal_card.dart';

class DealScreen extends StatefulWidget {
  const DealScreen({super.key});

  @override
  State<DealScreen> createState() => _DealScreenState();
}

class _DealScreenState extends State<DealScreen> {
  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: DealItems.length,
      itemBuilder: ((context, index) => Container(
            child: DealCard(
              deal: DealItems[index],
            ),
          )),
    );
  }
}
