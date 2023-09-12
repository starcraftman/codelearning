import 'package:flutter/material.dart';

class TabsDrawer extends StatelessWidget {
  final void Function(String identifier) onSelectScreen;
  const TabsDrawer({super.key, required this.onSelectScreen});

  @override
  Widget build(BuildContext context) {
    final appTheme = Theme.of(context);
    return Drawer(
      child: Column(children: [
        DrawerHeader(
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [appTheme.colorScheme.primaryContainer, appTheme.colorScheme.primaryContainer.withOpacity(0.8)],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
          ),
          child: Row(
            children: [
              Icon(Icons.fastfood, size: 48, color: appTheme.colorScheme.primary),
              const SizedBox(width: 18),
              Text("Cooking Up!",
                style: appTheme.textTheme.titleLarge!.copyWith(
                  color: appTheme.colorScheme.primary
                )
              )
            ],
          )
        ),
        ListTile(
          leading: Icon(Icons.restaurant, size: 26, color: appTheme.colorScheme.onBackground),
          title: Text("Meals",
            style: appTheme.textTheme.titleSmall!.copyWith(
                color: appTheme.colorScheme.onBackground,
                fontSize: 24
            ),
          ),
          onTap: () {
            onSelectScreen("Meals");
          },
        ),
        ListTile(
          leading: Icon(Icons.settings, size: 26, color: appTheme.colorScheme.onBackground),
          title: Text("Filters",
            style: appTheme.textTheme.titleSmall!.copyWith(
                color: appTheme.colorScheme.onBackground,
                fontSize: 24
            ),
          ),
          onTap: () {
            onSelectScreen("Filters");
          },
        ),
      ]),
    );
  }
}