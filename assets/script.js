let loginForm = document.getElementById("loginForm");

if (loginForm) {
  let doctorpass = document.getElementById("doctorpass");
  let ID = document.getElementById("doctorID");
  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    let password = doctorpass.value;
    let doctorID = ID.value;

    if (doctorID == "" || password == "") {
      alert("Both Doctor ID and Password must be provided");
      return;
    }

    if (password.length < 8) {
      alert("Password is less than 8 characters");
      return;
    }

    let data = {
      doctorID,
      password,
    };

    const response = await axios.post(
      "http://localhost:4000/api/v1/users/login",
      data
    );
    if (response.data.status == "success") {
      console.log("TC-8767", response.data);
      document.cookie = `HealthIT=${response.data.token}; expires=Mon, 7 Feb 2022 12:00:00 UTC; path=/`;
      setTimeout(function () {
        window.location.replace(
          "http://localhost/Health%20IT/code/healthIT/home.php"
        );
      }, 1000);

      return;
    }

    alert(response.data.message);
  });
}
