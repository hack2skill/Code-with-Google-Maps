import 'package:flutter/material.dart';
import 'package:taxiflex/Models/short_route_model.dart';

class RouteDetailsTab extends StatelessWidget {
  final ShortRouteModel routeModel;
  const RouteDetailsTab({
    Key? key,
    required this.routeModel,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Column(
        children: [
          const SizedBox(height: 20),
          Text(
            "About",
            textAlign: TextAlign.start,
            style: TextStyle(
              color: Theme.of(context).colorScheme.onSecondaryContainer,
              fontWeight: FontWeight.w600,
              fontSize: 22,
            ),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              const Text("Travel Time:"),
              Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(
                    color: Theme.of(context).colorScheme.onSecondaryContainer,
                    style: BorderStyle.solid,
                  ),
                ),
                child: Text(routeModel.travelTime),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              const Text("Trip Fare:"),
              Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(
                    color: Theme.of(context).colorScheme.onSecondaryContainer,
                    style: BorderStyle.solid,
                  ),
                ),
                child: Text("R${routeModel.price}"),
              ),
            ],
          ),
          const SizedBox(height: 20),
          Text(
            routeModel.description,
            style: TextStyle(
              color: Theme.of(context).colorScheme.onSecondaryContainer,
            ),
          )
        ],
      ),
    );
  }
}
