import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:section08/data/dummy_data.dart';
import 'package:section08/screens/categories.dart';
import 'package:section08/screens/filters.dart';
import 'package:section08/screens/meals.dart';

import '../models/meal.dart';
import 'package:section08/widgets/tabs_drawer.dart';

class TabsScreen extends StatefulWidget {
  const TabsScreen({super.key});

  @override
  State<StatefulWidget> createState() {
    return _TabsScreenState();
  }

}

class _TabsScreenState extends State<TabsScreen> {
  FoodFilters filters = FoodFilters(
      glutenFree: false,
      lactoseFree: false,
      vegetarian: false,
      vegan: false
  );
  int _selectedPageIndex = 0;
  final List<Meal> _favoriteMeals = [];

  void _selectPage(int index) {
    setState(() {
      _selectedPageIndex = index;
    });
  }

  void _setScreen(String identifier) async {
    Navigator.pop(context);
    if (identifier == "Filters") {
      final result = await Navigator.of(context).push<FoodFilters>(
          MaterialPageRoute(builder: (ctx) => FiltersScreen(initFilters: filters))
      );
      setState(() {
        filters = result ?? FoodFilters.initial();
      });
    }
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

    if (kDebugMode) {
      print("Faves ${_favoriteMeals.toString()}");
    }
  }

  @override
  Widget build(BuildContext context) {
    final availableMeals = dummyMeals.where((meal) {
      if (filters.glutenFree && !meal.isGlutenFree) {
        return false;
      }
      if (filters.lactoseFree && !meal.isLactoseFree) {
        return false;
      }
      if (filters.vegetarian && !meal.isVegetarian) {
        return false;
      }
      if (filters.vegan && !meal.isVegan) {
        return false;
      }

      return true;
    }).toList();
    final bodyContent = _selectedPageIndex == 0
      ? CategoriesScreen(onToggleFave: _toggleMealFavoriteStatus, availableMeals: availableMeals)
      : MealsScreen(meals: _favoriteMeals, categoryColor: Colors.blueAccent, onToggleFave: _toggleMealFavoriteStatus);
    final activePageTitle = _selectedPageIndex == 0 ? "Categories" : "Your Favorites";

    return Scaffold(
      appBar: AppBar(
        title: Text(activePageTitle),
      ),
      body: bodyContent,
      drawer: TabsDrawer(onSelectScreen: _setScreen),
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