import Input from "@/components/Input";
import { Divide } from "lucide-react";

const Welcome = () => {
  type page = {
    firstName: string;
    surName: string;
    email: string;
    mobile: string;
  };
  return (
    <div className="flex flex-col gap-y-4">
      <p>Welcome to Finansia Digital Asset Admin page</p>
      <p>Edit by karn</p>
      <p>10.0</p>
      <div className="divide-y-2 mt-10 col-span-2 divide-gray-500 px-4 space-y-4">
        <div className="grid grid-cols-2  gap-x-4">
          <Input type="text" title="Name" name="name" autofocus />
          <Input type="text" title="Surname" name="surmame" />
          <Input type="email" title="Email" name="email" />
          <Input type="text" title="Mobile" name="mobile" />
          <Input
            type="date"
            title="Birthday"
            name="firstName"
            max="2014-07-15"
            min="1924-07-15"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 pt-4">
          <Input type="text" title="Address No" name="addressNo" />
          <Input type="text" title="Moo No" name="mooNo" />
          <Input type="text" title="Village No" name="villageNo" />
          <Input type="text" title="Village Name" name="villageName" />
          <Input type="text" title="Soi" name="soi" />
          <Input type="text" title="Street" name="street" />
          <Input type="text" title="Tambon" name="tambon" />
          <Input type="text" title="Amphure" name="amphure" />
          <Input type="text" title="Province" name="province" />
          <Input type="text" title="Zipcode" name="zipcode" />
          <Input type="text" title="Country" name="country" />
        </div>
        <div className="grid grid-cols-2 gap-4 pt-4  ">
          <Input type="text" title="Address No" name="addressNo" />
          <Input type="text" title="Moo No" name="mooNo" />
          <Input type="text" title="Village No" name="villageNo" />
          <Input type="text" title="Village Name" name="villageName" />
          <Input type="text" title="Soi" name="soi" />
          <Input type="text" title="Street" name="street" />
          <Input type="text" title="Tambon" name="tambon" />
          <Input type="text" title="Amphure" name="amphure" />
          <Input type="text" title="Province" name="province" />
          <Input type="text" title="Zipcode" name="zipcode" />
          <Input type="text" title="Country" name="country" />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
