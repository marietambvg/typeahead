
var regionsCopy = {
    data: [
        {
            "name": "Vratsa",
            "towns": [
                "Vratsa",
                "Mezdra",
                "Borovan"
            ]
        },
        {
            "name": "Pernik",
            "towns": [
                "Pernik",
                "Tran",
                "Breznik"
            ]
        },
        {
            "name": "Sofia",
            "towns": [
                "Sofia",
                "Kubratovo",
                "Svetovrachene",
                "Novi Han",
                "Dragovishtitsa",
                "Bozhurishte",
                "Voluak",
                "Elin Pelin",
                "Lozenetz",
                "Ihtiman"
            ]
        }
    ]
}

var regions;

function filterTowns(value) {
    let searchValue = value.toLowerCase();
    let regionsData = regions.data;
    let filteredTowns, htmlResult = "", regionHtml, townHtml;
    regionsData.forEach(region => {
        regionHtml = ""
        filteredTowns = region.towns.filter(town => town.toLowerCase().indexOf(searchValue) > -1);
        if (filteredTowns.length > 0) {
            regionHtml += "<strong class='region-item-header'>" + region.name + "</strong><ul class='region-item'>";
            filteredTowns.forEach(town => {
                regionHtml += '<li class="town-item" onclick="setTypeAhead(\'' + town + '\')">' + town + "</li>"
            })
            regionHtml += "</ul>"
        };
        if (regionHtml !== "") {
            htmlResult += regionHtml;
        }
    });
    if (htmlResult == "") {
        htmlResult = "<strong>No matches</strong>";
    }
    document.getElementById("townsList").innerHTML = htmlResult;
    document.getElementsByClassName("towns-list")[0].classList.remove("hidden")
    //}

}

function setTypeAhead(town) {
    document.getElementById("typeAheadInput").value = town;
    document.getElementById("typeAheadInput").focus();
};

function testAlphabetic(event) {
    var key = event.keyCode;
    return ((key >= 65 && key <= 90) || key == 8 || (key >= 95 && key <= 122));
};

function getTowns() {
    let req = new XMLHttpRequest();
    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            console.log(req);
            regions = JSON.parse(req.responseText);
            console.log(regions)
        } else {
            regions = regionsCopy;
        }
    };

    req.open("GET", "https://api.jsonbin.io/b/5f04c3e4a62f9b4b2760ad49", true);
    req.setRequestHeader("secret-key", "$2b$10$Ab8/z1iMvKd397nF5ExqpOWBn3qpLt9YI83nlGEtVUNo7jorRVnkC");
    req.send();
}
