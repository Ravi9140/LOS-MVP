"use client";

import {
  ChangeEvent,
  FocusEvent,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { FormValues, UserApplicationProps, defaultFormValues } from "./types";
import { validateField } from "./helpers/validate-field";
import { validateFile } from "./helpers/validate-file";
import { handleSubmit } from "./helpers/handle-submit";
import PersonalDetails from "./personal-details";
import KYCDetails from "./kyc-details";
import EmploymentDetails from "./employment-details";
import ResedentialAddress from "./resedential-address";

const UserApplication: FunctionComponent<UserApplicationProps> = ({ data }) => {
  const [values, setValues] = useState<FormValues>(defaultFormValues);
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [aadharPreview, setAadharPreview] = useState<string | null>(null);
  const [panPreview, setPanPreview] = useState<string | null>(null);
  const [addressPreview, setAddressPreview] = useState<string | null>(null);
  const [incomePreview, setIncomePreview] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      setValues((prev) => ({ ...prev, ...data }));
    }
  }, [data]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      const error = validateFile(file);
      if (error) {
        setErrors((prev) => ({ ...prev, [name]: error }));
        return;
      }
      setValues((prev) => ({ ...prev, [name]: file }));
      setErrors((prev) => ({ ...prev, [name]: "" }));

      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (file.type === "application/pdf") {
          if (name === "aadharFile") {
            setAadharPreview(URL.createObjectURL(file));
          } else if (name === "panFile") {
            setPanPreview(URL.createObjectURL(file));
          } else if (name === "addressProof") {
            setAddressPreview(URL.createObjectURL(file));
          } else if (name === "incomeProof") {
            setIncomePreview(URL.createObjectURL(file));
          }
        } else {
          if (name === "aadharFile") {
            setAadharPreview(fileReader.result as string);
          } else if (name === "panFile") {
            setPanPreview(fileReader.result as string);
          } else if (name === "addressProof") {
            setAddressPreview(fileReader.result as string);
          } else if (name === "incomeProof") {
            setIncomePreview(fileReader.result as string);
          }
        }
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleBlur = (
    e: FocusEvent<HTMLInputElement> | ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    validateField(name as keyof FormValues, value, values, setErrors);
  };

  return (
    <div className="mx-2 my-12 w-full max-w-screen-md rounded-2xl border-2 border-[#cadcfc] p-6 shadow-lg md:mx-auto">
      <form
        className="space-y-4"
        onSubmit={(event) => {
          handleSubmit(event, values, setErrors);
        }}
      >
        <PersonalDetails
          values={values}
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />

        <ResedentialAddress
          values={values}
          errors={errors}
          addressPreview={addressPreview}
          handleBlur={handleBlur}
          handleChange={handleChange}
          handleFileChange={handleFileChange}
        />

        <KYCDetails
          values={values}
          errors={errors}
          aadharPreview={aadharPreview}
          panPreview={panPreview}
          handleBlur={handleBlur}
          handleChange={handleChange}
          handleFileChange={handleFileChange}
        />

        <EmploymentDetails
          values={values}
          errors={errors}
          incomePreview={incomePreview}
          handleBlur={handleBlur}
          handleChange={handleChange}
          handleFileChange={handleFileChange}
        />

        <div className="flex h-20 w-full items-center justify-center">
          <button
            type="submit"
            className="h-10 w-full max-w-[50%] rounded-xl bg-[#00246b] p-2 text-[#cadcfc] hover:bg-[#cadcfc] hover:text-[#00246b]"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserApplication;
