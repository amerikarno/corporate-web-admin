import { Input } from "@/components/Input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { register } from "module";
import * as pages from "@/const/pages";

const Welcome = () => {
  type FullName = {
    title: string;
    name: string;
    surname: string;
    email: string;
    mobile: string;
  };

  const testUser = {
    name: "test",
    groups: [3, 4],
  };

  const onSubmit1 = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission
    const formData = new FormData(event.currentTarget);
    const data: FullName = {
      title: formData.get("title") as string,
      name: formData.get("name") as string,
      surname: formData.get("surname") as string,
      email: formData.get("email") as string,
      mobile: formData.get("mobile") as string,
    };
    console.log(data);
  };
  const onSubmit2 = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission
    const formData = new FormData(event.currentTarget);
    const data: FullName = {
      title: formData.get("title1") as string,
      name: formData.get("name1") as string,
      surname: formData.get("surname1") as string,
      email: formData.get("email1") as string,
      mobile: formData.get("mobile1") as string,
    };
    console.log(data);
  };

  return (
    <>
      <Card className="w-4/5 mx-auto mt-20">
        <form onSubmit={onSubmit1}>
          <CardHeader className="border-b-2 ">Corporate Information</CardHeader>
          <CardContent>
            <div className="flex flex-col w-full mt-5 space-y-5">
              {testUser.groups.includes(pages.HOME1) ? null : (
                <div className="flex w-1/2 gap-x-2 ">
                  <Input label="Title" id="title" name="title" />
                  <br />
                </div>
              )}
              <div className="flex w-full gap-x-4 ">
                <Input label="Name" id="name" name="name" />
                <Input label="Surname" id="surname" name="surname" />
              </div>
              <div className="flex w-full gap-x-4 ">
                <Input label="Email" id="email" name="email" />
                <Input label="Mobile" id="mobile" name="mobile" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="mt-5 flex justify-end ">
            <button className="bg-orange-400 py-3 px-10 rounded ring-2 ring-red-400">
              Save
            </button>
          </CardFooter>
        </form>
      </Card>
      <Card className="w-4/5 mx-auto mt-20">
        <form onSubmit={onSubmit2}>
          <CardHeader className="border-b-2">Corporate Address</CardHeader>
          <CardContent>
            <div className="flex flex-col w-full mt-5 space-y-5">
              <div className="flex w-1/2 gap-x-2 ">
                <Input label="Title" id="title" name="title1" />
                <br />
              </div>
              <div className="flex w-full gap-x-4 ">
                <Input label="Name" id="name" name="name1" />
                <Input label="Surname" id="surname" name="surname1" />
              </div>
              <div className="flex w-full gap-x-4 ">
                <Input label="Email" id="email" name="email1" />
                <Input label="Mobile" id="mobile" name="mobile1" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="mt-5 flex justify-end ">
            <button className="bg-orange-400 py-3 px-10 rounded ring-2 ring-red-400">
              Save
            </button>
          </CardFooter>
        </form>
      </Card>
    </>
    // <div className="flex flex-col">
    //   <p>Welcome to Finansia Digital Asset Admin page</p>
    //   <p>Edit by karn</p>
    //   <p>10.0</p>
    //   <div className="flex flex-col w-full p-4 space-y-5">
    //     <div className="flex w-1/2 gap-x-2 ">
    //       <Input label="Title" id="title" name="title" />
    //       <br />
    //     </div>
    //     <div className="flex w-full gap-x-4 ">
    //       <Input label="Name" id="name" name="name" />
    //       <Input id="surname" label="Surname" name="surname" />
    //     </div>
    //   </div>
    // </div>
  );
};

export default Welcome;
