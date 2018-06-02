candidates = 2;
function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}
function getResults(){
    console.log("Got votes");
    //Check if list already exists and remove it if it does
    //to update it with new values
    exists = !!document.getElementById("candidatesList");
    if (exists){
        let element = document.getElementById("candidatesList");
        element.parentNode.removeChild(element);
    }

    //Create list
    var ul = document.createElement('ul');
    ul.setAttribute('id','candidatesList');
    document.getElementById('resultslist').appendChild(ul);

    //Add candidate
    function renderCandidateList(candidate, count) {
        let li = document.createElement('li');
        li.setAttribute('class','candidate');
        
        var candidateCount;
        var t;
        if (candidate == 1){
            candidateCount = "John Doe has " + count + " votes";
        } else if (candidate == 2){
            candidateCount = "Mary Sue has " + count + " votes";
        } else{
            //do something
        }
        ul.appendChild(li);
        
        t = document.createTextNode(candidateCount);
        
        li.innerHTML=li.innerHTML + candidateCount;
    }


    //fetch results
    for (let index = 1; index <= candidates; index++) {
        httpGetAsync("http://localhost:8080/count/" + index, function(data) {
            renderCandidateList(index, data);
            console.log("Candidate " + index + " got " + data + " votes"); 
        });
    }
}

