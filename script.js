///Table row format//
const rightTick = function (right, matchedInput, index) {
  if (matchedInput.absentedDates.includes(right)) {
    return "-";
  } else {
    return "✅";
  }
};
const wrongTick = function (wrong, matchedInput, index) {
  if (matchedInput.absentedDates.includes(wrong)) {
    return "❌";
  } else {
    return "-";
  }
};

///////////////Storage Array/////////////////
let storageArr = [
  {
    name: "yaswanth",
    details: {
      id: 1,
      name: "yaswanth",
      Batch: "abct",
      joinedDate: "19/4/2025",
      presentedDates: ["08/4/2025", "09/4/2025", "10/4/2025", "11/4/2025"],
      absentedDates: ["09/4/2025"],

      attendence: false,
    },
  },
  {
    name: "kiran",
    details: {
      id: 1,
      name: "kiran",
      Batch: "abct",
      presentedDates: ["08/4/2025", "09/4/2025", "10/4/2025", "11/4/2025"],
      joinedDate: "",
      absentedDates: ["08/4/2025", "09/4/2025"],
      present: ["✅"],
      absent: ["❌"],
      attendence: false,
    },
  },
];

/////////////calling dom elements////////////

const table_1 = document.querySelector(".table-1-container");
const form_data = document.querySelector(".form-data");
const addBtn = document.querySelector(".add");
const searchBtn = document.querySelector(".search");
const submitBtn = document.querySelector(".submit");
const takeBtn = document.querySelector(".takeBtn");

////////////hiding document query///

const freshDate = function () {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
console.log(freshDate());

///////////searchBtn/////////

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  // takeBtn.disabled = false;
  const searchInput = document.querySelector(".form-control").value;
  const rootbody = document.getElementById("root");
  const searchBar = document.querySelector(".searchBar");
  ////////////////Functions//////////////////////////

  let matchedInput = null;
  let matchedIndex = 0;

  if (searchInput) {
    rootbody.innerHTML = "";
    //////////////////Take attendence event////////////
    takeBtn.addEventListener("click", function () {
      storageArr[matchedIndex].details.presentedDates.push(freshDate());
      rootbody.innerHTML = `<tr><td>${
        storageArr[matchedIndex].details.presentedDates.length
      }</td>
      <td>${searchInput.toLowerCase()}</td>
      <td>${matchedInput.Batch}</td>
      <td>✅</td>
      <td>-</td>
      
      <td>${matchedInput.presentedDates.at(-1)}</td><tr>
      `;
      takeBtn.disabled = true;
    });
    storageArr.forEach((item, index) => {
      takeBtn.disabled = item.details.attendence;
      if (item.name === searchInput.toLowerCase()) {
        matchedInput = item.details;
        matchedIndex = index;
        console.log(matchedInput);
        rootbody.innerHTML = matchedInput.presentedDates
          .map((item, index) => {
            return `<tr>
          <td>${matchedInput.id + index}</td>
          <td>${searchInput.toLowerCase()}</td>
          <td>${matchedInput.Batch}</td>
          <td>${rightTick(item, matchedInput, index)}</td>
          <td>${wrongTick(item, matchedInput, index)}</td>
          
          <td>${item}</td><tr>
          `;
          })
          .join("");
        if (searchInput === null) {
          searchBar.style.opacity = 1;
        }
        table_1.style.opacity = 1;
      }
    });
    if (matchedInput == null) {
      alert("your name is not found");
    }
  }
});

///////////Add event/////

addBtn.addEventListener("click", function () {
  form_data.style.opacity = 1;
});

/////////submit event////

submitBtn.addEventListener("click", function () {
  form_data.style.display = "none";
  const inputName = document.querySelector(".form-control-1").value;
  const inputBatch = document.querySelector(".form-control-2").value;
  // console.log(inputBatch, inputName);
  if (inputName) {
    let bool = true;
    if (bool) {
      storageArr.forEach((item, index) => {
        if (item.name === inputName.toLowerCase()) {
          alert("already");
        } else {
          bool = false;
        }
      });
    }
    if (!bool) {
      storageArr.push({
        name: inputName.toLowerCase(),
        details: {
          id: 2,
          name: `${inputName.toLowerCase()}`,
          Batch: `${inputBatch}`,
          joinedDate: `${freshDate()}`,
          presentedDates: [],
          present: 0,
          absent: 0,
        },
      });
    }
  }
});
