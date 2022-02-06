let loginForm = document.getElementById("loginForm");
let homeIdentifier = document.getElementById("homeIdentifier");
let stage = true;
let devURl = "http://localhost:4000";
let prodURl = "https://msuhealthit.herokuapp.com";
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
      `${stage ? prodURl : devURl}/api/v1/users/login`,
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

async function loadData(setupdata) {
  let { tableNumber, iscolected, field, table } = setupdata;

  const response = await axios.get(`${stage ? prodURl : devURl}/api/v1/data`);
  let responsedata = response.data.apiObjects;
  //Get data from the Api

  //Define Male structure
  let dataArray = [];
  //Define table 1 Male Data
  let tableSelected = responsedata[tableNumber];

  let dataSet = tableSelected.dataSet;
  let colected = "";
  if (iscolected) {
    colected = dataSet.samplecollected;
  } else {
    colected = dataSet.positiveSamples;
  }
  colected.forEach(function (item, index) {
    //push data to dataArray Array
    dataArray.push(item[field]);
  });

  //   const labels = ["", `${field}`, ""];

  let sortedArray = [...dataArray];

  sortedArray.sort(function (a, b) {
    return a - b;
  });
  let labels = "";
  if (field == "female") {
    labels = sortedArray;
    // labels = ["0", "10", "20", "30", "35", "43"];
  }
  if (field == "male") {
    labels = sortedArray;
    // labels = ["0", "10", "20", "30", "35"];
  }

  //setup plugin
  const data = {
    labels: labels,
    datasets: [
      {
        label: `${tableSelected.name} ${
          iscolected ? "Collected" : "Positive"
        }  ${field} Data `,
        backgroundColor: iscolected ? "rgb(255, 99, 132)" : "blue",
        borderColor: "rgb(255, 99, 132)",
        // data: [0, 10, 5, 2, 20, 30, 45],
        data: dataArray,
      },
    ],
  };

  const config = {
    type: "line",
    data: data,
    options: {},
  };

  const myChart = new Chart(document.getElementById(table), config);

  if (iscolected) {
    let totalSamples = dataArray.reduce(function (previousValue, currentValue) {
      return previousValue + currentValue;
    });
    document.getElementById(`total${field}Samples`).innerHTML = totalSamples;

    document.getElementById(`total${field}`).innerHTML = totalSamples;
  } else {
    let totalSamples = dataArray.reduce(function (previousValue, currentValue) {
      return previousValue + currentValue;
    });

    document.getElementById(`totalpositive${field}Samples`).innerHTML =
      totalSamples;
  }

  //get statistics male records

  let firstData = dataArray[0];

  let lastData = dataArray[dataArray.length - 1];
  let stats = lastData - firstData;
  let percent = Math.ceil((lastData / firstData) * 100);

  if (stats > 1) {
    //show a drop
    document.getElementById(
      `starts${field}Number`
    ).innerHTML = `  <i class="fas fa-arrow-up"></i> ${percent}%`;
  } else {
    //show a rise
    if (iscolected) {
      document.getElementById(
        `starts${field}Number`
      ).innerHTML = `  <i style="color:red"  class="fas fa-arrow-down"></i><span style="color:red" > ${percent}%</span>`;
    } else {
      document.getElementById(
        `startspositive${field}Number`
      ).innerHTML = `  <i style="color:red"  class="fas fa-arrow-down"></i><span style="color:red" > ${percent}%</span>`;
    }
  }
}

async function barGraph(tableNumber = 0) {
  const response = await axios.get(`${stage ? prodURl : devURl}/api/v1/data`);
  let responsedata = response.data.apiObjects;

  let tableSelected = responsedata[tableNumber];

  let dataSet = tableSelected.dataSet;
  let colected = dataSet.samplecollected;
  let ageArray = [];
  colected.forEach(function (item) {
    ageArray.push(item.age);
  });

  console.log("TC-88", ageArray);

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const config = {
    type: "bar",
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };
  const myChart = new Chart(document.getElementById("barOneTable"), config);
}

if (homeIdentifier) {
  loadData({
    tableNumber: 0,
    iscolected: true,
    field: "male",
    table: "maleTable",
  });
  loadData({
    tableNumber: 0,
    iscolected: true,
    field: "female",
    table: "femaleTable",
  });
  loadData({
    tableNumber: 0,
    iscolected: false,
    field: "female",
    table: "femalepositiveTable",
  });
  loadData({
    tableNumber: 0,
    iscolected: false,
    field: "male",
    table: "malepositiveTable",
  });
  barGraph();
}
