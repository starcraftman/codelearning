import 'package:flutter/material.dart';
import "package:section08/models/meal.dart";
import "package:section08/widgets/meal_item/meal_item_trait.dart";

class MealItemOverlay extends StatelessWidget {
  final Meal meal;
  const MealItemOverlay({super.key, required this.meal});

  String get affordabilityText {
    return meal.affordability.name[0].toUpperCase() + meal.affordability.name.substring(1);
  }
  String get complexityText {
    return meal.complexity.name[0].toUpperCase() + meal.complexity.name.substring(1);
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.black54,
      child: Column(
        children: [
          Text(
            meal.title,
            maxLines: 2,
            textAlign: TextAlign.center,
            softWrap: true,
            overflow: TextOverflow.ellipsis,
            style: const TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: Colors.white
            )
          ),
          const SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              MealItemTrait(icon: Icons.schedule, label: "${meal.duration} mins"),
              const SizedBox(width: 20),
              MealItemTrait(icon: Icons.work, label: complexityText),
              const SizedBox(width: 20),
              MealItemTrait(icon: Icons.attach_money, label: affordabilityText)
            ],
          )
        ]),
    );
  }

}