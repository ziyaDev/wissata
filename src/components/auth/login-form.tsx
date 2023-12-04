"use client";
import { Field, Form } from "houseform";
import { z } from "zod";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const LoginForm = () => {
  return (
    <Form
      onSubmit={(values) => {
        alert("Form was submitted with: " + JSON.stringify(values));
      }}>
      {({ isValid, submit }) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}>
          <div className=" grid gap-3">
            <Field name="username" onBlurValidate={z.string()}>
              {({ value, setValue, onBlur, errors }) => {
                return (
                  <div className=" space-y-3">
                    <Label>Nom d'utilisateur:</Label>
                    <Input
                      value={value}
                      onBlur={onBlur}
                      onChange={(e) => setValue(e.target.value)}
                    />
                    {errors.map((error) => (
                      <p key={error}>{error}</p>
                    ))}
                  </div>
                );
              }}
            </Field>
            <Field<string>
              name="password"
              onChangeValidate={z
                .string()
                .min(8, "Must be at least 8 characters long")}>
              {({ value, setValue, onBlur, errors }) => {
                return (
                  <div className=" space-y-3">
                    <Label>Mot de passe:</Label>
                    <Input
                      value={value}
                      onBlur={onBlur}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder={"Password"}
                      type="password"
                    />
                    {errors.map((error) => (
                      <p key={error}>{error}</p>
                    ))}
                  </div>
                );
              }}
            </Field>
            <Button disabled={!isValid} type="submit">
              Submit
            </Button>
          </div>
        </form>
      )}
    </Form>
  );
};

export default LoginForm;
