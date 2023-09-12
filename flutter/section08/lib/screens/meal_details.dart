import 'package:flutter/material.dart';
import "package:flutter_riverpod/flutter_riverpod.dart";
import "package:transparent_image/transparent_image.dart";

import "package:section08/models/meal.dart";
import 'package:section08/providers/favorites_provider.dart';

class MealDetailsScreen extends ConsumerWidget {
  final Meal meal;

  const MealDetailsScreen({super.key, required this.meal});
  
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final faves = ref.watch(favoriteMealsProvider);
    final bool isFaved = faves.contains(meal);

    return Scaffold(
      appBar: AppBar(
        actions: [
          IconButton(
            onPressed: () {
              final wasAdded = ref.read(favoriteMealsProvider.notifier)
                .toggleFavoriteStatus(meal);
              final msg = wasAdded ? "Added ${meal.title} to faves." : "Removed ${meal.title} from faves.";
              ScaffoldMessenger.of(context).clearSnackBars();
              ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(msg)));
            },
            icon: AnimatedSwitcher(
              duration: const Duration(milliseconds: 300),
              child: Icon(isFaved ? Icons.star : Icons.star_border, key: ValueKey(isFaved)),
              transitionBuilder: (child, animation) {
                return RotationTransition(
                  turns: Tween(begin: 0.5, end: 1.0).animate(animation),
                  child: child,
                );
              },
            ),
            color: isFaved ? Colors.yellow : null,
          )
        ],
        title: Text(meal.title),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Hero(
              tag: meal.id,
              child: FadeInImage(
                placeholder: MemoryImage(kTransparentImage),
                image: NetworkImage(meal.imageUrl),
                fit: BoxFit.cover,
                height: 400,
                width: double.infinity,
              ),
            ),
            const SizedBox(height: 14),
            Text("Ingredients",
              style: Theme.of(context).textTheme.titleLarge!.copyWith(
                color: Theme.of(context).colorScheme.primary,
                fontWeight: FontWeight.bold,
                decoration: TextDecoration.underline
              )
            ),
            const SizedBox(height: 14),
            for (final ingredient in meal.ingredients)
            Text(ingredient,
              style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                color: Theme.of(context).colorScheme.onBackground,
              ),
            ),
            const SizedBox(height: 14),
            Text("Steps",
                style: Theme.of(context).textTheme.titleLarge!.copyWith(
                    color: Theme.of(context).colorScheme.primary,
                    fontWeight: FontWeight.bold,
                    decoration: TextDecoration.underline
                )
            ),
            const SizedBox(height: 14),
            for (final ingredient in meal.steps)
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                child: Text(ingredient,
                  textAlign: TextAlign.center,
                  style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                    color: Theme.of(context).colorScheme.onBackground,
                  ),
                ),
              )
          ],
        ),
      ),
    );
  }
}
