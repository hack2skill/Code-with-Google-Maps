import 'package:flutter/material.dart';
import 'package:grabup/dataprovider/scrap_details.dart';
import 'package:grabup/widgets/scrap_card.dart';

class ScrapList extends StatefulWidget {
  const ScrapList({super.key});

  @override
  State<ScrapList> createState() => _ScrapListState();
}

class _ScrapListState extends State<ScrapList> {
  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: ScrapItems.length,
      itemBuilder: ((context, index) => Container(
            child: ScrapCard(
              scrap: ScrapItems[index],
            ),
          )),
    );
  }
}
