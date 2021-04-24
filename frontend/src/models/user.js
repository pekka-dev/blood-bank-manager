export default class User {
    constructor(
        authUser,
        fName,
        lName,
        dob,
        dCount,
        location,
        allergies,
        infection,
        bmi,
        rbm,
        bloodG,
    ) {
        this.userId = authUser.uid;
        this.emailAddress = authUser.email;
        this.firstName = fName;
        this.lastName = lName;
        this.phoneNumber = authUser.phoneNumber;
        this.dateOfBirth = dob;
        this.bloodDonationCount = dCount;
        this.zip = location.zip;
        this.state = location.state;
        this.country = location.country;
        this.dateOfEntry = new Date(authUser.createdAt);
        this.allergies = allergies;
        this.infection = infection;
        this.bmi = bmi;
        this.recentBodyMod = rbm;
        this.bloodGroup = bloodG;
    }
}
