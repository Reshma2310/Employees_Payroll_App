window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHtml();
});

const createInnerHtml = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>"+
                       "<th>Salary</th><th>Start Date</th><th>Actions</th>";
    let innerHtml = `${headerHtml}`;
    let empPayrollList = createEmployeePayrollJSON();
    for (const empPayrollData of empPayrollList) {
        innerHtml = `${innerHtml}  
        <tr>
            <td><img class="profile" alt=""
                src="${empPayrollData._profilePic  }">
            </td>
            <td>${empPayrollData._name}</td>
            <td>${empPayrollData._gender}</td>
            <td>${getDeptHtml(empPayrollData._department)}</td>
            <td>${empPayrollData._salary}</td>
            <td>${empPayrollData._startDate}</td>
            <td>
                <img id="1" onclick="remove(this)" alt="delete" src="../assets/Images/delete-black-18dp.svg">
                <img id="1" onclick="update(this)" alt="edit" src="../assets/Images/update-black-18dp.svg">
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