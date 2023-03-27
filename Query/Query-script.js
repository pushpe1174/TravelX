'use strict';

let query = document.querySelector('.Query');
let view = document.querySelector('.View');
let submit =  document.querySelector('.Submit');

let input_data = document.querySelectorAll('.Q-input');
let arrow = document.querySelector('.arrow');
let selectBox = document.querySelector('.select-box');
let options = document.querySelectorAll('.options');
let checkBtn =  document.getElementById('check-btn')
let subjectValue = document.getElementById('subject');
let viewBtn = document.getElementById('btn-view');

let name = document.getElementById('name');
let email = document.getElementById('email');
let subject = document.getElementById('subject');
subject .readOnly = true;
let details = document.getElementById('Details');
let disable_textArea = document.getElementById('details-con');
disable_textArea.disabled = true;

let nameError = document.querySelector('.name-error');
let emailError = document.querySelector('.email-error');
let subjectError = document.querySelector('.subject-error');
let detailsError = document.querySelector('.details-error');

let content = document.querySelectorAll('.content');
let editBtn = document.getElementById('btn-edit');
let submitBtn = document.getElementById('btn-send');
let okBtn = document.getElementById('btn-ok');

function blurEffect (data,data_span){
    if(data.value !== ""){
        data_span.setAttribute('id','set-span');
    }else{
        data_span.removeAttribute('id','set-span');
    }
}

input_data.forEach((data)=>{
    data.addEventListener('blur',()=>{
        let data_span = data.nextElementSibling;
        blurEffect(data,data_span);
    })
});

function dropdownEffect(){
    if(selectBox.classList.contains('active')){
        selectBox.classList.remove('active');
    }else{
        selectBox.classList.add('active');
    }
}

arrow.addEventListener('click',()=>{
    dropdownEffect();
});

options[0].addEventListener('click', () => {
        subjectValue.value = "Delivery";
        blurEffect(input_data[2],input_data[2].nextElementSibling);
        dropdownEffect();
});
options[1].addEventListener('click',()=>{
    subjectValue.value = "Price";
    blurEffect(input_data[2],input_data[2].nextElementSibling);
    dropdownEffect();
});
options[2].addEventListener('click',()=>{
    subjectValue.value = "Quality";
    blurEffect(input_data[2],input_data[2].nextElementSibling);
    dropdownEffect();
});
options[3].addEventListener('click',()=>{
    subjectValue.value = "Staff";
    blurEffect(input_data[2],input_data[2].nextElementSibling);
    dropdownEffect();
});


viewBtn.addEventListener('click',()=>{
    let emailCheck = !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value));
    let msg = "Please fill the form correctly!!";
    if(name.value.length === 0 || emailCheck || subject.value.length === 0 || details.value.length === 0 || !checkBtn.checked){
        if(name.value.length === 0){
            nameError.innerHTML = "<i class=\"fa-solid fa-xmark cross\"></i>"
            msg += "\n Name field is empty";
        }else{
            nameError.innerHTML = "<i class=\"fa-solid fa-check tick\"></i>"
        }

        if(subject.value.length === 0){
            subjectError.innerHTML = "<i class=\"fa-solid fa-xmark cross\"></i>"
            msg += "\n Subject field is empty";
        }else{
            subjectError.innerHTML = "<i class=\"fa-solid fa-check tick\"></i>"
        }

        if(email.value.length === 0) {
            msg += "\n Email field is empty"
            emailError.innerHTML = "<i class=\"fa-solid fa-xmark cross\"></i>"
        }else if (emailCheck) {
            msg += "\n Email format is invalid"
            emailError.innerHTML = "<i class=\"fa-solid fa-xmark cross\"></i>"
        }else{
            emailError.innerHTML = "<i class=\"fa-solid fa-check tick\"></i>"
        }

        if(details.value.length === 0){
            detailsError.innerHTML = "<i class=\"fa-solid fa-xmark cross\"></i>"
            msg += "\n Details field is empty";
        }else{
            detailsError.innerHTML = "<i class=\"fa-solid fa-check tick\"></i>"
        }
        if(!checkBtn.checked){
            msg += "\n Check button field is empty";
        }
        alert(msg);

    }else{
        query.classList.remove('active');
        content[0].textContent = name.value;
        content[1].textContent = email.value;
        content[2].textContent = subject.value;
        content[3].textContent = details.value;

        view.classList.add('active');
    }
});

editBtn.addEventListener('click',()=>{
    view.classList.remove('active');
    query.classList.add('active');
    nameError.innerHTML = "<i class=\"fa-solid fa-check tick\"></i>"
    subjectError.innerHTML = "<i class=\"fa-solid fa-check tick\"></i>"
    emailError.innerHTML = "<i class=\"fa-solid fa-check tick\"></i>"
    detailsError.innerHTML = "<i class=\"fa-solid fa-check tick\"></i>"
})

submitBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    view.classList.remove('active');
    submit.classList.add('active');
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "smurfslpushpe@gmail.com",
        Password : "5BB571E6627E5CEDD2108439267B70E59EF3",
        To : 'smurfslpushpe@gmail.com',
        From : "smurfslpushpe@gmail.com",
        Subject : "Query form Mail",
        Body : "Query Form ==> \n" +
            `Name    : ${name.value}\n` +
            `Email   : ${email.value}\n` +
            `Subject : ${subject.value}\n` +
            `Details : ${details.value}\n`
    });
})

okBtn.addEventListener('click',()=>{
    window.location.reload();
})
