import 'package:flutter/material.dart';

import "package:section03/quiz_body.dart";

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Quiz App',
      // theme: ThemeData(
      //   primarySwatch: Colors.purple,
      // ),
      home: Scaffold(
          // appBar: AppBar(
          //   title: const Text('Quiz App'),
          // ),

          body: Container(
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                colors: [Colors.purple, Colors.deepPurple],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight

              )
            ),
            child: const QuizHome(),
          )
      ),
    );
  }
}