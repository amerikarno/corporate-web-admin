import './contactPerson.css'
import { useState,useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { SideLabelInput } from '@/components/SideLabelInput';
import { zodResolver } from "@hookform/resolvers/zod";
import { 
    TContactPersonSchema,
    contactPersonSchema
  } from "../corporate/constants/schemas";
import {useForm} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { TContactPersonType } from '../corporate/constants/types';
import { sleep } from "@/lib/utils";
import {ContactCard} from "./contactCard";

// type TContactPersonProps = {
//     submitdata: (data: TContactPersonType) => void;
//   };
export default function CreateContactPerson() {
    const [contactlist,setContactlist] = useState<TContactPersonType[]>([]);
    useEffect(() => {
        console.log(contactlist);
    }, [contactlist]);
    const onSubmit = async (data: TContactPersonSchema) => {
        setContactlist([...contactlist, data])
        console.log(contactlist)
        reset();
        // setContactlist([])
    };
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
      } = useForm<TContactPersonSchema>({
        resolver: zodResolver(contactPersonSchema),
      });
  return (
    <>
      <div className="container">
        <div className="box">
            <div className="contact-header">Contact person</div>
            <div className="white-box">
                <div className="contact-no">
                    Contact Information
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card>
                        <div className="single-input-box">
                            <SideLabelInput title="Name-Surname">
                                <Input
                                {...register("contactnamesurname")}
                                name = "contactnamesurname"
                                disabled = {isSubmitting}
                                required
                                />
                                {errors.name && (
                                    <p className="text-red-500">{errors.name.message}</p>
                                )}
                            </SideLabelInput>
                        </div>
                        <div className="two-input-box">
                                    <SideLabelInput title="Position">
                                        <Input
                                        {...register("contactposition")}
                                        name = "contactposition"
                                        disabled = {isSubmitting}
                                        required
                                        />
                                        {errors.name && (
                                            <p className="text-red-500">{errors.name.message}</p>
                                        )}
                                    </SideLabelInput>
                                <SideLabelInput title="Division">
                                    <Input
                                    {...register("contactdivision")}
                                    name = "contactdivision"
                                    disabled = {isSubmitting}
                                    required
                                    />
                                    {errors.name && (
                                        <p className="text-red-500">{errors.name.message}</p>
                                    )}
                                </SideLabelInput>
                         </div>
                        <div className="two-input-box">
                            <div className="input-box">
                                <SideLabelInput title="Telephone">
                                    <Input
                                    {...register("contacttelephone")}
                                    name = "contacttelephone"
                                    disabled = {isSubmitting}
                                    required
                                    />
                                    {errors.name && (
                                        <p className="text-red-500">{errors.name.message}</p>
                                    )}
                                </SideLabelInput>
                            </div>
                            <div className="input-box">
                            <SideLabelInput title="Email">
                                <Input
                                {...register("contactemail")}
                                name = "contactemail"
                                disabled = {isSubmitting}
                                required
                                />
                                {errors.name && (
                                    <p className="text-red-500">{errors.name.message}</p>
                                )}
                            </SideLabelInput>
                            </div>
                        </div>
                    </Card>
                    <button type="submit" className="add-btn" >เพิ่ม +</button>
                </form>
            </div>
        </div>
        {contactlist.length === 0 ? (<></>):(<div className="contact-list">
                <h2>Contact List</h2>
                <ul>
                    {contactlist.map((contact, index) => (
                        <li key={index}>
                            {/* <p>Contact number :{index+1}</p>
                            <span>{contact.contactnamesurname}</span><br/>
                            <span>{contact.contactposition}</span><br/>
                            <span>{contact.contactdivision}</span><br/>
                            <span>{contact.contacttelephone}</span><br/>
                            <span>{contact.contactemail}</span> */}
                            <ContactCard/>
                        </li>
                    ))}
                </ul>
            </div>)}
      </div>
    </>
  );
}
