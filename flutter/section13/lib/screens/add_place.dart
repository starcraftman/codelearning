import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'package:section13/models/place.dart';
import 'package:section13/providers/places_provider.dart';
import 'package:section13/widgets/image_input.dart';
import 'package:section13/widgets/location_input.dart';

class AddPlacesScreen extends ConsumerStatefulWidget {
  const AddPlacesScreen({super.key});

  @override
  ConsumerState<ConsumerStatefulWidget> createState() {
    return _AddPlaceScreenState();
  }
}

class _AddPlaceScreenState extends ConsumerState<AddPlacesScreen> {
  final _formKey = GlobalKey<FormState>();
  String _enteredPlace = "";
  File? _selectedImage;
  PlaceLocation? _selectedLocation;

  void _submitPlace() {
    if (!_formKey.currentState!.validate() || _selectedImage == null || _selectedLocation == null) {
      return;
    }

    print("Before addPlace");
    print(_selectedLocation);
    _formKey.currentState!.save();
    ref.read(placesProvider.notifier).addPlace(
      name: _enteredPlace,
      image: _selectedImage!,
      location: _selectedLocation!
    );
    Navigator.of(context).pop();
  }
  void _selectImage(File? image) {
    _selectedImage = image;
  }
  void _selectLocation(PlaceLocation? location) {
    print("Returned Location: $location");
    _selectedLocation = location;
  }

  @override
  Widget build(BuildContext context) {
    final formBody = Form(
      key: _formKey,
      child: Column(
        children: [
          TextFormField(
            validator: (value) {
              if (value == null || value.trim().isEmpty || value.trim().length < 3) {
                return "Place names should be at least 3 characters.";
              }

              return null;
            },
            onSaved: (newValue) {
              _enteredPlace = newValue!;
            },
            style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                color: Theme.of(context).colorScheme.onBackground
            ),
            decoration: const InputDecoration(labelText: "Title")
          ),
          const SizedBox(height: 10,),
          ImageInput(onSelectImage: _selectImage),
          const SizedBox(height: 10,),
          LocationInput(onSelectLocation: _selectLocation),
          const SizedBox(height: 16,),
          ElevatedButton.icon(
            onPressed: () {
              _submitPlace();
            },
            icon: const Icon(Icons.add, size: 24,),
            label: const Text("Add Place") ,
          )
        ],
      )
    );

    return Scaffold(
      appBar: AppBar(
        title: const Text("Add new Place"),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(12.0),
        child: formBody
      ),
    );
  }
}