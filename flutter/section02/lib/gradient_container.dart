import 'package:flutter/material.dart';

import 'package:section02/styled_text.dart';

const startAlignment = Alignment.topLeft;
const endAlignment = Alignment.bottomRight;

class GradientContainer extends StatelessWidget {
  final List<Color> colors;
  const GradientContainer({super.key, required this.colors});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        gradient: LinearGradient(
            colors: colors,
            begin: startAlignment,
            end: endAlignment
        ),
      ),
      child: const Center(
          child: StyledText("Hello World!")
      ),
    );
  }
}