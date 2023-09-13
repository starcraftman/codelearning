import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'package:section13/models/place.dart';
import 'package:section13/providers/places_provider.dart';
import 'package:section13/screens/place_details.dart';

class PlacesList extends ConsumerWidget {
  final List<Place> places;

  const PlacesList({super.key, required this.places});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    Widget content = Center(
        child: Text("No places, add one.",
          style: Theme.of(context).textTheme.titleLarge!.copyWith(
              color: Theme.of(context).colorScheme.onBackground
          ),
        )
    );

    if (places.isNotEmpty) {
      if (kDebugMode) {
        print("Places found.");
        print(places);
      }

      content = ListView.builder(
        itemCount: places.length,
        itemBuilder: (context, index) {
          final place = places[index];
          return Dismissible(
            key: ValueKey(place),
            onDismissed: (direction) {
              ref.read(placesProvider.notifier).removePlace(place);
            },
            child: ListTile(
              leading: CircleAvatar(
                radius: 26,
                backgroundImage: FileImage(place.image),
              ),
              title: Text(place.name,
                style: Theme.of(context).textTheme.titleMedium!.copyWith(
                  color: Theme.of(context).colorScheme.onBackground
                ),
              ),
              onTap: () {
                Navigator.of(context).push(MaterialPageRoute(
                    builder: (context) => PlaceDetails(place)
                ));
              },
            ),
          );
        },
      );
    }

    return content;
  }
}
