const setup = () => {
  countries.forEach((country, index) => {
    console.log(country);
    const option = document.createElement('option');
    option.text = country;
    option.value = index;
    document.getElementById('country').appendChild(option);
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
