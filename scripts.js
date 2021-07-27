const setup = () => {
  countries.forEach((country, index) => {
    const option = document.createElement('option');
    option.text = country;
    option.value = index;
    document.getElementById('country').appendChild(option);
  });

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
}

function submitForm() {
  alert('Felicidades, te has registrado exitosamente');
  document.getElementById('email').value = '';
  document.getElementById('name').value = '';
  document.getElementById('birthdate').value = '';

  const user = {
    name: 'hernan',
    lastName: 'Brenes',
  }

  console.log(user);
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
