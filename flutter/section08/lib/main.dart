import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import "package:section08/screens/categories.dart";
import "package:section08/screens/meals.dart";
import "package:section08/data/dummy_data.dart";

final theme = ThemeData(
  useMaterial3: true,
  colorScheme: ColorScheme.fromSeed(
    brightness: Brightness.dark,
    seedColor: const Color.fromARGB(255, 131, 57, 0),
  ),
  textTheme: GoogleFonts.latoTextTheme(),
);

void main() {
  runApp(const App());
}

class App extends StatefulWidget {
  const App({super.key});

  @override
  State<App> createState() => _AppState();
}

class _AppState extends State<App> {
  MealsScreen? mealScreen;

  setCategoriesScreen() {
    setState(() {
      mealScreen = null;
    });
  }
  setMealsScreen({required String title}) {
    setState(() {
      mealScreen = MealsScreen(meals: dummyMeals, title: title);
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        theme: theme,
        home: mealScreen ?? CategoriesScreen(changeToMealsScreen: setMealsScreen,)
    );
  }
}
