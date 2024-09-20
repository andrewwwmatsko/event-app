import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useId } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import dayjs from "dayjs";

import { BsPersonFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

import css from "./RegistrationField.module.css";

const knowUsFromList = ["Social media", "Friends", "Found myself"];

export default function RegistrationForm({ handleRegister }) {
  const fullNameId = useId();
  const emailId = useId();
  const dateOfBirthId = useId();

  const initialValues = {
    fullName: "",
    email: "",
    birthDate: dayjs(),
    backgroundInfo: "Found myself",
  };

  const registerSchema = Yup.object().shape(
    {
      fullName: Yup.string()
        .min(3, "Too short!")
        .max(50, "Too long!")
        .required()
        .trim(),
      email: Yup.string()
        .email()
        .min(3, "Too Short!")
        .max(50, "Too Long!")
        .required()
        .trim(),
      birthDate: Yup.date().min(new Date(1920, 0, 1)).required(),
      backgroundInfo: Yup.string().oneOf(knowUsFromList),
    },
    { strict: true }
  );

  const handleSubmit = async (values, action) => {
    try {
      await handleRegister(values);
      action.resetForm();
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={registerSchema}
    >
      {({ errors, touched, setFieldValue, setFieldTouched, values }) => (
        <Form noValidate>
          <div className={css.group}>
            <TextField
              id={fullNameId}
              name="fullName"
              label="Full Name"
              variant="outlined"
              value={values.fullName}
              placeholder="John Doe"
              error={Boolean(errors.fullName && touched.fullName)}
              onChange={(e) => setFieldValue("fullName", e.target.value)}
              onBlur={() => {
                setFieldTouched("fullName", true);
                if (!errors.fullName) {
                  setFieldValue("fullName", values.fullName.trim());
                }
              }}
              InputProps={{
                endAdornment: <BsPersonFill size={24} />,
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor:
                      errors.fullName && touched.fullName ? "red" : "gray",
                  },
                  "&:hover fieldset": {
                    borderColor:
                      errors.fullName && touched.fullName ? "red" : "gray",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor:
                      errors.fullName && touched.fullName ? "red" : "blue",
                  },
                },
              }}
            />
          </div>

          <div className={css.group}>
            <TextField
              id={emailId}
              name="email"
              label="Email"
              variant="outlined"
              value={values.email}
              placeholder="iwanttoElifTechSchool@email.com"
              error={Boolean(errors.email && touched.email)}
              onChange={(e) => setFieldValue("email", e.target.value)}
              onBlur={() => {
                setFieldTouched("email", true);
                if (!errors.email) {
                  setFieldValue("email", values.email.trim());
                }
              }}
              InputProps={{
                endAdornment: <MdEmail size={24} />,
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errors.email && touched.email ? "red" : "gray",
                  },
                  "&:hover fieldset": {
                    borderColor: errors.email && touched.email ? "red" : "gray",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errors.email && touched.email ? "red" : "blue",
                  },
                },
              }}
            />
          </div>

          <div className={css.group}>
            <label htmlFor={dateOfBirthId} className={css.label}>
              Date of birth
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                minDate={dayjs("1920-01-01")}
                maxDate={dayjs()}
                value={values.birthDate}
                onChange={(newValue) => {
                  setFieldValue("birthDate", newValue);
                }}
                textField={(params) => (
                  <TextField
                    {...params}
                    className={`${
                      errors.birthDate && touched.birthDate
                        ? css.errorInput
                        : ""
                    }`}
                    id={dateOfBirthId}
                    name="birthDate"
                    error={Boolean(errors.birthDate && touched.birthDate)}
                  />
                )}
              />
            </LocalizationProvider>
          </div>

          <div className={css.group}>
            <label
              htmlFor="radio"
              id="my-radio-group"
              className={css.radioGroupLabel}
            >
              Where did you hear about this event?
            </label>
            <div
              role="group"
              aria-labelledby="my-radio-group"
              className={css.radioGroup}
            >
              {knowUsFromList.map((value) => (
                <label key={value} className={css.radioLabel}>
                  <Field
                    type="radio"
                    name="backgroundInfo"
                    value={value}
                    className={css.radioBtn}
                  />
                  {value}
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className={css.submitBtn}>
            Sign up
          </button>
        </Form>
      )}
    </Formik>
  );
}
