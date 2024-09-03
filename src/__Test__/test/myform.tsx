import React, { useState } from "react";
import AddressForm from "./addressForm";

interface Address {
  houseNumber: string;
  street: string;
  city: string;
  country: string;
}

interface FormData {
  name: string;
  idCardAddress: Address;
  currentAddress: Address;
  email: string;
  phone: string;
}

const MyForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    idCardAddress: { houseNumber: "", street: "", city: "", country: "" },
    currentAddress: { houseNumber: "", street: "", city: "", country: "" },
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const [group, field] = name.split(".");

    setFormData((prevData) => ({
      ...prevData,
      [group]: {
        ...prevData[group as keyof Omit<FormData, "name" | "email" | "phone">],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <AddressForm
        address={formData.idCardAddress}
        onChange={handleChange}
        prefix="idCardAddress"
      />

      <AddressForm
        address={formData.currentAddress}
        onChange={handleChange}
        prefix="currentAddress"
      />

      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
