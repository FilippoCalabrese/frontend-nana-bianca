const address = "http://www.lamma.rete.toscana.it/previ/ita/xml/comuni_web/dati/";
const citiesAddress = "http://www.lamma.rete.toscana.it/previ/ita/xml/lista_comuni.xml";

const fetchAllCities = () => {
    fetch(citiesAddress).then(function(response) {
        if(response.ok) {
            return response.text();
        }
        throw new Error('Network respnse was not ok.');
    })
    .then(function(data) {populateList(data); })
    .catch(function(error) {
        console.log('There has been a problem:', error.message);
    });
}

const populateList = (xml) => {
    let output = "";
    let parser = new DOMParser(); 

    const xmlDoc = parser.parseFromString(xml, "text/xml");
    links = xmlDoc.querySelectorAll("link");
    for(let el of links){
        output = output + "<option value='"+el.querySelector("url").innerHTML+"'>"+el.querySelector("title").innerHTML+"</option>"
    }

    document.getElementById('citySelector').innerHTML = output;
}

function fetchRes(address, city) {
    fullAddress = address+city+".xml"
    fetch(fullAddress).then(function(response) {
        if(response.ok) {
            return response.text();
        }
        throw new Error('Network respnse was not ok.');
    })
    .then(function(data) {updateTable(data); })
    .catch(function(error) {
        console.log('There has been a problem:', error.message);
    });
}

function appendToTable(type, content) {

    let table = document.getElementById("table");

    node = document.createElement(type);
    text = document.createTextNode(content);
    
    node.appendChild(text);
    node.setAttribute("class", "table-head");
    table.appendChild(node);
}

const updateTable = (xml) => {

    document.getElementById("table").innerHTML = "";
    let parser = new DOMParser();
    xmlDoc = parser.parseFromString(xml, "text/xml");

    let output = "";

    const comune = xmlDoc.querySelector("comune").innerHTML;

    appendToTable("td", "City: "+comune);

    const aggiornamento = xmlDoc.querySelector("aggiornamento").innerHTML;
    appendToTable("td", "Ultimo aggiornamento: "+aggiornamento);

    const sorge = xmlDoc.querySelector("sole_sorge").innerHTML;
    appendToTable("td", "Alba: "+sorge);

    const tramonta = xmlDoc.querySelector("sole_tramonta").innerHTML;
    appendToTable("td", "Tramonto: "+tramonta);


    const listPrevisioni = xmlDoc.querySelectorAll("previsione");

    for(let el of listPrevisioni){
        let flag = true;
        firstElement = "";

        if(el.getAttribute("ora")=="giorno"){
            firstElement = el.getAttribute("datadescr");
        } else {
            flag=false;
            firstElement = el.getAttribute("ora");
        }
        temps = el.querySelectorAll("temp");
        
        previsione = el.querySelector("simbolo").getAttribute("descr");

        massimo = temps[0].innerHTML;
        minimo = temps[1].innerHTML;

        pushNewRow(firstElement, previsione, minimo, massimo, flag);
        
    }

    document.getElementById("table").innerHTML = document.getElementById("table").innerHTML + output;
    
}

function pushNewRow(firstElement, previsione, minima, massima, flag){

    let table = document.getElementById("table");
    trNode = document.createElement("tr");

    firstNode = document.createElement("td");
    textOne = document.createTextNode(firstElement);
    firstNode.appendChild(textOne);
    trNode.appendChild(firstNode);

    previsionNode = document.createElement("td");
    previsionText = document.createTextNode(previsione);
    previsionNode.appendChild(previsionText);
    trNode.appendChild(previsionNode);

    minNode = document.createElement("td");
    minText = document.createTextNode(minima);
    minNode.appendChild(minText);
    trNode.appendChild(minNode);

    maxNode = document.createElement("td");
    maxText = document.createTextNode(massima);
    maxNode.appendChild(maxText);
    trNode.appendChild(maxNode);

    if(flag)
    trNode.setAttribute("class", "black");
    table.appendChild(trNode);
}

const handleClick = () => {
    const e = document.getElementById("citySelector");
    const value = e.options[e.selectedIndex].value;
    fetchRes(address, value);
}

function main() {
    fetchRes(address, "firenze");
    fetchAllCities();
    document.getElementById("refresh").addEventListener("click", handleClick);
}

main();