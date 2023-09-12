import "package:flutter/material.dart";

import "package:section08/data/dummy_data.dart";
import "package:section08/models/category.dart";
import "package:section08/screens/meals.dart";
import "package:section08/widgets/category_grid_item.dart";

import "../models/meal.dart";

class CategoriesScreen extends StatefulWidget {
  final List<Meal> availableMeals;
  const CategoriesScreen({super.key, required this.availableMeals});

  @override
  State<CategoriesScreen> createState() => _CategoriesScreenState();
}

class _CategoriesScreenState extends State<CategoriesScreen> with SingleTickerProviderStateMixin {
  late final AnimationController _animationController;

  @override
  void initState() {
    super.initState();

    _animationController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 300),
      lowerBound: 0,
      upperBound: 1
    );
    _animationController.forward();
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  void _selectCategory(BuildContext ctx, Category cat) {
    final filteredMeals = widget.availableMeals.where((meal) => meal.categories.contains(cat.id)).toList();
    Navigator.push(ctx, MaterialPageRoute(builder: (ctx) => MealsScreen(meals: filteredMeals, title: cat.title, categoryColor: cat.color)));
  }

  @override
  Widget build(BuildContext context) {
    final categoryGridItems = availableCategories
      .where((cat) {
        return widget.availableMeals.where((meal) => meal.categories.contains(cat.id)).isNotEmpty;
      })
      .map((cat) {
        return CategoryGridItem(category: cat, onTapHandler: () => _selectCategory(context, cat));
      })
      .toList();

    return AnimatedBuilder(
      animation: _animationController,
      builder: (BuildContext context, Widget? child) {
        return SlideTransition(position: Tween(
            begin: const Offset(0.3, 0.6),
            end: const Offset(0, 0),
          ).animate(CurvedAnimation(parent: _animationController, curve: Curves.easeInOut),
        ), child: child);
      },
      child: GridView(
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