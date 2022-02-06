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
  let maleData = [];
  let femaleData = [];
  colected.forEach(function (item) {
    ageArray.push(item.age);
    maleData.push(item.male);
    femaleData.push(item.female);
  });

  const labels = ageArray;

  const data = {
    labels: labels,
    datasets: [
      {
        label: `${tableSelected.name} Collection`,
        data: maleData,
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
  const datatwo = {
    labels: labels,
    datasets: [
      {
        label: `${tableSelected.name} Collection`,
        data: femaleData,
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
  const configtwo = {
    type: "bar",
    data: datatwo,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };
  new Chart(document.getElementById("barOneTable"), config);
  new Chart(document.getElementById("barTwoTable"), configtwo);

  //
}

async function totalSats(tableNumber = 0) {
  const response = await axios.get(`${stage ? prodURl : devURl}/api/v1/data`);
  let responsedata = response.data.apiObjects;

  let tableSelected = responsedata[tableNumber];

  let dataSet = tableSelected.dataSet;
  let collected = dataSet.samplecollected;
  let affected = dataSet.positiveSamples;
  let malecollected = [];
  let malepositive = [];
  let femalecollected = [];
  let femalecpositive = [];
  collected.forEach(function (item) {
    malecollected.push(item.male);
    femalecollected.push(item.female);
  });
  affected.forEach(function (item) {
    malepositive.push(item.male);
    femalecpositive.push(item.female);
  });

  let totalMaleCollected = malecollected.reduce(function (
    previousValue,
    currentValue
  ) {
    return previousValue + currentValue;
  });
  let totalMalePostive = malepositive.reduce(function (
    previousValue,
    currentValue
  ) {
    return previousValue + currentValue;
  });
  let totalfemalecollected = femalecollected.reduce(function (
    previousValue,
    currentValue
  ) {
    return previousValue + currentValue;
  });
  let totalfemalecpositive = femalecpositive.reduce(function (
    previousValue,
    currentValue
  ) {
    return previousValue + currentValue;
  });

  const data = {
    labels: ["Negative", "Positive"],
    datasets: [
      {
        label: "Male Connected Bar",
        data: [totalMaleCollected, totalMalePostive],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
      },
    ],
  };
  const datatwo = {
    labels: ["Negative", "Positive"],
    datasets: [
      {
        label: "Female Connected Bar",
        data: [totalfemalecollected, totalfemalecpositive],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
      },
    ],
  };
  const config = {
    type: "doughnut",
    data: data,
  };
  const configDog2 = {
    type: "doughnut",
    data: datatwo,
  };

  new Chart(document.getElementById("dognuts"), config);
  new Chart(document.getElementById("dognutsfemale"), configDog2);

  let total = Math.ceil(totalfemalecollected + totalMaleCollected);
  document.getElementById("totalRecordsModal").innerHTML = total;

  let rate = Math.ceil(totalMalePostive + totalfemalecpositive / total);

  document.getElementById("totalRecordsRates").innerHTML = `${rate}%`;

  let higher = totalMalePostive - totalfemalecpositive;
  if (higher > 1) {
    document.getElementById(
      "higherRecord"
    ).innerHTML = `The male records data is ${
      totalMalePostive - totalfemalecpositive / 100
    }% higher than the male Statisctics`;
    document.getElementById(
      "recomend"
    ).innerHTML = `Recomendation : Male patients should be assigned more doctors`;
  } else {
    document.getElementById(
      "higherRecord"
    ).innerHTML = `The Female  records data is ${
      totalfemalecpositive - totalMalePostive / 100
    }% higher than the male Statisctics`;
    document.getElementById(
      "recomend"
    ).innerHTML = `Recomendation : Female patients should be assigned more doctors`;
  }

  if(totalfemalecollected>totalMaleCollected){
      document.getElementById("stats")="An increase in number male sampling will lead to an increase in male positive data"
  }

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
  totalSats();

  document
    .getElementById("statiscticBtn")
    .addEventListener("click", function (event) {
      event.preventDefault();
    });
}
