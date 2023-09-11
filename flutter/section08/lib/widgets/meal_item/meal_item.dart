import 'package:flutter/material.dart';
import "package:transparent_image/transparent_image.dart";

import "package:section08/models/meal.dart";

import 'meal_item_overlay.dart';

class MealItem extends StatelessWidget {
  final Meal meal;

  const MealItem({super.key, required this.meal});

  @override
  Widget build(BuildContext context) {
    const borderRadiusVal = 16.0;
    return Card(
      margin: const EdgeInsets.all(8),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
      clipBehavior: Clip.hardEdge,
      elevation: 2,
      child: InkWell(
        onTap: () {
        },
        borderRadius: BorderRadius.circular(borderRadiusVal),
        splashColor: Theme.of(context).primaryColor,
        child: Stack(
          children: [
            FadeInImage(
              placeholder: MemoryImage(kTransparentImage),
              image: NetworkImage(meal.imageUrl),
              fit: BoxFit.cover,
              height: 200,
              width: double.infinity,
            ),
            Positioned(
              bottom: 0,
              left: 0,
              right: 0,
              child: MealItemOverlay(meal: meal)
            )
          ]
        ),
      ),
    );
  }
}