import 'package:flutter/material.dart';

class QuestionsScreen extends StatefulWidget {
  const QuestionsScreen({super.key});

  @override
  State<StatefulWidget> createState() {
    return _QuestionsScreenState();
  }
}

class _QuestionsScreenState extends State<QuestionsScreen> {
  String question = "How many legs on my cat?";
  List<String> choices = ["2 legs", "3 legs", "4 legs", "5 legs"];
  String answer = "4 legs";

  void setQuestion({required question, required choices, required answer}) {
    this.question = question;
    this.choices = choices;
    this.answer = answer;
  }

  void verify(int choice) {
    if (choices[choice] == answer) {
      print("Correct answer");
    } else {
      print("Wrong!!!");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(mainAxisSize: MainAxisSize.min, children: [
        const SizedBox(height: 20),
        Text(question,
            style: const TextStyle(fontSize: 32, color: Colors.white)),
        const SizedBox(height: 20),
        TextButton(
          onPressed: () {
            return verify(0);
          },
          style: TextButton.styleFrom(
              foregroundColor: Colors.white,
              textStyle: const TextStyle(fontSize: 28)),
          child: Text(choices[0]),
        ),
        const SizedBox(height: 20),
        TextButton(
            onPressed: () {
              return verify(1);
            },
            style: TextButton.styleFrom(
                foregroundColor: Colors.white,
                textStyle: const TextStyle(fontSize: 28)),
            child: Text(choices[1])),
        const SizedBox(height: 20),
        TextButton(
            onPressed: () {
              return verify(2);
            },
            style: TextButton.styleFrom(
                foregroundColor: Colors.white,
                textStyle: const TextStyle(fontSize: 28)),
            child: Text(choices[2])),
        const SizedBox(height: 20),
        TextButton(
            onPressed: () {
              return verify(3);
            },
            style: TextButton.styleFrom(
                foregroundColor: Colors.white,
                textStyle: const TextStyle(fontSize: 28)),
            child: Text(choices[3])),
      ]),
    );
  }
}
