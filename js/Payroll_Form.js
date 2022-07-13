window.addEventListener('DOMContentLoaded', (event) => {
    //UC7: Name Validation
    const name = document.querySelector('#name');
    const nameError = document.querySelector('.text-error');
    name.addEventListener('input', function () {
        try {
            let empData = new EmployeePayrollData();
            empData.name = name.value;
            nameError.textContent = "";
        } catch (e) {
            nameError.textContent = e;
        }
    });
    //Range of Salary
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    // output.textContent = salary.value;
    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });
})

/* -- UC8: On Save create Employee Payroll Object -- */
const save = () => {    
    let employeePayrollData = createEmployeePayroll();
    alert(JSON.stringify(employeePayrollData));
}
const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = getInputValueId("#name");
        setTextValue('.text-error', "");
    } catch (e) {
        setTextValue('.text-error', e);
    }
    try {
        let date = getInputValueId('#day') + " " + getInputValueId('#month') + " " + getInputValueId('#year');
        employeePayrollData.startDate = new Date(Date.parse(date));
        setTextValue('.date-error', "");
    } catch (e) {
        setTextValue('.date-error', e);
    }
    employeePayrollData.profilePic = getSelectedValue('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValue('[name=gender]').pop();
    employeePayrollData.department = getSelectedValue('[name=department]');
    employeePayrollData.salary = getInputValueId('#salary');    
    employeePayrollData.notes = getInputValueId('#notes');
    employeePayrollData.id = new Date().getTime()+1;
    return employeePayrollData;
}
const getInputValueId = (id) => {
    return document.querySelector(id).value;
}
const setTextValue = (id, message) => {
    const textError = document.querySelector(id);
    textError.textContent = message;
}
const getSelectedValue = (propertyValue)=> {
    let allItem = document.querySelectorAll(propertyValue);
    let setItem = [];
    allItem.forEach(item=>{
        if(item.checked == true){
            setItem.push(item.value);
        }
    })
    return setItem;
}
