// Array to store the user data.
const userRows = [];

// Obtain form data on demand.
const obtainFormData = () => {
  const formElements = {
    "Correo": document.getElementById("email"),
    "Nombre completo": document.getElementById("name"),
    "Fecha de nacimiento": document.getElementById("birthdate"),
    "Pais": document.getElementById("country"),
    "Género": document.getElementsByName("gender"),
    "Hobbies": document.getElementsByName("hobby"),
  };
  return formElements;
};

// Obtain array of DOM element for countries options.
const getCountriesOptions = () => {
  const countriesOptions = [];
  countries.forEach((country, index) => {
    const option = document.createElement("option");
    option.text = country;
    option.value = index;
    countriesOptions.push(option);
  });
  return countriesOptions;
};

// Obtain array of DOM element for gender radio button.
const getGenderRadios = () => {
  const genderRadios = [];
  gender.forEach((genderItem, index) => {
    const container = document.createElement("div");

    const radio = document.createElement("input");
    const id = `gender${index}`;
    radio.setAttribute("type", "radio");
    radio.setAttribute("name", "gender");
    radio.setAttribute("id", id);
    radio.value = index;
    container.appendChild(radio);

    const label = document.createElement("label");
    label.setAttribute("for", id);
    label.innerHTML = genderItem;
    container.appendChild(label);
    genderRadios.push(container);
  });
  return genderRadios;
};

// Obtain array of DOM element for hobby checkbox.
const getHobbiesCheckboxes = () => {
  const hobbiesCheckboxes = [];
  hobbies.forEach((hobby, index) => {
    const container = document.createElement("div");

    const checkbox = document.createElement("input");
    const id = `hobby${index}`;
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("name", "hobby");
    checkbox.setAttribute("id", id);
    checkbox.value = index;
    container.appendChild(checkbox);

    const label = document.createElement("label");
    label.setAttribute("for", id);
    label.innerHTML = hobby;
    container.appendChild(label);
    hobbiesCheckboxes.push(container);
  });
  return hobbiesCheckboxes;
};

// Obtain the DOM element to display the table header, generated from the form 
// data keys.
const getTableHeader = () => {
  const formData = obtainFormData();
  const tableHeader = document.createElement("div");
  tableHeader.setAttribute("class", "user-table-header");
  for (const key in formData) {
    if (!Object.hasOwnProperty.call(formData, key)) continue;
    const headerCell = document.createElement("div");
    headerCell.setAttribute("class", "user-table-header-cell");
    headerCell.innerHTML = key;
    tableHeader.appendChild(headerCell);
  }
  return tableHeader;
};

// Create a new row for the user to display on the table.
const getUserRow = (userData) => {
  const userRow = document.createElement("div");
  userRow.setAttribute("class", "user-table-row");
  for (const key in userData) {
    if (!Object.hasOwnProperty.call(userData, key)) continue;
    const element = userData[key];
    const rowElement = document.createElement("div");
    rowElement.setAttribute("class", "user-table-row-cell");
    rowElement.innerHTML = element;
    userRow.appendChild(rowElement);
  }
  return userRow;
};

// Insert data for select options, radio buttons and checkboxes.
const setup = () => {

  // Insert countries as options for select.
  getCountriesOptions().forEach(countryOption => {
    document.getElementById('country').appendChild(countryOption);
  });

  // Insert gender as radio buttons with label.
  getGenderRadios().forEach(genderRadio => {
    document.getElementById('gender').appendChild(genderRadio);
  });

  // Insert hobbies as checkboxes with label.
  getHobbiesCheckboxes().forEach(hobbyCheckbox => {
    document.getElementById('hobbies').appendChild(hobbyCheckbox);
  });

  // Display the table header.
  document.getElementById("user-table").appendChild(getTableHeader());

};

function submitForm() {
  const formElements = obtainFormData();

  const formElementsValues = {};
  for (const formElement in formElements) {

    if (! Object.hasOwnProperty.call(formElements, formElement)) {
      continue;
    }

    const element = formElements[formElement];
    // Handle gender special case.
    if (formElement === "Género") {
      for (let index = 0; index < element.length; index++) {
        const radio = element[index];
        if (radio.checked) {
          radio.checked = false;
          formElementsValues[formElement] = gender[index];
          break;
        } else if (index === element.length - 1) {
          formElementsValues[formElement] = "";
        }
      }
      continue;
    }

    // Handle hobbies special case.
    if (formElement === "Hobbies") {
      formElementsValues[formElement] = [];
      for (let index = 0; index < element.length; index++) {
        const checkbox = element[index];
        if (checkbox.checked) {
          checkbox.checked = false;
          formElementsValues[formElement].push(hobbies[index]);
        }
      }
      continue;
    }

    // Handle other elements.
    formElementsValues[formElement] = element.value;
    // Handle country special case.
    if (formElement === "Pais") {
      formElementsValues[formElement] = countries[element.value];
      if (element.value === "") formElementsValues[formElement] = "";
    }
    element.value = "";
  }

  // Add the new row to the table.
  const userRow = getUserRow(formElementsValues);
  const tableBody = document.getElementById("user-table");
  tableBody.appendChild(userRow);

  // Store user data and DOM element for the table row.
  userRows.push({
    userData: formElementsValues,
    userRow: userRow
  });
  console.log(userRows);
}

setup();
