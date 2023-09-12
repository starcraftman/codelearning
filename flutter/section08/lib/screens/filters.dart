import 'package:flutter/material.dart';

class FoodFilters {
  final bool glutenFree;
  final bool lactoseFree;
  final bool vegetarian;
  final bool vegan;

  FoodFilters({required this.glutenFree, required this.lactoseFree, required this.vegetarian, required this.vegan});
  FoodFilters.initial(): glutenFree = false, lactoseFree = false, vegetarian = false, vegan = false;

  @override
  String toString() {
    return "Active Filters: g $glutenFree l $lactoseFree ve $vegetarian vn $vegan";
  }
}

class FiltersScreen extends StatefulWidget {
  final FoodFilters initFilters;
  const FiltersScreen({super.key, required this.initFilters});

  @override
  State<StatefulWidget> createState() {
    return _FiltersScreenState();
  }
}

class _FiltersScreenState extends State<FiltersScreen> {
  FoodFilters filters = FoodFilters.initial();

  @override
  void initState() {
    super.initState();
    filters = widget.initFilters;
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () async {
        Navigator.of(context).pop(filters);
        return false;
      },
      child: Scaffold(
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
              onChange: (bool state) {
              setState(() {
                filters = FoodFilters(
                  glutenFree: state,
                  lactoseFree: filters.lactoseFree,
                  vegetarian: filters.vegetarian,
                  vegan: filters.vegan
                );
              });
              }, title: "Gluten-free",
              subtitle: "Only include gluten-free meals.",
            ),
            _SwitchTile(
              state: filters.lactoseFree,
              onChange: (bool state) {
                setState(() {
                  filters = FoodFilters(
                    glutenFree: filters.glutenFree,
                    lactoseFree: state,
                    vegetarian: filters.vegetarian,
                    vegan: filters.vegan
                  );
                });
              }, title: "Lactose-free",
              subtitle: "Only include meals with no dairy."
            ),
            _SwitchTile(
              state: filters.vegetarian,
              onChange: (bool state) {
                setState(() {
                  filters = FoodFilters(
                    glutenFree: filters.glutenFree,
                    lactoseFree: filters.lactoseFree,
                    vegetarian: state,
                    vegan: filters.vegan
                  );
                });
              }, title: "Vegetarian",
              subtitle: "Only include vegetarian meals."
            ),
            _SwitchTile(
              state: filters.vegan,
              onChange: (bool state) {
                setState(() {
                  filters = FoodFilters(
                    glutenFree: filters.glutenFree,
                    lactoseFree: filters.lactoseFree,
                    vegetarian: filters.vegetarian,
                    vegan: state,
                  );
                });
              }, title: "Vegan",
              subtitle: "Only include vegan meals."
            ),
        ],)
      ),
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
