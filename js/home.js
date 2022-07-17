let empPayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
    if (siteProperties.use_local_storage.match("true")) {
        getEmployeePayrollDataFromStorage();
    } else getEmployeePayrollDataFromServer();    
});

const getEmployeePayrollDataFromStorage = () => {
    empPayrollList = localStorage.getItem('EmployeePayrollList') ?
                        JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
    processEmployeePayrollDataResponse();
}
const processEmployeePayrollDataResponse = () => {
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
}
const getEmployeePayrollDataFromServer =() =>{
    makeServiceCall("GET", siteProperties.server_url, true)
        .then(responseText => {
            empPayrollList = JSON.parse(responseText);
            processEmployeePayrollDataResponse();
        })
        .catch(error => {
            console.log("GET Error Status: " + JSON.stringify(error));
            empPayrollList = [];
            processEmployeePayrollDataResponse();
        });
}
// UC14: Template Literals (ES6) feature
const createInnerHtml = () => {
    // UC15: Get details from JSON-file
    const headerHtml = "<th>Profile</th><th>Name</th><th>Gender</th><th>Department</th>"+
                       "<th>Salary</th><th>Start Date</th><th>Actions</th>";
    let innerHtml = `${headerHtml}`;
    if (empPayrollList.length == 0) {return};
    for (const empPayrollData of empPayrollList) {
        innerHtml = `${innerHtml}  
        <tr>
            <td><img class="profile" alt="" src="${empPayrollData._profilePic}"></td>
            <td>${empPayrollData._name}</td>
            <td>${empPayrollData._gender}</td>
            <td>${getDeptHtml(empPayrollData._department)}</td>
            <td>${empPayrollData._salary}</td>
            <td>${stringifyDate(empPayrollData._startDate)}</td>
            <td>
                <img id="${empPayrollData.id}" onclick="remove(this)" alt="delete" src="../assets/Images/delete-black-18dp.svg">
                <img id="${empPayrollData.id}" onclick="update(this)" alt="edit" src="../assets/Images/update-black-18dp.svg">
            </td>
        </tr>
        `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}
const createEmployeePayrollJSON = () => {
    let empPayrollListLocal = [
        {
            _name: 'Reshma',
            _gender: 'Female',
            _department: [
                'Designer',
                'Engineer'
            ],
            _salary: '600000',
            _startDate: '26 Oct 2016',
            _note: '',
            id: new Date().getTime(),
            _profilePic: '../assets/Images/employee1.png'
        },
        {
            _name: 'Basith',
            _gender: 'Male',
            _department: [
                'Engineer'
            ],
            _salary: '500000',
            _startDate: '26 Jul 2017',
            _note: '',
            id: new Date().getTime() + 1,
            _profilePic: '../assets/Images/employee2.png'
        },
        {
            _name: 'Tanvir',
            _gender: 'Female',
            _department: [
                'Designer',
                'Developer'
            ],
            _salary: '500000',
            _startDate: '24 Apl 2018',
            _note: '',
            id: new Date().getTime() + 1,
            _profilePic: '../assets/Images/employee3.png'
        }
    ];
    return empPayrollListLocal;
}
const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`
    }
    return deptHtml;
}

const update = (node) =>{
    let empPayrollData = empPayrollList.find(empData => empData.id == node.id);
    if(!empPayrollData) return; 
    localStorage.setItem('editEmp', JSON.stringify(empPayrollData));
    window.location.replace(siteProperties.add_emp_payroll_page);
}
const remove = (node) =>{
    let employeeData = empPayrollList.find(empData => empData.id == node.id);
    if(!employeeData) return;
    const index = empPayrollList.map(empData => empData.id).indexOf(employeeData.id);
    empPayrollList.splice(index, 1);
    if(siteProperties.use_local_storage.match("true")){
        localStorage.setItem('EmployeePayrollList', JSON.stringify(empPayrollList));
        document.querySelector('.emp-count').textContent = empPayrollList.length;
        createInnerHtml();
    }
    else{
        const deleteUrl = siteProperties.server_url + employeeData.id.toString();
        makeServiceCall("DELETE", deleteUrl, false)
            .then(responseText =>{
                createInnerHtml();
            })
            .catch(error =>{
                console.log("Delete Error Status: " + JSON.stringify(error));
            });
    }
}