import 'package:flutter/material.dart';
import 'package:flutter/services.dart' show rootBundle;

import 'package:section13/models/place.dart';
import 'package:section13/screens/map.dart';
import 'add_place.dart';

class PlaceDetails extends StatefulWidget {
  final Place place;
  const PlaceDetails(this.place, {super.key});

  @override
  State<PlaceDetails> createState() => _PlaceDetailsState();
}

class _PlaceDetailsState extends State<PlaceDetails> {
  late final String _apiKey;

  @override
  void initState() {
    super.initState();
    rootBundle.loadString('assets/mapsAPI.private').then((value) {
      setState(() {
        _apiKey = value.trim();
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.place.name),
        actions: [
          IconButton(onPressed: () {
            Navigator.of(context).push(MaterialPageRoute(builder: (context) => const AddPlacesScreen()));
          }, icon: const Icon(Icons.add),)
        ],
      ),
      body: Stack(
        children: [
          Image.file(
            widget.place.image,
            fit: BoxFit.cover,
            width: double.infinity,
            height: double.infinity,
          ),
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: Column(
              children: [
              GestureDetector(
                onTap: () {
                  Navigator.of(context).push(MaterialPageRoute(
                    builder: (ctx) => MapScreen(location: widget.place.location, isSelecting: false)
                  ));
                },
                child: CircleAvatar(
                  radius: 70,
                  backgroundImage: NetworkImage(widget.place.location.locationImageUrl(_apiKey)
                  )
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: 24,
                  vertical: 16
                ),
                decoration: const BoxDecoration(
                  gradient: LinearGradient(
                    colors: [Colors.transparent, Colors.black54],
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter
                  ),
                ),
                alignment: Alignment.center,
                child: Text(widget.place.location.address,
                  textAlign: TextAlign.center,
                  style: Theme.of(context).textTheme.titleLarge!.copyWith(
                    color: Theme.of(context).colorScheme.onBackground
                  ),
                )
              )],
            )
          )
        ],
      )
    );
  }
}