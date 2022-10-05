function validate() {
    if (document.querySelector("#user_name").value === "" || document.querySelector("#user_name").value == null) {
      alert("Username cannot be empty!");
      return false;
    }   
    if (document.querySelector("#user_pass").value.length <= 6) {
      alert("Password must be longer than 6 characters");
      return false;
    }   
    if (document.querySelector("#user_pass").value.length >= 20) {
      alert("Password must be less than 20 characters!");
      return false;
    }    
    return true;
}

if(response=="user exists") {
    alert("The user already exists");
}
