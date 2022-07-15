let empPayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
    //UC16: Get data from local storage
    empPayrollList = getEmployeePayrollDataFromStorage();
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
});

const getEmployeePayrollDataFromStorage = () => {
    return localStorage.getItem('EmployeePayrollList') ?
                        JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}
// UC14: Template Literals (ES6) feature
const createInnerHtml = () => {
    // UC15: Get details from JSON-file
    if (empPayrollList.length == 0) return;
    const headerHtml = "<th>Profile</th><th>Name</th><th>Gender</th><th>Department</th>"+
                       "<th>Salary</th><th>Start Date</th><th>Actions</th>";
    let innerHtml = `${headerHtml}`;
    //let empPayrollList = createEmployeePayrollJSON();
    for (const empPayrollData of empPayrollList) {
        innerHtml = `${innerHtml}  
        <tr>
            <td><img class="profile" alt=""
                src="${empPayrollData._profilePic}">
            </td>
            <td>${empPayrollData._name}</td>
            <td>${empPayrollData._gender}</td>
            <td>${getDeptHtml(empPayrollData._department)}</td>
            <td>${empPayrollData._salary}</td>
            <td>${stringifyDate(empPayrollData._startDate)}</td>
            <td>
                <img id="${empPayrollData._name}" onclick="remove(this)" alt="delete" src="../assets/Images/delete-black-18dp.svg">
                <img id="${empPayrollData._name}" onclick="update(this)" alt="edit" src="../assets/Images/update-black-18dp.svg">
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
            _id: new Date().getTime(),
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
            _id: new Date().getTime() + 1,
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
            _id: new Date().getTime() + 1,
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
// UC 17: Remove an Employee from the Payroll Details
const remove = (node) =>{
    let empPayrollData = empPayrollList.find(empData => empData._name == node.id);
    if(!empPayrollData){return;}
    const index =empPayrollList.map(empData => empData._name).indexOf(empPayrollData._name);
    empPayrollList.splice(index, 1);
    localStorage.setItem("EmployeePayrollList", JSON.stringify(empPayrollList));
    document.querySelector('.emp-count').textContent = empPayrollList.length;
    createInnerHtml();
}