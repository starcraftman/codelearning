import "package:flutter/material.dart";

import "package:section08/data/dummy_data.dart";
import "package:section08/models/category.dart";
import "package:section08/screens/meals.dart";
import "package:section08/widgets/category_grid_item.dart";

import "../models/meal.dart";

class CategoriesScreen extends StatelessWidget {
  final void Function(Meal meal) onToggleFave;
  const CategoriesScreen({super.key, required this.onToggleFave});

  void _selectCategory(BuildContext ctx, Category cat) {
    final filteredMeals = dummyMeals.where((meal) => meal.categories.contains(cat.id)).toList();
    Navigator.push(ctx, MaterialPageRoute(builder: (ctx) => MealsScreen(meals: filteredMeals, title: cat.title, categoryColor: cat.color, onToggleFave: onToggleFave)));
  }

  @override
  Widget build(BuildContext context) {
    final categoryGridItems = availableCategories.map((cat) {
      return CategoryGridItem(category: cat, onTapHandler: () => _selectCategory(context, cat));
    }).toList();
    return GridView(
        padding: const EdgeInsets.all(24),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          crossAxisSpacing: 20,
          mainAxisSpacing: 20,
          childAspectRatio: 3 / 2
        ),
        children: categoryGridItems,
    );
  }


}