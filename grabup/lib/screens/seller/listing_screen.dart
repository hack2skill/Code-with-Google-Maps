import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

class ListingScreen extends StatefulWidget {
  const ListingScreen({super.key});

  @override
  State<ListingScreen> createState() => _ListingScreenState();
}

class _ListingScreenState extends State<ListingScreen> {
  XFile? image;
  var isLoading = false;

  final ImagePicker picker = ImagePicker();

  final snackBar = SnackBar(
    content: const Text('Added Successfully'),
    action: SnackBarAction(
      label: 'Undo',
      onPressed: () {
        // Some code to undo the change.
      },
    ),
  );

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: ListView(
      children: [
        Container(
          child: Container(
              padding: EdgeInsets.only(top: 20, left: 20, right: 20),
              alignment: Alignment.topCenter,
              child: Column(
                children: [
                  ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        primary: Colors.green,
                        textStyle: const TextStyle(
                            color: Colors.white,
                            fontSize: 16,
                            fontStyle: FontStyle.normal),
                      ),
                      onPressed: () async {
                        image =
                            await picker.pickImage(source: ImageSource.gallery);
                        setState(() {
                          //update UI
                        });
                      },
                      child: Text("Pick Image")),
                  image == null ? Container() : Image.file(File(image!.path))
                ],
              )),
        ),
        SizedBox(
          height: 20,
        ),
        Padding(
          padding: const EdgeInsets.all(16.0),
          child: TextField(
            decoration: InputDecoration(
              border: OutlineInputBorder(),
              hintText: 'Enter a Scrap Name',
            ),
          ),
        ),
        Padding(
          padding:
              const EdgeInsets.only(top: 10, left: 30, bottom: 20, right: 30),
          child: Container(
            height: 40,
            child: ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.green,
                textStyle: const TextStyle(
                  color: Colors.white,
                  fontSize: 24,
                  fontStyle: FontStyle.normal,
                ),
              ),
              onPressed: () async {
                setState(() {
                  isLoading = true;
                });
                Future.delayed(Duration(seconds: 5)).then((_) {
                  setState(() {
                    isLoading = false;
                    ScaffoldMessenger.of(context).showSnackBar(snackBar);
                  });
                });
              },
              child: isLoading
                  ? SizedBox(
                      child: CircularProgressIndicator(
                        color: Colors.white,
                      ),
                      height: 20,
                      width: 20,
                    )
                  : Text('Submit'),
            ),
          ),
        ),
      ],
    ));
  }
}
