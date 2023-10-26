import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:url_launcher/url_launcher.dart';

class SustainableNewsScreen extends StatelessWidget {
  Future<List<Map<String, dynamic>>> fetchNewsTitles() async {
    final response = await http.get(Uri.parse(
        'https://newsapi.org/v2/everything?q=sustainability and eco-friendly&pageSize=20&apiKey=10b5286403674703a25c480489227484'));

    if (response.statusCode == 200) {
      var jsonResponse = jsonDecode(response.body);
      return List<Map<String, dynamic>>.from(jsonResponse['articles']);
    } else {
      throw Exception('Failed to load news');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Sustainable News'),
        leading: IconButton(
          icon: Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: FutureBuilder<List<Map<String, dynamic>>>(
        future: fetchNewsTitles(),
        builder: (BuildContext context,
            AsyncSnapshot<List<Map<String, dynamic>>> snapshot) {
          if (snapshot.hasData) {
            return Scrollbar(
              child: ListView.builder(
                itemCount: snapshot.data?.length ?? 0,
                itemBuilder: (BuildContext context, int index) {
                  return ListTile(
                    title: Text(snapshot.data?[index]['title'] ?? ''),
                    onTap: () => launch(snapshot.data?[index]['url'] ?? ''),
                  );
                },
              ),
            );
          } else if (snapshot.hasError) {
            return Text('Error: ${snapshot.error}');
          } else {
            return CircularProgressIndicator();
          }
        },
      ),
    );
  }
}
