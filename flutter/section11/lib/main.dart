import 'package:flutter/material.dart';
import 'package:section11/screens/grocery.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Grocery App',
      theme: ThemeData.dark().copyWith(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color.fromARGB(255, 147, 229, 250),
          brightness: Brightness.dark,
          surface: const Color.fromARGB(255, 42, 51, 59)
        ),
        scaffoldBackgroundColor: const Color.fromARGB(255, 50, 58, 60)
      ),
      themeMode: ThemeMode.system,
      home: const GroceryScreen(),
    );
  }
}