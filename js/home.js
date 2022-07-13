window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHtml();
});

const createInnerHtml = () => {
    const innerHtml = `
    <tr>
        <th></th>
        <th>Name</th>
        <th>Gender</th>
        <th>Department</th>
        <th>Salary</th>
        <th>Start Date</th>
        <th>Actions</th>
    </tr>
    <tr>
        <td><img class="profile" alt=""
            src="../assets/Images/employee1.png">
        </td>
        <td>Reshma</td>
        <td>Female</td>
        <td><div class="dept-label">Designer</div></td>
        <td>400000</td>
        <td>15 July 2021</td>
        <td>
            <img id="1" onclick="remove(this)" alt="delete" src="../assets/Images/delete-black-18dp.svg">
            <img id="1" onclick="update(this)" alt="edit" src="../assets/Images/update-black-18dp.svg">
        </td>
    </tr>
    `;
    document.querySelector('#table-display').innerHTML = innerHtml;
}