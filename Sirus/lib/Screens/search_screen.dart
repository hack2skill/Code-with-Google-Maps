import 'package:dropdown_search/dropdown_search.dart';
import 'package:flutter/material.dart';
import 'package:we_slide/we_slide.dart';

class SearchSheet extends StatefulWidget {
  const SearchSheet({
    Key? key,
    required WeSlideController controller,
  })  : _controller = controller,
        super(key: key);

  final WeSlideController _controller;

  @override
  State<SearchSheet> createState() => _SearchSheetState();
}

class _SearchSheetState extends State<SearchSheet> {

  @override
  Widget build(BuildContext context) {
    //  GetAllStartsProvider strts = Provider.of<GetAllStartsProvider>(context);
        return Container(
          width: double.maxFinite,
          padding: const EdgeInsets.only(top: 20, left: 20, right: 20),
          color: Theme.of(context).cardColor,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  IconButton(
                      onPressed: () {
                        widget._controller.hide();
                      },
                      icon: const Icon(Icons.close)),
                  const SizedBox(width: 60),
                  const Text(
                    "Your Trip",
                    style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800),
                  )
                ],
              ),
              const Divider(),
              const Padding(
                padding: EdgeInsets.symmetric(vertical: 8),
                child: Text(
                  "Choose a start location",
                ),
              ),
              DropdownSearch(
                items: const ["Text", "Text 2"],
                dropdownDecoratorProps: const DropDownDecoratorProps(
                  dropdownSearchDecoration: InputDecoration(
                    labelText: "Choose start location",
                  ),
                ),
                popupProps: PopupProps.menu(
                  itemBuilder: (context, item, isSelected) {
                    return const ListTile(
                      title: Text("Text"),
                    );
                  },
                  containerBuilder: (context, popupWidget) {
                    return Container(
                      decoration: BoxDecoration(
                        color: Theme.of(context).highlightColor,
                        borderRadius: const BorderRadius.only(
                          bottomLeft: Radius.circular(20),
                          bottomRight: Radius.circular(20),
                        ),
                      ),
                    );
                  },

                  title: const Text("Start Location"),
                  //    menuProps: MenuProps(),
                  searchFieldProps: const TextFieldProps(),
                ),
              ),
              const SizedBox(
                height: 20,
              ),
              const Padding(
                padding: EdgeInsets.symmetric(vertical: 8),
                child: Text(
                  "Choose a destination",
                ),
              ),
              DropdownSearch(
                items: const [],
                dropdownDecoratorProps: const DropDownDecoratorProps(
                  dropdownSearchDecoration: InputDecoration(
                    labelText: "Choose destination",
                  ),
                ),
                popupProps: PopupProps.menu(
                  // itemBuilder: ,
                  containerBuilder: (context, popupWidget) {
                    return Container(
                      decoration: BoxDecoration(
                        color: Theme.of(context).highlightColor,
                        borderRadius: const BorderRadius.only(
                          bottomLeft: Radius.circular(20),
                          bottomRight: Radius.circular(20),
                        ),
                      ),
                    );
                  },
                  title: const Text("Start Location"),
                  searchFieldProps: const TextFieldProps(),
                ),
              ),
            ],
          ),
        );
  }
}
