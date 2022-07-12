//Range of Salary
{
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function() {
    output.textContent = salary.value;
    });
}
//Name Validation
{
    const name = document.querySelector('#name');
    const message = document.querySelector('.error-output');
    name.addEventListener('input', function()
    {
        let nameCheck = RegExp('^[A-Z]{1}[a-zA-Z]{2,}$');
        if(nameCheck.test(name.value))
            message.textContent = "";
        else 
            message.textContent = "Incorrect, Name should be like, Ex: Rose";
    });
}