

/*
* fx: checkID: (void) -> bool
*
* description: checks the ID for validation
*/



let checkId = function() {
    
    var id_tag = document.getElementById('nid'); 
    var id = id_tag.value; 
    
    var regex = /\d+/;
    var match = regex.exec(id);
    
    if(match != null) {
        var ver_id = match[0]; 
        
        if (ver_id.length != 13) {
            alert('Invalid id entered. Expected 13 digits but ' +
                    ver_id.length + 
                    ' digits were given.'
            );   
            return; 
        }
        
        var year = id[0] + id[1]; 
        var month = id[2] + id[3]; 
        var day = id[4] + id[5]; 
        var gender = id[6]; 
        
        var numComb = id[7] + id[8] + id[9] ; 
        var citizen = id[10]; 
        var control = id[12]; 
        
        //alert("Year :" + year + "\nMonth :" + month + "\nday: " + day + "\ngender: " +gender); 
            
        var sGender; 
        if (parseInt(gender, 10) >= 0 && parseInt(gender, 10) < 5) sGender = 'Female'; 
        else if (parseInt(gender, 10) >= 5 && parseInt(gender, 10) < 9) sGender = 'Male'; 
        else {
            alert("invalid gender detected: Should be 'Male' or 'Female'."); 
            return null; 
        }
        
        if (parseInt(citizen, 10) != 0) {
            alert('Only citizens are allowed to vote')
          return null;    
        }

        window.location.href = "https://digitalelections.github.io/Home" ;
    } else {
        alert("Invalid details entered"); 
    }
}


let createVote = function(party) {
    // Add a new document in collection "cities"
    firebase.firestore().collection('politicalParties').doc(party).set({
        name: "Los Angeles",
        state: "CA",
        country: "USA"
    })
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
}


let getPoliticalParty = function(party) {
    var docRef = firebase.firestore().collection('politicalParties').doc(party);
    
    docRef.get().then((doc) => {
        if (doc.exists) {
            var data = doc.data();
            alert(data.name, data.votes); 
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        alert("Error getting document:" + error);
        console.log("Error getting document:", error);
    });   
}