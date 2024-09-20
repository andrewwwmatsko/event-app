import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useId, useState } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField, InputAdornment } from "@mui/material";
import dayjs from "dayjs";

import { BsPersonFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { BiSolidCalendar } from "react-icons/bi";

import css from "./RegistrationField.module.css";

export default function RegistrationForm({ handleRegister }) {
  const [birthDateValue, setBirthDateValue] = useState(dayjs());

  const fullNameId = useId();
  const emailId = useId();
  const dateOfBirthId = useId();

  const initialValues = {
    fullName: "",
    email: "",
    birthDate: birthDateValue,
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
      backgroundInfo: Yup.string().oneOf([
        "Social media",
        "Friends",
        "Found myself",
      ]),
    },
    { strict: true }
  );

  const handleSubmit = (values, action) => {
    handleRegister(values);
    action.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={registerSchema}
    >
      {({ errors, touched, setFieldValue, values }) => (
        <Form noValidate>
          <div className={css.group}>
            <label htmlFor={fullNameId} className={css.label}>
              Full Name
            </label>
            <Field
              className={`${css.input} ${
                errors.fullName && touched.fullName ? css.errorInput : ""
              }`}
              id={fullNameId}
              name="fullName"
              placeholder="John Doe"
            />

            <BsPersonFill size={24} className={css.icon} />
          </div>

          <div className={css.group}>
            <label htmlFor={emailId} className={css.label}>
              Email
            </label>
            <Field
              className={`${css.input} ${
                errors.email && touched.email ? css.errorInput : ""
              }`}
              id={emailId}
              name="email"
              placeholder="iwanttoElifTechSchool@email.com"
            />

            <MdEmail size={24} className={css.icon} />
          </div>

          <div className={css.group}>
            <label htmlFor={dateOfBirthId} className={css.label}>
              Date of birth
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={values.birthDate}
                onChange={(newValue) => {
                  setBirthDateValue(newValue);
                  setFieldValue("birthDate", newValue);
                }}
                textField={(params) => (
                  <TextField
                    {...params}
                    className={`${css.input} ${
                      errors.birthDate && touched.birthDate
                        ? css.errorInput
                        : ""
                    }`}
                    id={dateOfBirthId}
                    name="birthDate"
                    error={Boolean(errors.birthDate && touched.birthDate)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BiSolidCalendar size={24} className={css.icon} />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </div>

          <div className={css.group}>
            <label
              htmlFor="readio"
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
              <label className={css.radioLabel}>
                <Field
                  type="radio"
                  name="backgroundInfo"
                  value="Social media"
                  className={css.radioBtn}
                />
                Social media
              </label>
              <label className={css.radioLabel}>
                <Field
                  type="radio"
                  name="backgroundInfo"
                  value="Friends"
                  className={css.radioBtn}
                />
                Friends
              </label>
              <label className={css.radioLabel}>
                <Field
                  type="radio"
                  name="backgroundInfo"
                  value="Found myself"
                  className={css.radioBtn}
                />
                Found myself
              </label>
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
