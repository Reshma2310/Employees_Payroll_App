let isUpdate = false;
let employeePayrollObj = {};
window.addEventListener('DOMContentLoaded', (event) => {
    //UC7: Name Validation
    const name = document.querySelector('#name');//modified in UC-19    
    name.addEventListener('input', function () {
        if(name.value.length == 0) {
            setTextValue('.text-error', "");
            return;
        }
        try {
            (new EmployeePayrollData()).name = name.value;            
            setTextValue('.text-error', "");
        } catch (e) {
            setTextValue('.text-error', e);
        }
    });
    //Event Listener for Date (UC-19)
    const date = document.querySelector('#date');
    date.addEventListener('input', function() {
        try {
            let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
            (new EmployeePayrollData()).startDate = new Date(Date.parse(date));
            setTextValue('.date-error', "");
        } catch (e) {
            setTextValue('.date-error', e);
        }
    });
    //Range of Salary
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });
    checkForUpdate();
});

// UC8: On Save create Employee Payroll Object 
const save = (event) => {
    event.preventDefault();//prevent resetting the form (UC-19) 
    event.stopPropagation();   
    try{
        setEmployeePayrollObject();
        createAndUpdateStorage();
        resetForm();
        window.location.href = "../pages/HomePage.html";
    }
    catch (e) {
        return;
    }    
}
//UC19: Updating the value 
const setEmployeePayrollObject= () => { 
    employeePayrollObj._name = getInputValueById('#name');
    employeePayrollObj._profilePic = getSelectedValue('[name=profile]').pop();
    employeePayrollObj._gender = getSelectedValue('[name=gender]').pop();
    employeePayrollObj._department = getSelectedValue('[name=department]');
    employeePayrollObj._salary = getInputValueById('#salary');
    employeePayrollObj._notes = getInputValueById('#notes');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
    employeePayrollObj._startDate = date;
}

function createAndUpdateStorage(employeePayrollData){
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList){
        let empPayrollData = employeePayrollList.
                            find(empData => empData._id == employeePayrollObj._id);
        if (!empPayrollData) {
            employeePayrollList.push(createEmployeePayrollData());
        } else {
            const index = employeePayrollList
                          .map(empData => empData._id)
                          .indexOf(empPayrollData._id);
            employeePayrollList.splice(index, 1, createEmployeePayrollData(empPayrollData._id));
        }
    } else {
        employeePayrollList = [employeePayrollData]
    }    
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));    
}

const createEmployeePayrollData = (id) => {  //to read data from JSON
    let employeePayrollData = new EmployeePayrollData();
    if (!id) employeePayrollData.id = createNewEmployeeId();
    else employeePayrollData.id = id;
    setEmployeePayrollData(employeePayrollData);
    return employeePayrollData; 
}

const setEmployeePayrollData = (employeePayrollData) => {
    try {
        employeePayrollData.name = employeePayrollObj._name;
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayrollData.profilePic = employeePayrollObj._profilePic;
    employeePayrollData.gender = employeePayrollObj._gender;
    employeePayrollData.department = employeePayrollObj._department;
    employeePayrollData.salary = employeePayrollObj._salary;    
    employeePayrollData.notes = employeePayrollObj._notes;
    try {
        employeePayrollData.startDate = new Date(Date.parse(employeePayrollObj._startDate));
    } catch (e) {
        setTextValue('.date-error', e);
        throw e;
    }
    alert(employeePayrollData.toString());
}

const createNewEmployeeId = () => {
    let empID = localStorage.getItem("EmployeeID");
    empID = !empID ? 1 : (parseInt(empID)+1).toString();
    localStorage.setItem("EmployeeID", empID);
    return empID;
}

const createEmployeePayroll = () => { //Reading data from UI
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = getInputValueById('#name');
        setTextValue('.text-error', "");
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayrollData.profilePic = getSelectedValue('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValue('[name=gender]').pop();
    employeePayrollData.department = getSelectedValue('[name=department]');
    employeePayrollData.salary = getInputValueById('#salary');    
    employeePayrollData.notes = getInputValueById('#notes');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
    employeePayrollData.startDate = new Date(Date.parse(date)); 
    alert(employeePayrollData.toString());
    return employeePayrollData;
}
const getInputValueById = (id) => {
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

// UC 10: Reset the Employee Payroll Form
const resetForm = () => {
    setValue('#name','');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary','');
    setValue('#notes','');
    setSelectedIndex('#day',0);
    setSelectedIndex('#month',0);
    setSelectedIndex('#year',0);
}

const setSelectedIndex = (id, index) => {
    const element = document.querySelector(id);
    element.selectedIndex = index;
}

const setValue = (id, value) =>{
    const element = document.querySelector(id);
    element.value = value;
}

const unsetSelectedValues = (propertyValue) =>{
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => item.checked = false);
}
//UC 18: Update the details in the Payroll Details list
const checkForUpdate =()=>{
    const employeePayrollJSON = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJSON ? true : false;
    if(!isUpdate)return;
    employeePayrollObj = JSON.parse(employeePayrollJSON);
    setForm();
}

const setForm = () => {
    setValue('#name', employeePayrollObj._name);
    setSelectedValues('[name=profile]', employeePayrollObj._profilePic);
    setSelectedValues('[name=gender]', employeePayrollObj._gender);
    setSelectedValues('[name=department]', employeePayrollObj._department);
    setValue('#salary', employeePayrollObj._salary);
    setTextValue('.salary-output', employeePayrollObj._salary);
    setValue('#notes', employeePayrollObj._notes);
    let date = stringifyDate(employeePayrollObj._startDate).split(" ");
    setValue('#day', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);        
}

const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if(Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        }
        else if (item.value === value)
            item.checked = true;
    });
}