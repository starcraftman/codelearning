import "package:flutter/material.dart";

import "package:section08/data/dummy_data.dart";
import "package:section08/widgets/category_grid_item.dart";

class CategoriesScreen extends StatelessWidget {
  final Function({required String title}) changeToMealsScreen;
  const CategoriesScreen({super.key, required this.changeToMealsScreen});

  @override
  Widget build(BuildContext context) {
    final categoryGridItems = availableCategories.map((x) => CategoryGridItem(category: x, onTapHandler: changeToMealsScreen)).toList();
    return Scaffold(
      appBar: AppBar(
        title: const Text("Pick your category"),
      ),
      body: GridView(
        padding: const EdgeInsets.all(24),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          crossAxisSpacing: 20,
          mainAxisSpacing: 20,
          childAspectRatio: 3 / 2
        ),
        children: categoryGridItems,
      ),
    );
  }


}