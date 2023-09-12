import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:section08/providers/meals_provider.dart';

enum FilterType {
  glutenFree,
  lactoseFree,
  vegetarian,
  vegan
}

class FoodFilters {
  bool glutenFree;
  bool lactoseFree;
  bool vegetarian;
  bool vegan;

  FoodFilters({required this.glutenFree, required this.lactoseFree, required this.vegetarian, required this.vegan});
  FoodFilters.initial(): glutenFree = false, lactoseFree = false, vegetarian = false, vegan = false;
  FoodFilters clone() {
    return FoodFilters(glutenFree: glutenFree, lactoseFree: lactoseFree, vegetarian: vegetarian, vegan: vegan);
  }

  FoodFilters setGlutenFree(bool newVal) {
    final filters = clone();
    filters.glutenFree = newVal;
    return filters;
  }
  FoodFilters setLactoseFree(bool newVal) {
    final filters = clone();
    filters.lactoseFree = newVal;
    return filters;
  }
  FoodFilters setVegetarian(bool newVal) {
    final filters = clone();
    filters.vegetarian = newVal;
    return filters;
  }
  FoodFilters setVegan(bool newVal) {
    final filters = clone();
    filters.vegan = newVal;
    return filters;
  }

  @override
  String toString() {
    return "Active Filters: g $glutenFree l $lactoseFree ve $vegetarian vn $vegan";
  }
}

class FiltersNotifier extends StateNotifier<FoodFilters> {
  FiltersNotifier() : super(FoodFilters.initial());

  void setFilters(FoodFilters foodFilters) {
    state = foodFilters;
  }

  setFilter(FilterType filterType, bool isActive) {
    if (filterType == FilterType.glutenFree) {
      state = state.setGlutenFree(isActive);
    } else if (filterType == FilterType.lactoseFree) {
      state = state.setLactoseFree(isActive);
    } else if (filterType == FilterType.vegetarian) {
      state = state.setVegetarian(isActive);
    } else if (filterType == FilterType.vegan) {
      state = state.setVegan(isActive);
    }
  }
}

final filtersProvider = StateNotifierProvider<FiltersNotifier, FoodFilters>((ref) => FiltersNotifier());

final filteredMealsProvider = Provider((ref) {
  final availableMeals = ref.watch(mealsProvider);
  final filtersSelected = ref.watch(filtersProvider);
  final filteredMeals = availableMeals.where((meal) {
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

  return filteredMeals;
});