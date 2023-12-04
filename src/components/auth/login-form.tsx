"use client";
import { Field, Form } from "houseform";
import { z } from "zod";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { toast } from "../ui/use-toast";
async function updateUser(
  url: string,
  {
    arg,
  }: {
    arg: {
      userName: string;
      password: string;
    };
  }
) {
  await axios.post(url, arg).then((response) => response.data);
}
const LoginForm = () => {
  const [isMutating, setIsMutating] = useState<boolean>();
  const router = useRouter();
  async function handleSubmit(userName: string, password: string) {
    setIsMutating(true);
    try {
      await axios.post("/api/auth", { userName, password }).then((response) => {
        router.push("/dashboard");
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "An error occurred",
      });
      console.log(err);
    }
  }
  return (
    <Form
      onSubmit={(values: { userName: string; password: string }) => {
        handleSubmit(values.userName, values.password);
      }}>
      {({ isValid, submit }) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}>
          <div className=" grid gap-6">
            <div className=" grid gap-3">
              <Field name="userName" onBlurValidate={z.string()}>
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className=" space-y-3">
                      <Label>Nom d{"`"}utilisateur: </Label>
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
            </div>
            <Button disabled={!isValid || isMutating} type="submit">
              {isMutating ? (
                <Loader className=" h-6 w-6 animate-spin" />
              ) : (
                "Connecter"
              )}
            </Button>
          </div>
        </form>
      )}
    </Form>
  );
};

export default LoginForm;
