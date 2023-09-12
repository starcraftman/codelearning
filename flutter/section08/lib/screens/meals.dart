import 'package:flutter/material.dart';

import "package:section08/models/meal.dart";
import 'package:section08/widgets/meal_item/meal_item.dart';

class MealsScreen extends StatelessWidget {
  final Color categoryColor;
  final List<Meal> meals;
  final String? title;

  const MealsScreen({super.key, required this.meals, this.title, required this.categoryColor});

  @override
  Widget build(BuildContext context) {
    Widget bodyWidget = Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
             Text(
                "Uh oh ... nothing here",
                style: Theme.of(context).textTheme.headlineLarge!.copyWith(
                    color: Theme.of(context).colorScheme.onBackground
                )
            ),
            const SizedBox(height: 16),
            Text(
                "Try selecting a different category!",
                style: Theme.of(context).textTheme.bodyLarge!.copyWith(
                    color: Theme.of(context).colorScheme.onBackground
                )
            )
          ],
        )
    );

    if (meals.isNotEmpty) {
      bodyWidget = ListView.builder(
          itemCount: meals.length,
          itemBuilder: (ctx, index) {
            return MealItem(
                meal: meals[index],
                key: ValueKey(meals[index])
            );
          });
    }

    if (title == null) {
      return bodyWidget;
    }

    return Scaffold(
        appBar: AppBar(
          title: Text(title!),
          backgroundColor: categoryColor,
        ),
        body : bodyWidget
    );
  }
}
