import 'dart:convert';
import 'package:http/http.dart' as http;
import 'models/user_model.dart';

class HttpService {
  final String usersURL = "http://localhost:8080/api/users";

  Future<List<User>> getUsers() async {
    final http.Response res = await http.get(Uri.parse(usersURL));

    if (res.statusCode == 200) {
      List<dynamic> body = jsonDecode(res.body);

      List<User> users = body
          .map(
            (dynamic item) => User.fromJson(item),
          )
          .toList();

      return users;
    } else {
      throw Exception("Unable to retrieve users.");
    }
  }

  Future<User> getUserById(int id) async {
    final http.Response res = await http.get(Uri.parse('$usersURL/$id'));

    if (res.statusCode == 200) {
      return User.fromJson(jsonDecode(res.body));
    } else {
      throw Exception("User not found.");
    }
  }
}
