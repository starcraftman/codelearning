import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:location/location.dart';
import 'package:flutter/services.dart' show rootBundle;
import 'package:http/http.dart' as http;
import 'dart:convert';

import 'package:section13/models/place.dart';

// Format of URL: endPoint?latlng=40.0,-72.0&key=API_KEY
const String kMapsBaseURL = "https://maps.googleapis.com/maps/api";
const String kMapsGeocode = "$kMapsBaseURL/geocode/json";
const String kMapsStatic = "$kMapsBaseURL/staticmap";

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
    // TODO: implement initState
    super.initState();
    rootBundle.loadString('assets/mapsAPI.private').then((value) {
      _apiKey = value.trim();
    });
  }

  String get locationImageUrl {
    if (_pickedLocation == null || _pickedLocation?.longitude == null || _pickedLocation?.latitude == null) {
      return "";
    }

    final lat = _pickedLocation!.latitude;
    final lng = _pickedLocation!.longitude;
    return '$kMapsStatic?center=$lat,$lng&zoom=16&size=600x300&maptype=roadmap&markers=color:red%7Clabel:A%7C$lat,$lng&key=$_apiKey';
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
    final url = Uri.parse("$kMapsGeocode?latlng=$lat,$lng&key=$_apiKey");
    final resp = await http.get(url);
    final resData = json.decode(resp.body);
    if (kDebugMode) {
      print(resData);
    }
    final address = resData['results'][0]['formatted_address'];

    if (lat == null || lng == null) {
      return;
    }
    setState(() {
      _pickedLocation = PlaceLocation(latitude: lat, longitude: lng, address: address);
      _isGettingLocation = false;
    });
    widget.onSelectLocation(_pickedLocation!);
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
      containerContent = Image.network(locationImageUrl,
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
                onPressed: () {},
                icon: const Icon(Icons.map),
                label: const Text("Select On Map")),
          ],
        )
      ],
    );
  }
}
