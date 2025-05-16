/*
File Name:  searchFunctions.js
Course: CSC 648
Author:  Team 7    
Last-Updated:  12/01/2024
Description: Functions used to perform search, useful since search has to exist on all pages
Editors: Jaylin Jack
*/

/*
JJ
This function wad created with the help of ChatGPT
*/
function performSearch() {
    // Retrieve the subject selected by the user from the ejs page.
    const subjectSelected = document.getElementById('department').value;

    // Retrieve the search bar input by the user from the ejs page.
    const search = document.getElementById("description").value;

    let searchParameters = [];
    if(subjectSelected) {
        // Add the subject to the url
        searchParameters.push(`subject=${encodeURIComponent(subjectSelected)}`);
    }
    
    if(search) {
        // Alphanumeric only regex for sql injection security
        const regex = /^[a-zA-Z0-9_ ]+$/;
        
        if (!regex.test(search)) {
            alert("Search query must contain only alphanumeric characters.");
            return; // Stop further execution
        }

        // Add the input to the url
        searchParameters.push(`bio=${encodeURIComponent(search)}`);
    }
    
    if(!subjectSelected && !search){
        // If no subject is selected and no input exists, send user back to home.
        window.location.href = `/`;
    }
    window.location.href = `/search/tutors?${searchParameters.join('&')}`;

    
}


