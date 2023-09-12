import 'package:flutter/material.dart';
import 'package:section08/screens/categories.dart';
import 'package:section08/screens/meals.dart';

import '../models/meal.dart';

class TabsScreen extends StatefulWidget {
  const TabsScreen({super.key});

  @override
  State<StatefulWidget> createState() {
    return _TabsScreenState();
  }

}

class _TabsScreenState extends State<TabsScreen> {
  int _selectedPageIndex = 0;
  final List<Meal> _favoriteMeals = [];

  void _selectPage(int index) {
    setState(() {
      _selectedPageIndex = index;
    });
  }

  void _showInfoMessage(String msg) {
    ScaffoldMessenger.of(context).clearSnackBars();
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(msg)));
  }

  void _toggleMealFavoriteStatus(Meal meal) {
    final isExisting = _favoriteMeals.contains(meal);

    if (!isExisting) {
      setState(() {
        _favoriteMeals.add(meal);
      });
      _showInfoMessage("Added ${meal.title} to faves.");
    } else {
      setState(() {
        _favoriteMeals.remove(meal);
      });
      _showInfoMessage("Removed ${meal.title} from faves.");
    }

    print("Faves ${_favoriteMeals.toString()}");
  }

  @override
  Widget build(BuildContext context) {
    final bodyContent = _selectedPageIndex == 0
      ? CategoriesScreen(onToggleFave: _toggleMealFavoriteStatus)
      : MealsScreen(meals: _favoriteMeals, categoryColor: Colors.blueAccent, onToggleFave: _toggleMealFavoriteStatus);
    final activePageTitle = _selectedPageIndex == 0 ? "Categories" : "Your Favorites";

    return Scaffold(
      appBar: AppBar(
        title: Text(activePageTitle),
      ),
      body: bodyContent,
      bottomNavigationBar: BottomNavigationBar(
        onTap: _selectPage,
        currentIndex: _selectedPageIndex,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.set_meal), label: "Categories"),
          BottomNavigationBarItem(icon: Icon(Icons.star), label: "Favorites"),
        ],
      ),
    );
  }

}