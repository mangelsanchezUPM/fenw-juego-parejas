var http_request;

function getRecords() {
  const url = "http://fenw.etsisi.upm.es:10000/records";
  http_request = new XMLHttpRequest();
  http_request.open("GET", url, true);
  http_request.onload = printRecords;
  http_request.send();
}

function printRecords() {
  if (http_request.status == 200) {
    let records = JSON.parse(http_request.response);
    let content = records.map((record) => {
      let date = new Date();
      date.setTime(record.recordDate);
      return `
        <div class="container-fluid">
          Usuario: ${record.username}
          Puntuación: ${record.punctuation}
          Número cartas: ${record.cards}
          Fecha: ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}
        </div><hr>`;
    });
    $("#records-body").html(content);
  } else {
    console.error("Error al recibir la respuesta.");
    alert("Error al recibir la respuesta");
    $("#router-outlet").load("html/home.html");
  }
}
