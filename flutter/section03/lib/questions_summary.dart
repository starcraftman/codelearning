import "package:flutter/material.dart";

class QuestionsSummary extends StatelessWidget {
  final List<Map<String, Object>> summaryData;

  const QuestionsSummary(this.summaryData, {super.key});

  @override
  Widget build(BuildContext context) {
    final summaryChildren = summaryData.map((item) {
      final circleColor =
          (item["is_correct"] as bool) ? Colors.blue : Colors.red;
      return Row(crossAxisAlignment: CrossAxisAlignment.center, children: [
        Container(
          decoration: BoxDecoration(shape: BoxShape.circle, color: circleColor),
          alignment: Alignment.center,
          width: 40,
          margin: const EdgeInsets.only(bottom: 40),
          child: Text(((item["question_index"] as num) + 1).toString()),
        ),
        Expanded(
          child:
              Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(item["question"] as String,
                textAlign: TextAlign.left,
                style: const TextStyle(color: Colors.white, fontSize: 16)),
            const SizedBox(height: 5),
            Text(item["user_answer"] as String,
                textAlign: TextAlign.left,
                style: const TextStyle(color: Colors.red)),
            Text(item["correct_answer"] as String,
                style: const TextStyle(color: Colors.blue))
          ]),
        )
      ]);
    }).toList();

    // var iconData = ? Icons.check_circle_outline_outlined : Icons.close_outlined;
    return SizedBox(
        height: 300,
        child: SingleChildScrollView(child: Column(children: summaryChildren)));
  }
}
