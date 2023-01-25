const form = document.getElementById("form");
form.addEventListener("submit", handleSubmit);

const inputs = ["gender", "age", "weight", "height", "activity_level"];

function handleSubmit(event) {
  event.preventDefault();
  if (document.getElementById("nombre").value !== "") {
    saveName();
    tips();
    helloUser();

    const inputValues = inputs.map(getInputNumberValue);
    const [gender, age, weight, height, activityLevel] = inputValues;

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

    function getInputNumberValue(id) {
      return Number(document.getElementById(id).value);
    }
  } else {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({
      title: "Error",
      text: "Debe ingresar un nombre",
      icon: "error",
      confirmButtonText: "OK",
      confirmButtonColor: "#ffc107",
      showCancelButton: false,
    });
  }
}

let recomendaciones = document.getElementById("recomendaciones");

const weightLossMacros = {
  proteina: "2.5-3g por kg de peso corporal.",
  grasas: "1g por kg de peso corporal.",
  hidratos: "3-5g por kg de peso corporal.",
};
localStorage.setItem("weightLossMacros", JSON.stringify(weightLossMacros));

function saveName() {
  localStorage.setItem("usuario", document.getElementById("nombre").value);
}

function tips() {
  var macros = localStorage.getItem("weightLossMacros");

  macros = JSON.parse(macros);
  return (recomendaciones.innerHTML =
    "<table> <tr> <th>Macronutriente</th> <th>Recomendacion</th> </tr> <tr> <td>Proteina</td> <td>" +
    macros.proteina +
    "</td> </tr> <tr> <td>Grasa</td> <td>" +
    macros.grasas +
    "</td> </tr> <tr> <td>Carbohidratos</td> <td>" +
    macros.hidratos +
    "</td> </tr> </table>");
}
function helloUser() {
  var user = localStorage.getItem("usuario");
  var element = document.getElementById("helloUser");
  element.innerHTML = "Te agradecemos por tu visita, " + user.toUpperCase();
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
  .then((ejercicios) => {
    let table = document.createElement("table");
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");
    let headRow = document.createElement("tr");
    let th1 = document.createElement("th");
    let th2 = document.createElement("th");
    th1.innerHTML = "Nombre";
    th2.innerHTML = "Músculo";
    headRow.appendChild(th1);
    headRow.appendChild(th2);
    thead.appendChild(headRow);
    table.appendChild(thead);
    ejercicios.forEach((ejercicio) => {
      let row = document.createElement("tr");
      let td1 = document.createElement("td");
      let td2 = document.createElement("td");
      td1.innerHTML = ejercicio.nombre;
      td2.innerHTML = ejercicio.musculo;
      row.appendChild(td1);
      row.appendChild(td2);
      tbody.appendChild(row);
    });
    table.appendChild(tbody);
    ejerciciosRecomendados.appendChild(table);
  });

async function fetchImage() {
  const apiKey = "fErsix4AWVw0xukBFBl60eDtCoXJWsdwowEo8IiSQBZBleDuMgNh3JYk";
  const query = "fitness";
  const response = await fetch(
    `https://api.pexels.com/v1/search?query=${query}&per_page=1&page=1`,
    {
      headers: {
        Authorization: apiKey,
      },
    }
  );
  const data = await response.json();
  const imageUrl = data.photos[0].src.medium;
  const imageAPI = document.getElementById("imagenAPI");
  imageAPI.innerHTML = `<img src="${imageUrl}" alt="Fitness Image">`;
}
fetchImage();
