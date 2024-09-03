import React from "react";

interface Address {
  houseNumber: string;
  street: string;
  city: string;
  country: string;
}

interface AddressFormProps {
  address: Address;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  prefix: string;
}

const AddressForm: React.FC<AddressFormProps> = ({
  address,
  onChange,
  prefix,
}) => {
  return (
    <div>
      <div>
        <label htmlFor={`${prefix}.houseNumber`}>House Number:</label>
        <input
          id={`${prefix}.houseNumber`}
          name={`${prefix}.houseNumber`}
          value={address.houseNumber}
          onChange={onChange}
        />
      </div>
      <div>
        <label htmlFor={`${prefix}.street`}>Street:</label>
        <input
          id={`${prefix}.street`}
          name={`${prefix}.street`}
          value={address.street}
          onChange={onChange}
        />
      </div>
      <div>
        <label htmlFor={`${prefix}.city`}>City:</label>
        <input
          id={`${prefix}.city`}
          name={`${prefix}.city`}
          value={address.city}
          onChange={onChange}
        />
      </div>
      <div>
        <label htmlFor={`${prefix}.country`}>Country:</label>
        <input
          id={`${prefix}.country`}
          name={`${prefix}.country`}
          value={address.country}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default AddressForm;
