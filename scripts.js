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
    let radio = document.createElement('input');
    const id = `gender${index}`;
    radio.setAttribute('type', 'radio');
    radio.setAttribute('name', 'gender');
    radio.setAttribute('id', id);
    radio.value = index;
    document.getElementById('gender').appendChild(radio);
    
    let label = document.createElement('label');
    label.setAttribute('for', id);
    label.innerHTML = genderItem;
    document.getElementById('gender').appendChild(label);
    if (index < gender.length) {
      const br = document.createElement('br');
      document.getElementById('gender').appendChild(br);
    }
  });

  // Insert hobbies as checkboxes with label.
  hobbies.forEach((hobby, index) => {
    let checkbox = document.createElement('input');
    const id = `hobby${index}`;
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('name', 'hobby');
    checkbox.setAttribute('id', id);
    checkbox.value = index;
    document.getElementById('hobbies').appendChild(checkbox);

    let label = document.createElement('label');
    label.setAttribute('for', id);
    label.innerHTML = hobby;
    document.getElementById('hobbies').appendChild(label);
    if (index < hobbies.length) {
      const br = document.createElement('br');
      document.getElementById('hobbies').appendChild(br);
    }
  });
}

function submitForm() {
  const formElements = {
    email: document.getElementById('email'),
    name: document.getElementById('name'),
    birthdate: document.getElementById('birthdate'),
    country: document.getElementById('country'),
    gender: document.getElementsByName('gender'),
    hobbies: document.getElementsByName('hobby'),
  };

  const formElementsValues = {};
  for (const formElement in formElements) {
    if (Object.hasOwnProperty.call(formElements, formElement)) {
      const element = formElements[formElement];

      // Handle gender special case.
      if (formElement === 'gender') {
        for (let index = 0; index < element.length; index++) {
          const radio = element[index];
          if (radio.checked) {
            radio.checked = false;
            formElementsValues[formElement] = gender[index];
            break;
          }
        }
        continue;
      }
      
      // Handle hobbies special case.
      if (formElement === 'hobbies') {
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
      if (formElement === 'country') {
        formElementsValues[formElement] = countries[element.value];
      }
      element.value = '';
    }
  }

  // Print form values.
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
