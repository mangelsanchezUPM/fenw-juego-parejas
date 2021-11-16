var http_request;

const SPINNER_PATH = "../assets/spinner.gif";
const RANKING_POSITION_BASE_PATH = "../assets/ranking-position/";

function getRecords() {
  const url = "http://fenw.etsisi.upm.es:10000/records";
  http_request = new XMLHttpRequest();
  http_request.open("GET", url, true);
  http_request.onload = printRecords;
  http_request.send();
  $("#records-body").html(`<img src="${SPINNER_PATH}" width=50px>`);
}

function printRecords() {
  if (http_request.status == 200) {
    let records = JSON.parse(http_request.response);
    let content = "";
    for (let i = 0; i < records.length; i++) {
      let record = records[0];
      let date = new Date();
      date.setTime(record.recordDate);
      let imageIndex = i + 1;
      let image = RANKING_POSITION_BASE_PATH + imageIndex + ".png";
      content += `
        <div class="row record-element">
          <div class="col-4">
              <img class="record-position" src="${image}" class="img-fluid record-position">
            </div>
            <div class="col-4 lead">
              <div class="row ">
                Usuario
              </div>
              <div class="row">
                Puntuación
              </div>
              <div class="row">  
                Número cartas
              </div>
              <div class="row">
                Fecha
              </div>
            </div>
            <div class="col-4 lead">
              <div class="row ">
                ${record.username}
              </div>
              <div class="row">
                ${record.punctuation}
              </div>
              <div class="row">  
                ${record.cards}
              </div>
              <div class="row">
                ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}
              </div>
            </div>
          </div>`;
    }
    $("#records-body").html(content);
  } else {
    console.error("Error al recibir la respuesta.");
    alert("Error al recibir la respuesta");
    $("#router-outlet").load("html/home.html");
  }
}
