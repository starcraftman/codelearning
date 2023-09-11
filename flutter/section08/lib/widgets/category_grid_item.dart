import "package:flutter/material.dart";
import "package:section08/models/category.dart";

class CategoryGridItem extends StatelessWidget {
  final Category category;
  final Function() onTapHandler;

  const CategoryGridItem({super.key, required this.category, required this.onTapHandler});

  @override
  Widget build(BuildContext context) {
    const borderRadiusVal = 16.0;
    return InkWell(
      onTap: onTapHandler,
      borderRadius: BorderRadius.circular(borderRadiusVal),
      splashColor: Theme.of(context).primaryColor,
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(borderRadiusVal),
          gradient: LinearGradient(
            colors: [
              category.color.withOpacity(0.55),
              category.color.withOpacity(0.9)
            ],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight
          ),
        ),
        child: Text(
          category.title,
          style: Theme.of(context).textTheme.titleLarge!.copyWith(
            color: Theme.of(context).colorScheme.onBackground,
          )
        ),
      ),
    );
  }
}
