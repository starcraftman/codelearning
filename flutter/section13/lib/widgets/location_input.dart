import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:location/location.dart';
import 'package:flutter/services.dart' show rootBundle;
import 'package:http/http.dart' as http;
import 'dart:convert';

import 'package:section13/models/place.dart';
import 'package:section13/screens/map.dart';
import 'package:section13/models/mapsConsts.dart';

class LocationInput extends StatefulWidget {
  final void Function(PlaceLocation location) onSelectLocation;

  const LocationInput({super.key, required this.onSelectLocation});

  @override
  State<LocationInput> createState() => _LocationInputState();
}

class _LocationInputState extends State<LocationInput> {
  PlaceLocation? _pickedLocation;
  bool _isGettingLocation = false;
  final url = Uri.parse('');
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

  Future<void> _savePlace(double lat, double lng) async {
    final url = Uri.parse("$kMapsGeocode?latlng=$lat,$lng&key=$_apiKey");
    final resp = await http.get(url);
    final resData = json.decode(resp.body);

    final address = resData['results'][0]['formatted_address'];

    setState(() {
      _pickedLocation = PlaceLocation(
        latitude: lat,
        longitude: lng,
        address: address,
      );
      _isGettingLocation = true;
    });

    widget.onSelectLocation(_pickedLocation!);
  }

  void _getCurrentLocation() async {
    Location location = Location();

    bool serviceEnabled = await location.serviceEnabled();
    if (!serviceEnabled) {
      serviceEnabled = await location.requestService();
      if (!serviceEnabled) {
        return;
      }
    }

    PermissionStatus permissionGranted= await location.hasPermission();
    if (permissionGranted == PermissionStatus.denied) {
      permissionGranted = await location.requestPermission();
      if (permissionGranted != PermissionStatus.granted) {
        return;
      }
    }

    setState(() {
      _isGettingLocation = true;
    });

    LocationData locationData = await location.getLocation();
    if (kDebugMode) {
      print(locationData);
    }
    final lat = locationData.latitude;
    final lng = locationData.longitude;

    if (lat == null || lng == null) {
      return;
    }

    _savePlace(lat, lng);
  }

  void _selectOnMap() async {
   final LatLng? picked = await Navigator.of(context).push(MaterialPageRoute(
       builder: (ctx) => const MapScreen()
   ));

   if (picked != null) {
     _savePlace(picked.latitude, picked.longitude);
   }
  }

  @override
  Widget build(BuildContext context) {
    Widget containerContent = Text("No location chosen",
      textAlign: TextAlign.center,
      style: Theme.of(context).textTheme.bodyLarge!.copyWith(
          color: Theme.of(context).colorScheme.onBackground
      ),
    );
    if (_isGettingLocation) {
      containerContent = const CircularProgressIndicator();
    }
    if (_pickedLocation != null) {
      final imageUrl = _pickedLocation!.locationImageUrl(_apiKey);
      containerContent = Image.network(imageUrl,
        fit: BoxFit.cover,
        width: double.infinity,
        height: double.infinity,
      );
    }

    return Column(
      children: [
        Container(
          height: 170,
          width: double.infinity,
          alignment: Alignment.center,
          decoration: BoxDecoration(
            border: Border.all(
              width: 1,
              color: Theme.of(context).colorScheme.primary.withOpacity(0.75)
            )
          ),
          child: containerContent
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            TextButton.icon(
                onPressed: _getCurrentLocation,
                icon: const Icon(Icons.location_on),
                label: const Text("Get Current Location")),
            TextButton.icon(
                onPressed: _selectOnMap,
                icon: const Icon(Icons.map),
                label: const Text("Select On Map")),
          ],
        )
      ],
    );
  }
}
