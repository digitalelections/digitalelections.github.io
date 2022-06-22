


let createUser = function(username, id) {
    firebase.firestore().collection('politicalParties').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var data = doc.data(); 
            
            alert('Got user: ' + data); 
        });
    }); 
}


let createPost = function(id, name, votes, logo) {
 //g id="ppic" src="https://toppng.com/uploads/preview/anc-vector-logo-free-download-11573983310jtuykgs8tl.png"/
 let img = document.createElement('img');
 let anchor = document.createElement('a');
 anchor.onclick = function() {
     //alert(id + ":" + name + ":" + votes); 
     ynd = prompt("Do you want to vote for the " + name + " party? (enter yes or no)");
     let response = function(result) {
         if (result.toLowerCase() == 'yes') {
            
            var docRef = firebase.firestore().collection('politicalParties').doc(id);
            
            docRef.get().then((doc) => {
                if (doc.exists) {
                    var data = doc.data();
                    var vt = data.votes; 
                    vt++; 
                   
                    var pP = firebase.firestore().collection('politicalParties').doc(id);

                    var setWithMerge = pP.set({
                        votes: vt
                    }, { merge: true });
                     alert("You have sucessfully voted for " + name); 
                } else {
                    // doc.data() will be undefined in this case
                    alert("No such document!");
                }
            }).catch((error) => {
                alert("Error getting document:" + error);
                console.log("Error getting document:", error);
            });  
            
            
         }
     }
     
     response(ynd); 
 };
 
 img.className = 'ppic'; 
 img.src = logo; 
 
 anchor.appendChild(img); 
 document.body.appendChild(anchor); 
}

let getPoliticalParties = function() {
	const ref = firebase.firestore().collection('politicalParties');
	ref.get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
		    var id = doc.id; 
            var data = doc.data(); 
            var name = data.name; 
            var votes = data.votes; 
            var logo = data.logo; 
            
            createPost(id, name, votes, logo); 
            //data_arr.push({"id": id,  "party": name, "votes": votes})
            //parties[id] = name;
            //alert(data_arr[0]['party']); 
		 });
	});
	

}