import 'dart:convert';

import 'package:flutter/foundation.dart';

class User {
  final String username;
  final String email;
  final List vehicles;
  User({
    required this.username,
    required this.email,
    required this.vehicles,
  });

  User copyWith({
    String? username,
    String? email,
    List? vehicles,
  }) {
    return User(
      username: username ?? this.username,
      email: email ?? this.email,
      vehicles: vehicles ?? this.vehicles,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'username': username,
      'email': email,
      'vehicles': vehicles,
    };
  }

  factory User.fromMap(Map<String, dynamic> map) {
    return User(
      username: map['username'] ?? '',
      email: map['email'] ?? '',
      vehicles: List.from(map['vehicles']),
    );
  }

  String toJson() => json.encode(toMap());

  factory User.fromJson(String source) => User.fromMap(json.decode(source));

  @override
  String toString() =>
      'User(username: $username, email: $email, vehicles: $vehicles)';

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;

    return other is User &&
        other.username == username &&
        other.email == email &&
        listEquals(other.vehicles, vehicles);
  }

  @override
  int get hashCode => username.hashCode ^ email.hashCode ^ vehicles.hashCode;
}
