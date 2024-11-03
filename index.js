const passwordInput = document.getElementById('password-input');
const strengthMeter = document.getElementById('strength-meter');
const reasonsContainer = document.getElementById('reasons');


passwordInput.addEventListener('input',updateStrengthMeter);

function updateStrengthMeter(){
    const password = passwordInput.value; 
    // console.log(password)
    const weaknesses = calculatePasswordStrength(password);
    console.log(weaknesses)
    let strength = 100;
    reasonsContainer.innerHTML = '';
    weaknesses.forEach((weakpoint) =>{
        // console.log(weakpoint)
        // console.log(weakpoint.deduction)
        // console.log(weakpoint.message)
        if (weakpoint == null) return
        strength -= weakpoint.deduction;
        console.log(strength)
        errormessage = document.createElement('div');
        errormessage.innerHTML = weakpoint.message;
        reasonsContainer.appendChild(errormessage);
    });
    strengthMeter.style.setProperty('--strength', strength);
}

function calculatePasswordStrength(password){
    weakpoint = [];
    weakpoint.push(lengthWeakness(password));
    weakpoint.push(lowercaseWeakness(password));
    weakpoint.push(uppercaseWeakness(password));
    weakpoint.push(NumbercaseWeakness(password));
    weakpoint.push(specialCharactersWeakness(password));
    weakpoint.push(repeatWeaknesscaseWeakness(password));
    return weakpoint;
}

function lengthWeakness(password){
    const length = password.length;
    if(length <=4){
        return{
            message: 'your password must be more than 5 character or number',
            deduction: 40
        }
    }
    if(length <=8){
        return{
            message: 'your password should be longer',
            deduction: 15
        }
    }
}

function lowercaseWeakness(password) {
  return  characterTypeWeakness(password,/[a-z]/g,'lowercase');
}

function uppercaseWeakness(password) {
    return  characterTypeWeakness(password,/[A-Z]/g,'uppercase');
}

function NumbercaseWeakness(password) {
    return  characterTypeWeakness(password,/[0-9]/g,'Numbercase');
}

function specialCharactersWeakness(password) {
    return  characterTypeWeakness(password,/[^0-9a-zA-Z\s]/g,'specialCharacters');
}


function repeatWeaknesscaseWeakness(password) {
   const matches = password.match(/(.)\1/g) || []
   if(matches.length > 0){
        return{
            message: `your password have has repeat`,
            deduction: matches.length * 10
        }
    }


}

function characterTypeWeakness(password,regex,type){
   const matches = password.match(regex) || [];
    if(matches.length == 0){
        return{
            message: `your password have no ${type}`,
            deduction: 20
        }
    }
    if(matches.length <=1){
        return{
            message: 'your  should be use more',
            deduction: 5
        }
    }
}

