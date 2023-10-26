import 'package:flutter/material.dart';
import 'package:path_provider/path_provider.dart';
import 'dart:io';
import 'package:permission_handler/permission_handler.dart';

class CommunityForumScreen extends StatefulWidget {
  @override
  _CommunityForumScreenState createState() => _CommunityForumScreenState();
}

class _CommunityForumScreenState extends State<CommunityForumScreen> {
  String userName = '';
  TextEditingController _controller = TextEditingController();
  List<String> messages = [];

  @override
  void initState() {
    super.initState();
    _loadMessages();
    _getUserName();
  }

  void _getUserName() async {
    final directory = await getApplicationDocumentsDirectory();
    final file = File('${directory.path}/user_name.txt');
    userName = await file.readAsString();
  }

  void _sendMessage() async {
    String message = '$userName : ${_controller.text}';
    setState(() {
      messages.add(message);
      _controller.clear();
    });
    final directory = await getApplicationDocumentsDirectory();
    final file = File('${directory.path}/messages.txt');
    await file.writeAsString('$message\n', mode: FileMode.append);
  }

  void _loadMessages() async {
    final directory = await getApplicationDocumentsDirectory();
    final file = File('${directory.path}/messages.txt');
    if (await file.exists()) {
      String contents = await file.readAsString();
      setState(() {
        messages = contents.split('\n');
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Community Forum'),
        leading: IconButton(
          icon: Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              itemCount: messages.length,
              itemBuilder: (context, index) {
                return Text(messages[index]);
              },
            ),
          ),
          Row(
            children: [
              Expanded(
                child: TextField(
                  controller: _controller,
                  decoration:
                      InputDecoration(hintText: 'Enter your message here'),
                ),
              ),
              IconButton(
                icon: Icon(Icons.send),
                onPressed: _sendMessage,
              ),
            ],
          ),
        ],
      ),
    );
  }
}
