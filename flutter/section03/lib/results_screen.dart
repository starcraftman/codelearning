import 'package:flutter/material.dart';
import "package:google_fonts/google_fonts.dart";

class ResultsScreen extends StatelessWidget {
  final List<String> selectedAnswers;

  const ResultsScreen(this.selectedAnswers, {super.key});

  @override
  Widget build(BuildContext context) {
    final List<Widget> answersTexts = [
      for (var choice in selectedAnswers) Text(choice)
    ];

    return SizedBox(
      width: double.infinity,
      child: Container(
        margin: const EdgeInsets.all(40),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: answersTexts,
        ),
      ),
    );
  }
}