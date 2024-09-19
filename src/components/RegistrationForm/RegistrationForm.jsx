import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useId } from "react";

import { BsPersonFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { BiSolidCalendar } from "react-icons/bi";

import css from "./RegistrationField.module.css";

export default function RegistrationForm({ handleRegister }) {
  const fullNameId = useId();
  const emailId = useId();
  const dateOfBirthId = useId();

  const initialValues = {
    fullName: "",
    email: "",
    birthDate: "",
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
    console.log("handleSubmit ~ values:", values);
    handleRegister(values);
    action.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={registerSchema}
    >
      {({ errors, touched }) => (
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
            <Field
              type="date"
              className={`${css.input} ${
                errors.dateOfBirth && touched.dateOfBirth ? css.errorInput : ""
              }`}
              id={dateOfBirthId}
              name="birthDate"
              placeholder="2000-12-12"
            />

            <BiSolidCalendar size={24} className={css.icon} />
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
