import 'package:flutter/material.dart';

class SelectableSeat extends StatelessWidget {
  bool isSelected = false;
   SelectableSeat({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
      //  sets
      },
      child: Container(
        height: 60,
        width: 60,
        decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(15),
            border: Border.all(color: Colors.grey, width: 3)
            //  color: Theme.of(context).unselectedWidgetColor,
            ),
        child: const Icon(
          Icons.circle_outlined,
          color: Colors.grey,
        ),
      ),
    );
  }
}
