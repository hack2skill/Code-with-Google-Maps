import 'dart:convert';

import 'package:flutter/foundation.dart';

class LoginResponse {
  final int status;
  final Map<String, dynamic> data;
  LoginResponse({
    required this.status,
    required this.data,
  });

  LoginResponse copyWith({
    int? status,
    Map<String, dynamic>? data,
  }) {
    return LoginResponse(
      status: status ?? this.status,
      data: data ?? this.data,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'status': status,
      'data': data,
    };
  }

  factory LoginResponse.fromMap(Map<String, dynamic> map) {
    return LoginResponse(
      status: map['status']?.toInt() ?? 0,
      data: Map<String, dynamic>.from(map['data']),
    );
  }

  String toJson() => json.encode(toMap());

  factory LoginResponse.fromJson(String source) =>
      LoginResponse.fromMap(json.decode(source));

  @override
  String toString() => 'LoginResponse(status: $status, data: $data)';

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;

    return other is LoginResponse &&
        other.status == status &&
        mapEquals(other.data, data);
  }

  @override
  int get hashCode => status.hashCode ^ data.hashCode;
}
