import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:section14/widgets/user_image_picker.dart';

import 'dart:io';

class AuthScreen extends StatefulWidget {
  const AuthScreen({super.key});

  @override
  State<AuthScreen> createState() {
    return _AuthScreenState();
  }
}

class _AuthScreenState extends State<AuthScreen> {
  final _formKey = GlobalKey<FormState>(debugLabel: "formKey");

  bool _isLogin = false;
  String _userEmail = '';
  String _userPassword = '';
  String _userName = '';
  File? _selectedImage;
  bool _isAuthenticating = false;

  void _submitForm() async {
    if (!_formKey.currentState!.validate()) {
      return;
    }

    if (!_isLogin && _selectedImage == null) {
      return; // Show error msg
    }
    _formKey.currentState!.save();
    if (kDebugMode) {
      print('$_userEmail $_userPassword');
    }

    try {
      setState(() {
        _isAuthenticating = true;
      });
      if (_isLogin) {
        final userCredentials = await FirebaseAuth.instance.signInWithEmailAndPassword(
          email: _userEmail,
          password: _userPassword
        );
        if (kDebugMode) {
          print(userCredentials);
        }
      } else {
        final userCredentials = await FirebaseAuth.instance.createUserWithEmailAndPassword(
          email: _userEmail,
          password: _userPassword
        );
        final storageRef = FirebaseStorage.instance.ref().child('user_images').child('${userCredentials.user!.uid}.jpg');
        await storageRef.putFile(_selectedImage!);
        final imageUrl = await storageRef.getDownloadURL();
        await FirebaseFirestore.instance
            .collection('users')
            .doc(userCredentials.user!.uid)
            .set({
              'username': _userName,
              'email': _userEmail,
              'image_url': imageUrl
        });
        if (kDebugMode) {
          print(userCredentials);
          print(imageUrl);
        }
      }
    } on FirebaseAuthException catch (error) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).clearSnackBars();
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(error.message ?? "Authentication failed.")));
      }
    } finally {
      try {
        if (context.mounted) {
          setState(() {
            _isAuthenticating = false;
          });
        }
      } on FlutterError catch (error) {
        if (kDebugMode) {
          print(error);
        }
      }

    }
  }

  @override
  Widget build(BuildContext context) {
    final formBody = Form(
      key: _formKey,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (!_isLogin)
            UserImagePicker(
              onPickImage: (File pickedImage) {
                _selectedImage = pickedImage;
              },
            ),
          TextFormField(
            decoration: const InputDecoration(labelText: 'Email Address'),
            keyboardType: TextInputType.emailAddress,
            autocorrect: false,
            textCapitalization: TextCapitalization.none,
            validator: (value) {
              if (value == null || value.trim().isEmpty || !value.trim().contains("@")) {
                return 'Please enter a valid email.';
              }

              return null;
            },
            onSaved: (newValue) {
              _userEmail = newValue!;
            },
          ),
          if (!_isLogin)
            TextFormField(
              decoration: const InputDecoration(labelText: 'Username'),
              keyboardType: TextInputType.text,
              enableSuggestions: false,
              autocorrect: false,
              validator: (value) {
                if (value == null || value.trim().isEmpty || value.trim().length < 4) {
                  return 'Please enter a valid username.';
                }

                return null;
              },
              onSaved: (newValue) {
                _userName = newValue!;
              },
            ),
          TextFormField(
            decoration: const InputDecoration(
              labelText: 'Password',
            ),
            obscureText: true,
            validator: (value) {
              if (value == null || value.trim().length < 6) {
                return 'Password must be at least 6 characters.';
              }

              return null;
            },
            onSaved: (newValue) {
              _userPassword = newValue!;
            },
          ),
          const SizedBox(height: 12),
          if (_isAuthenticating)
            const CircularProgressIndicator(),
          if (!_isAuthenticating)
            ElevatedButton(
                onPressed: _submitForm,
                style: ElevatedButton.styleFrom(backgroundColor: Theme.of(context).colorScheme.primaryContainer),
                child: Text(_isLogin ? 'Login' : 'Signup')),
          if (!_isAuthenticating)
            TextButton(
                onPressed: () {
                  setState(() {
                    _isLogin = !_isLogin;
                  });
                },
                child: Text(_isLogin ? 'Create an account' : 'Login')
            )
        ],
      ),
    );

    return Scaffold(
      backgroundColor: Theme.of(context).colorScheme.primary,
      body: Center(
          child: SingleChildScrollView(
              child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            margin: const EdgeInsets.only(
              top: 30,
              bottom: 20,
              left: 20,
              right: 20,
            ),
            width: 200,
            child: Image.asset('assets/images/chat.png'),
          ),
          Card(
              margin: const EdgeInsets.all(20),
              child: SingleChildScrollView(
                  child: Padding(
                      padding: const EdgeInsets.all(16), child: formBody)))
        ],
      ))),
    );
  }
}
