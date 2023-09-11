import 'package:flutter/material.dart';

import "package:section08/models/meal.dart";
import "package:section08/widgets/meal_grid_item.dart";

class MealsScreen extends StatelessWidget {
  final List<Meal> meals;
  final String title;

  const MealsScreen({super.key, required this.meals, required this.title});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(title),
      ),
      body: GridView(
        padding: const EdgeInsets.all(24),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          crossAxisSpacing: 20,
          mainAxisSpacing: 20,
          childAspectRatio: 3 / 2),
        children: meals.map((meal) => MealGridItem(meal: meal)).toList(),
      ),
    );
  }
}
