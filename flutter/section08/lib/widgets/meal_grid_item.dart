import 'package:flutter/material.dart';
import "package:section08/models/meal.dart";

class MealGridItem extends StatelessWidget {
  final Meal meal;

  const MealGridItem({super.key, required this.meal});

  @override
  Widget build(BuildContext context) {
    const borderRadiusVal = 16.0;
    return InkWell(
      onTap: () {
      },
      borderRadius: BorderRadius.circular(borderRadiusVal),
      splashColor: Theme.of(context).primaryColor,
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(image: DecorationImage(image: NetworkImage(meal.imageUrl))),
        child: Text(
            meal.title,
            style: Theme.of(context).textTheme.titleLarge!.copyWith(
              color: Theme.of(context).colorScheme.onBackground,
            )
        ),
      ),
    );
  }
}