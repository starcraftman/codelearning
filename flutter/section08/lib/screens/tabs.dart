import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'package:section08/providers/filters_provider.dart';
import 'package:section08/providers/meals_provider.dart';
import 'package:section08/providers/favorites_provider.dart';
import 'package:section08/screens/categories.dart';
import 'package:section08/screens/filters.dart';
import 'package:section08/screens/meals.dart';
import 'package:section08/widgets/tabs_drawer.dart';

class TabsScreen extends ConsumerStatefulWidget {
  const TabsScreen({super.key});

  @override
  ConsumerState<TabsScreen> createState() {
    return _TabsScreenState();
  }
}

class _TabsScreenState extends ConsumerState<TabsScreen> {
  int _selectedPageIndex = 0;

  void _selectPage(int index) {
    setState(() {
      _selectedPageIndex = index;
    });
  }

  void _setScreen(String identifier) async {
    Navigator.pop(context);
    if (identifier == "Filters") {
      await Navigator.of(context).push(
          MaterialPageRoute(builder: (ctx) => const FiltersScreen())
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final filtersSelected = ref.watch(filtersProvider);
    final allMeals = ref.watch(mealsProvider);
    final availableMeals = allMeals.where((meal) {
      if (filtersSelected.glutenFree && !meal.isGlutenFree) {
        return false;
      }
      if (filtersSelected.lactoseFree && !meal.isLactoseFree) {
        return false;
      }
      if (filtersSelected.vegetarian && !meal.isVegetarian) {
        return false;
      }
      if (filtersSelected.vegan && !meal.isVegan) {
        return false;
      }

      return true;
    }).toList();
    final favoriteMeals = ref.watch(favoriteMealsProvider);
    final bodyContent = _selectedPageIndex == 0
      ? CategoriesScreen(availableMeals: availableMeals)
      : MealsScreen(meals: favoriteMeals, categoryColor: Colors.blueAccent);
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