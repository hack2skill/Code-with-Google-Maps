import 'dart:convert';

class RestResponse {
  int? _status;
  String? _detail;

  int? get status => _status;

  String? get detail => _detail;

  RestResponse({int? status, String? detail}) {
    _status = status;
    _detail = detail;
  }

  RestResponse.fromJson(dynamic json) {
    json = jsonDecode(json);
    _status = json["status"];
    _detail = json["detail"];
  }

  Map<String, dynamic> toJson() {
    var map = <String, dynamic>{};
    map["status"] = _status;
    map["detail"] = _detail;
    return map;
  }
}
