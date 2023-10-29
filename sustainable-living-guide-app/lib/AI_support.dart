// Importing necessary packages
import 'package:flutter/material.dart';
import 'package:dart_openai/dart_openai.dart';

// Defining a stateful widget for the AI chat screen
class AIChatScreen extends StatefulWidget {
  const AIChatScreen({Key? key}) : super(key: key);

  @override
  _AIChatScreenState createState() => _AIChatScreenState();
}

// Defining the state for the AI chat screen
class _AIChatScreenState extends State<AIChatScreen> {
  // Initializing a text editing controller for the input field
  final TextEditingController _controller = TextEditingController();

  // Initializing a list to store the messages
  final List<Message> _messages = <Message>[];

  // Function to handle the submission of a query
  Future<void> _submitQuery(String text) async {
    // Setting the API key for OpenAI
    OpenAI.apiKey = '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';

    // Creating a completion with the OpenAI API
    final completion = await OpenAI.instance.completion.create(
      model: "text-davinci-003",
      prompt: text,
      maxTokens: 200,
      stop: '/n',
    );

    // Updating the state with the new messages
    setState(() {
      _messages.insert(
          0, Message(text: 'AI: ${completion.choices[0].text}', type: 'ai'));
      _messages.insert(0, Message(text: 'User: $text', type: 'user'));
    });

    // Clearing the input field
    _controller.clear();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: const Text('AI Support'),
        centerTitle: true,
      ),
      body: Column(
        children: <Widget>[
          Flexible(
            child: ListView.builder(
              padding: const EdgeInsets.all(8.0),
              reverse: false,
              itemBuilder: (_, int index) => _messages[index],
              itemCount: _messages.length,
            ),
          ),
          const Divider(height: 1.0),
          Container(
            decoration: BoxDecoration(color: Theme.of(context).cardColor),
            child: IconTheme(
              data:
                  IconThemeData(color: Theme.of(context).colorScheme.secondary),
              child: Container(
                margin: const EdgeInsets.symmetric(horizontal: 8.0),
                child: Row(
                  children: <Widget>[
                    Flexible(
                      child: TextField(
                        controller: _controller,
                        onSubmitted: _submitQuery,
                        decoration: const InputDecoration.collapsed(
                            hintText: "Send a message"),
                      ),
                    ),
                    Container(
                      margin: const EdgeInsets.symmetric(horizontal: 4.0),
                      child: IconButton(
                          icon: const Icon(Icons.send),
                          onPressed: () => _submitQuery(_controller.text)),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

// Defining a stateless widget for a message
class Message extends StatelessWidget {
  const Message({this.text, this.type});

  final String? text;
  final String? type;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 10.0, horizontal: 10.0),
      child: type == 'ai'
          ? Text(text!,
              style: const TextStyle(color: Colors.blue, fontSize: 14))
          : Text(text!, style: const TextStyle(fontSize: 14)),
    );
  }
}
