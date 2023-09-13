import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:section13/providers/places_provider.dart';
import 'package:section13/screens/add_place.dart';
import 'package:section13/screens/place_details.dart';

class HomeScreen extends ConsumerWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final places = ref.watch(placesProvider);
    Widget content = Center(
        child: Text("No places, add one.",
          style: Theme.of(context).textTheme.titleLarge!.copyWith(
            color: Colors.white,
          ))
    );

    if (places.isNotEmpty) {
      if (kDebugMode) {
        print("Places found.");
        print(places);
      }
      content = Padding(
        padding: const EdgeInsets.all(12),
        child: ListView.builder(
          itemCount: places.length,
          itemBuilder: (context, index) {
            final place = places[index];
            return ListTile(
              title: Text(place.name),
              onTap: () {
                Navigator.of(context).push(MaterialPageRoute(builder: (context) => PlaceDetails(place)));
              },
            );
        },)
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text("Your Places"),
        actions: [
          IconButton(onPressed: () {
            Navigator.of(context).push(MaterialPageRoute(builder: (context) => const AddPlacesScreen()));
          }, icon: const Icon(Icons.add),)
        ],
      ),
      body: content,
    );
  }
}