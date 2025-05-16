/*
File Name:  resetValidation.js
Course: CSC 648
Author:  Team 7    
Last-Updated:  12/01/2024
Description: Functions used to validate fields of forgot-password
Editors: Jaylin Jack
*/

/*
JJ
I used my logic for validation from Souza 317 project and the help of ChatGPT
*/
document.addEventListener('DOMContentLoaded', function () {
    // Grab the input fields from the form
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');

    // Below any field will be outlined in red until it meets our reqs.
    emailInput.addEventListener('input', function() {
        if (validateEmail(emailInput.value)) {
            emailInput.classList.add('valid'); 
            emailInput.classList.remove('invalid'); 
        } else {
            emailInput.classList.add('invalid');
            emailInput.classList.remove('valid'); 
        }
    });

    passwordInput.addEventListener('input', function() {
        if (validatePassword(passwordInput.value)) {
            passwordInput.classList.add('valid'); 
            passwordInput.classList.remove('invalid'); 
        } else {
            passwordInput.classList.add('invalid'); 
            passwordInput.classList.remove('valid');
        }
    });

    confirmPasswordInput.addEventListener('input', function() {
        if (validateConfirmPassword(passwordInput.value, confirmPasswordInput.value)) {
            confirmPasswordInput.classList.add('valid');
            confirmPasswordInput.classList.remove('invalid');
        } else {
            confirmPasswordInput.classList.add('invalid'); 
            confirmPasswordInput.classList.remove('valid'); 
        }
    });

    // Form submission event to check validity before submitting
    forgotPasswordForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Check if all fields are valid before submitting
        if (validateEmail(emailInput.value) && validatePassword(passwordInput.value) && validateConfirmPassword(passwordInput.value, confirmPasswordInput.value)) {
            // If all fields are valid, submit the form
            forgotPasswordForm.submit();
        } else {
            alert("Please fix the errors before submitting.");
        }
    });


    function validateEmail(email) {
         // Make sure email has @sfsu.edu at the end
        const regex = /^[a-zA-Z0-9._%+-]+@sfsu\.edu$/;
        return regex.test(email);
    }

    function validatePassword(password) {
        // Check if the password is at least 8 characters long
        return password.length >= 8; 
    }

    function validateConfirmPassword(password, confirmPassword) {
        // Check if the password and confirm password match
        return password === confirmPassword; 
    }
});
