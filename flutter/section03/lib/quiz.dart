import 'package:flutter/material.dart';
import "package:section03/questions_screen.dart";
import "package:section03/start_screen.dart";

class Quiz extends StatefulWidget {
  const Quiz({super.key});

  @override
  State<StatefulWidget> createState() {
    return _QuizState();
  }
}

class _QuizState extends State<Quiz> {
  String activeScreen = "start-screen";

  void switchScreen() {
    setState(() {
      activeScreen = "questions-screen";
    });
  }

  @override
  Widget build(BuildContext context) {
    Widget screenWidget = StartScreen(switchScreen);
    if (activeScreen == "questions-screen") {
      screenWidget = const QuestionsScreen();
    }

    return MaterialApp(
      title: 'Quiz App',
      home: Scaffold(
          body: Container(
        decoration: const BoxDecoration(
            gradient: LinearGradient(
                colors: [Colors.purple, Colors.deepPurple],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight)),
        child: screenWidget,
      )),
    );
  }
}
