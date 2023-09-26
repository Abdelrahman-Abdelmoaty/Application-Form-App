import "../App.css";
import FormElement from "./FormElement";
import AddAQuestion from "./Questions/AddAQuestion";

export default function PersonalInformation() {
  return (
    <div className="card">
      <p>Personal Information</p>
      <div className="flex">
        <FormElement name="firstName" label="First Name" />
        <FormElement name="lastName" label="Last Name" />
        <FormElement name="emailId" label="Email" />
        <FormElement name="phoneNumber" label="Phone" options={true} />
        <FormElement name="nationality" label="Nationality" options={true} />
        <FormElement name="currentResidence" label="Current Residence" options={true} />
        <FormElement name="idNumber" label="ID Number" options={true} />
        <FormElement name="dateOfBirth" label="Date of Birth" options={true} />
        <FormElement name="gender" label="Gender" options={true} />
        <AddAQuestion type="personal" />
      </div>
    </div>
  );
}
