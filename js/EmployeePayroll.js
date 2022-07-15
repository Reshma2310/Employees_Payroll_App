class EmployeePayrollData {
    //getter and setter method

    get id(){
        return this._id;
    }
    set id(id){
        this._id=id;
    }     
    get name() {
        return this._name;
    }
    set name(name) {
        console.log("inside setter");
        const nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
        if (nameRegex.test(name)) {
            this._name=name;
        } else {
            throw "Invalid, Name should be like Ex: Rose";
        }
    }
    get profilePic(){
        return this._profilePic;
    }
    set profilePic(profilePic){
        this._profilePic=profilePic;
    }
    get gender(){
        return this._gender;
    }
    set gender(gender){
        this._gender=gender;
    }
    get department(){
        return this._department;
    }
    set department(department){
        this._department=department;
    }
    get salary(){
        return this._salary;
    }
    set salary(salary){
        this._salary=salary;
    }
    get notes(){
        return this._notes;
    }
    set notes(notes){
        this._notes=notes;
    }
    get startDate(){
        return this._startDate;
    }      
    set startDate(startDate){
        let now = new Date();
        if(startDate > now) 
            throw 'Start Date is a Future Date!';
        var diff = Math.abs(now.getTime() - startDate.getTime());
        if (diff / (1000 * 60 * 60 * 24) > 30)
            throw 'Start Date is beyond 30 Days!';
        this._startDate = startDate;       
    }
    toString() {
        const options = { day: 'numeric', month: 'short', year: 'numeric'};
        const empDate = !this.startDate ? "undefined" :
                    this.startDate.toLocaleDateString('en-GB', options);
        return "id =" +this.id + ", Name' " + this.name + ", Gender=' " +this.gender +
               ", ProfilePic= ' " +this.profilePic +", Department=" +this.department +
               ", Salary=" +this.salary + ", StartDate=" + empDate + ", Notes=" +this.notes;
    }
}