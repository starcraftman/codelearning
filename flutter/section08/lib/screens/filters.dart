import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'package:section08/providers/filters_provider.dart';

class FiltersScreen extends ConsumerWidget {
  const FiltersScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final filtersNotifier = ref.watch(filtersProvider.notifier);
    final filters = ref.watch(filtersProvider);

    return Scaffold(
        appBar: AppBar(
          title: const Text("Your Filters"),
        ),
        // drawer: TabsDrawer(onSelectScreen: (String identifier) {
        //   Navigator.pop(context);
        //   if (identifier == "Meals") {
        //     Navigator.of(context).push(MaterialPageRoute(builder: (ctx) => const FiltersScreen()));
        //   }
        // }),
        body: Column(
          children: [
            _SwitchTile(
              state: filters.glutenFree,
              onChange: (bool isActive) {
                filtersNotifier.setFilter(FilterType.glutenFree, isActive);
              }, title: "Gluten-free",
              subtitle: "Only include gluten-free meals.",
            ),
            _SwitchTile(
              state: filters.lactoseFree,
              onChange: (bool isActive) {
                filtersNotifier.setFilter(FilterType.lactoseFree, isActive);
              }, title: "Lactose-free",
              subtitle: "Only include meals with no dairy."
            ),
            _SwitchTile(
              state: filters.vegetarian,
              onChange: (bool isActive) {
                filtersNotifier.setFilter(FilterType.vegetarian, isActive);
              }, title: "Vegetarian",
              subtitle: "Only include vegetarian meals."
            ),
            _SwitchTile(
              state: filters.vegan,
              onChange: (bool isActive) {
                filtersNotifier.setFilter(FilterType.vegan, isActive);
              }, title: "Vegan",
              subtitle: "Only include vegan meals."
            ),
        ],)
    );
  }
}

class _SwitchTile extends StatelessWidget {
  final bool state;
  final void Function(bool newState) onChange;
  final String title;
  final String subtitle;

  const _SwitchTile({required this.state, required this.onChange, required this.title, required this.subtitle});

  @override
  Widget build(BuildContext context) {
    return SwitchListTile(
      value: state,
      onChanged: onChange,
      title: Text(title,
        style: Theme.of(context).textTheme.titleLarge!.copyWith(
          color: Theme.of(context).colorScheme.onBackground
        ),
      ),
      subtitle: Text(subtitle),
      activeColor: Theme.of(context).colorScheme.tertiary,
      contentPadding: const EdgeInsets.only(left: 34, right: 22),
      selected: state,
    );
  }
}
