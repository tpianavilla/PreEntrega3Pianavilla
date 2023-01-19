const form = document.getElementById("form");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  let gender = getInputNumberValue("gender");
  let age = getInputNumberValue("age");
  let weight = getInputNumberValue("weight");
  let height = getInputNumberValue("height");
  let activityLevel = getInputNumberValue("activity_level");

  const tmb = Math.round(
    gender === "female"
      ? 655 + 9.6 * weight + 1.8 * height - 4.7 * age
      : 66 + 13.7 * weight + 5 * height - 6.8 * age
  );
  const maintenance = Math.round(tmb * Number(activityLevel));
  const loseWeight = maintenance - 300;
  const gainWeight = maintenance + 400;

  const layout = `
  
  <h4>Resultados</h4>
  
  <div class="result-content text-dark">
    <ul>
      <li>
        Su metabolismo basal es de <strong>${tmb} calorias</strong>.
      </li>
      <li>
        Para mantener su peso actual <strong>${maintenance} calorias por dia</strong>.
      </li>
      <li>
        Para perder peso debe consumir <strong>${loseWeight} calorias por dia</strong>.
      </li>
      <li>
        Para aumentar de peso debe consumir <strong>${gainWeight} calorias por dia</strong>.
      </li>
    </ul>
  </div>
  `;

  const result = document.getElementById("result");
  result.innerHTML = layout;

  saveName();

  tips();

  if (weight < 0 || height < 0 || age < 0) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Algun valor de los ingresados es incorrecto.",
      footer:
        "Peso, edad y altura deben ser ingresados como un numero mayor a 0.",
    });
  }
}

let recomendaciones = document.getElementById("recomendaciones");

const weightLossMacros = {
  proteina: "2.5-3g por kg de peso corporal,",
  grasas: "minimo 1g por kg de peso corporal",
  hidratos:
    "una vez definida la proteina y la grasa, las kcal restantes pueden provenir de CARBOHIDRATOS.",
};
localStorage.setItem("weightLossMacros", JSON.stringify(weightLossMacros));

function saveName() {
  localStorage.setItem("usuario", document.getElementById("nombre").value);
}

function tips() {
  var macros = localStorage.getItem("weightLossMacros");
  var user = localStorage.getItem("usuario");
  macros = JSON.parse(macros);
  return (recomendaciones.innerHTML =
    user.toUpperCase() +
    ", nuestra recomendacion de macros es la siguiente: PROTEINA " +
    macros.proteina +
    " de GRASAS " +
    macros.grasas +
    " y " +
    macros.hidratos);
}

function getSelectedValue(id) {
  const select = document.getElementById(id);
  return select.options[select.selectedIndex].value;
}

function getInputNumberValue(id) {
  return Number(document.getElementById(id).value);
}

let ejerciciosRecomendados = document.getElementById("ejerciciosRecomendados");

const ejRecomendado = `<h4> Recomendamos enfatizar los siguientes ejercicios: </h4>`;

fetch("./exercises.json")
  .then((response) => response.json())
  .then(
    (ejercicio) =>
      (ejerciciosRecomendados.innerHTML =
        ejRecomendado +
        JSON.stringify(ejercicio[0].nombre) +
        ", " +
        JSON.stringify(ejercicio[1].nombre) +
        ", " +
        JSON.stringify(ejercicio[2].nombre) +
        ", " +
        JSON.stringify(ejercicio[3].nombre) +
        " y " +
        JSON.stringify(ejercicio[4].nombre))
  );
