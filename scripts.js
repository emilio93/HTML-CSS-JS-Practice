// Insert data for select options, radio buttons and checkboxes.
const setup = () => {
  // Insert countries as options for select.
  countries.forEach((country, index) => {
    const option = document.createElement('option');
    option.text = country;
    option.value = index;
    document.getElementById('country').appendChild(option);
  });

  // Insert gender as radio buttons with label.
  gender.forEach((genderItem, index) => {
    const container = document.createElement('div');

    const radio = document.createElement('input');
    const id = `gender${index}`;
    radio.setAttribute('type', 'radio');
    radio.setAttribute('name', 'gender');
    radio.setAttribute('id', id);
    radio.value = index;
    container.appendChild(radio);
    
    const label = document.createElement('label');
    label.setAttribute('for', id);
    label.innerHTML = genderItem;
    container.appendChild(label);
    document.getElementById('gender').appendChild(container);
  });
  
  // Insert hobbies as checkboxes with label.
  hobbies.forEach((hobby, index) => {
    const container = document.createElement('div');

    const checkbox = document.createElement('input');
    const id = `hobby${index}`;
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('name', 'hobby');
    checkbox.setAttribute('id', id);
    checkbox.value = index;
    container.appendChild(checkbox);

    const label = document.createElement('label');
    label.setAttribute('for', id);
    label.innerHTML = hobby;
    container.appendChild(label);
    document.getElementById('hobbies').appendChild(container);
  });
};

function submitForm() {
  const formElements = {
    "Correo": document.getElementById('email'),
    "Nombre completo": document.getElementById('name'),
    "Fecha de nacimiento": document.getElementById('birthdate'),
    "Pais": document.getElementById('country'),
    "Género": document.getElementsByName('gender'),
    "Hobbies": document.getElementsByName('hobby'),
  };

  const formElementsValues = {};
  for (const formElement in formElements) {
    if (Object.hasOwnProperty.call(formElements, formElement)) {
      const element = formElements[formElement];

      // Handle gender special case.
      if (formElement === 'Género') {
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
      if (formElement === 'Hobbies') {
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
      if (formElement === 'Pais') {
        formElementsValues[formElement] = countries[element.value];
        if (element.value === "") formElementsValues[formElement] = "";
      }
      element.value = '';
    }
  }

  // Print form values.
  document.getElementById('response').innerHTML = '';
  for (const key in formElementsValues) {
    if (Object.hasOwnProperty.call(formElementsValues, key)) {
      const element = formElementsValues[key];
      const p = document.createElement('p');
      p.innerHTML = `${key}: ${element}`;
      document.getElementById('response').appendChild(p);
    }
  }
  console.log(formElementsValues);
}

setup();

/*
  AGREGUEMOS MAS CAMPOS
  
  PAIS con un select box
  SEXO GENERO con un radio button (alinear con flexbox horizontal)
  INTERESES HOBBIES con un checkbox (alinear con flexbox horizontal)
  
  Antes de limpiar los datos se debe crear un objeto
  con los valores que el usuario selecciono e imprimir en pantalla
  y despues limpiar los datos.
  
  
  alinear titulo, formulario y boton al centro
  
   */
