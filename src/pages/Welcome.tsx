import Grid2 from "@/components/Grid2";
import { Input } from "@/components/Input";

const Welcome = () => {
  // type page = {
  //   firstName: string;
  //   surName: string;
  //   email: string;
  //   mobile: string;
  // };
  return (
    <div className="flex flex-col gap-y-4">
      <p>Welcome to Finansia Digital Asset Admin page</p>
      <p>Edit by karn</p>
      <p>10.0</p>
      <Grid2>
        <Input label="Title" id="title" name="title" />
        <br />
        <Input label="Name" id="name" name="name" />
        <Input id="surname" label="Surname" name="surname" />
      </Grid2>
    </div>
  );
};

export default Welcome;
