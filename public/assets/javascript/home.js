(function() {
  populateUsersTable();

})();

function populateUsersTable() {
  var tableContent = '';
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var users = JSON.parse(this.responseText);
      for (var i = 0; i < users.length; i++) {
        tableContent += '<tr>';
        tableContent += '<th scope="row">' + (i + 1) + '</th>';
        tableContent += '<td>' + users[i].firstName + '</td>';
        tableContent += '<td>' + users[i].lastName + '</td>';
        tableContent += '<td>' + users[i].username + '</td>';
        tableContent += '</tr>';
      }
      document.getElementById('usersListTable').tBodies[0].innerHTML = tableContent;
    }
  };
  xhttp.open("GET", "api/users/allUsers", true);
  xhttp.send();
}

function logout() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      window.location = '/';
    }
  };
  xhttp.open("POST", "api/logout", true);
  xhttp.send();
}

function updateInfo(element) {
  var xhttp = new XMLHttpRequest();
  var value = document.getElementById(element.id).value;
  if (element.id === "name") {
    var name = value.split(" ");
    xhttp.open("POST", "api/users/update/self", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({
      'key': 'firstName',
      'newValue': name[0]
    }));
    xhttp.open("POST", "api/users/update/self", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({
      'key': 'lastName',
      'newValue': name[1]
    }));
  } else {
    xhttp.open("POST", "api/users/update/self", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({
      'key': element.id,
      'newValue': value
    }));
  }

}
