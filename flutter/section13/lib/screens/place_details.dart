import 'package:flutter/material.dart';
import 'package:section13/models/place.dart';

import 'add_place.dart';

class PlaceDetails extends StatelessWidget {
  final Place place;
  const PlaceDetails(this.place, {super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(place.name),
        actions: [
          IconButton(onPressed: () {
            Navigator.of(context).push(MaterialPageRoute(builder: (context) => const AddPlacesScreen()));
          }, icon: const Icon(Icons.add),)
        ],
      ),
      body: Center(
        child: Text(place.name,
          style: Theme.of(context).textTheme.bodyMedium!.copyWith(
            color: Theme.of(context).colorScheme.secondary
          )
        ),
      ),
    );
  }
}