// Importing necessary packages
import 'dart:async';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:supabase/supabase.dart';
import 'package:path_provider/path_provider.dart';
import 'package:permission_handler/permission_handler.dart';

// Defining a stateful widget for the community forum screen
class CommunityForumScreen extends StatefulWidget {
  @override
  _CommunityForumScreenState createState() => _CommunityForumScreenState();
}

// Defining the state for the community forum screen
class _CommunityForumScreenState extends State<CommunityForumScreen> {
  // Initializing a Supabase client with the URL and API key
  final client = SupabaseClient('https://poqhuqdfdnygffdamvhv.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcWh1cWRmZG55Z2ZmZGFtdmh2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5ODU2MzE2OCwiZXhwIjoyMDE0MTM5MTY4fQ.mLsveckdJ7eAlWz3UTXjBLj2zr87BhbmW5sYwWDccpU');
  String? userName;

  @override
  void initState() {
    super.initState();
    getUserName(); // Fetching the username when the widget is initialized
  }

  // Function to get the username from a local file
  Future<void> getUserName() async {
    final status = await Permission.storage.request();
    if (status.isGranted) {
      final directory = await getApplicationDocumentsDirectory();
      final file = File('${directory.path}/user_name.txt');
      userName = await file.readAsString(); // Reading the file here
      setState(() {}); // Then updating the state here
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Community Forum'),
      ),
      body: userName == null
          ? Center(
              child:
                  CircularProgressIndicator()) // Showing a progress indicator while fetching the username
          : Column(
              children: [
                Expanded(
                    child: MessagesView(client,
                        userName!)), // Displaying the messages view here
                MessageInput(client,
                    userName!), // Displaying the message input field here
              ],
            ),
    );
  }
}

// Defining a stateful widget for the messages view
class MessagesView extends StatefulWidget {
  final SupabaseClient client;
  final String userName;

  MessagesView(this.client, this.userName);

  @override
  _MessagesViewState createState() => _MessagesViewState();
}

// Defining the state for the messages view
class _MessagesViewState extends State<MessagesView> {
  final messages =
      <Map<String, dynamic>>[]; // Initializing a list to store the messages
  Timer? _timer; // Initializing a timer to fetch messages periodically

  @override
  void initState() {
    super.initState();
    _timer = Timer.periodic(
        Duration(seconds: 2),
        (timer) =>
            fetchMessages()); // Fetching messages every 2 seconds when the widget is initialized
  }

  @override
  void dispose() {
    _timer?.cancel(); // Canceling the timer when disposing of the widget
    super.dispose();
  }

  // Function to fetch messages from a Supabase table named 'messages'
  fetchMessages() async {
    final response = await widget.client.from('messages').select().execute();
    if (response.status == 200 && response.data != null) {
      setState(() {
        messages.clear(); // Clearing old messages here
        for (var item in response.data) {
          if (item is Map<String, dynamic>) {
            messages.insert(0,
                item); // Inserting new messages at the beginning of the list here
          }
        }
      });
    } else {
      // Removed print statement. You can handle the error here by showing it in the UI.
    }
  }

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: messages.length,
      itemBuilder: (context, index) {
        final message = messages[index];
        return ListTile(
          title: Text('${message['text']}'),
          subtitle: Text('${message['timestamp']}'),
        );
      },
    );
  }
}

// Defining a stateful widget for message input field
class MessageInput extends StatefulWidget {
  final SupabaseClient client;
  final String userName;

  MessageInput(this.client, this.userName);

  @override
  _MessageInputState createState() => _MessageInputState();
}

// Defining the state for the message input field
class _MessageInputState extends State<MessageInput> {
  final controller =
      TextEditingController(); // Initializing a text editing controller for the input field

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(8),
      child: Row(
        children: [
          Expanded(
            child: TextField(
              controller: controller,
              decoration: InputDecoration(hintText: 'Enter message'),
            ),
          ),
          IconButton(
            icon: Icon(Icons.send),
            onPressed: () async {
              await widget.client.from('messages').insert({
                'text': '${widget.userName}: ${controller.text}',
                'timestamp': DateTime.now().toIso8601String()
              });
              controller
                  .clear(); // Clearing the input field after sending a message
            },
          ),
        ],
      ),
    );
  }
}
