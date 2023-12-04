"use client";
import { Field, Form } from "houseform";
import { z } from "zod";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon, Loader } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { typePlaint } from "../selects";
import { Textarea } from "../ui/textarea";

export const AddPlaintForm = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const handleSubmit = async (values: {
    firstName: string;
    lastName: string;
    date: Date;
    type: string;
  }) => {
    setIsSubmitting(true);
    try {
      await axios.post("/api/reception", values).then((response) => {
        if (response.status === 200) {
          return toast({
            title: "Succès",
            description: "Votre demande est en cour de traitment",
          });
        } else if (response.status === 201) {
          return toast({
            title: "Succès",
            description: "Vous avez été inscrit avec succès",
          });
        }
      });
    } catch (error) {
      setIsSubmitting(false);

      return toast({
        title: "Error",
        description: JSON.stringify(error),
      });
    }
    setIsSubmitting(false);
  };
  return (
    <div className=" flex justify-center  h-full  ">
      <Form<{ firstName: string; lastName: string; date: Date; type: string }>
        onSubmit={(values) => {
          handleSubmit(values);
        }}>
        {({ isValid, submit }) => (
          <form
            className=" grid gap-6 w-full   max-w-4xl "
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}>
            <div className=" grid  grid-cols-2 space-x-4">
              <Field name="firstlast-Name" onBlurValidate={z.string()}>
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className=" space-y-2">
                      <Label>Nom et Prénom:</Label>
                      <Input
                        disabled={isSubmitting}
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
              <Field<string | null> name="type" onChangeValidate={z.string()}>
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className=" space-y-2">
                      <Label>Type de plainte:</Label>
                      <Select onValueChange={(value) => setValue(value)}>
                        <SelectTrigger disabled={isSubmitting}>
                          <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value={typePlaint.normalCen}>
                              {typePlaint.normalCen}
                            </SelectItem>
                            <SelectItem value={typePlaint.publicService}>
                              {typePlaint.publicService}
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {errors.map((error) => (
                        <p key={error}>{error}</p>
                      ))}
                    </div>
                  );
                }}
              </Field>
            </div>
            <div>
              <div className=" space-y-2">
                <div className="grid grid-cols-2 space-x-4">
                  <Field name="Ministry" onBlurValidate={z.string()}>
                    {({ value, setValue, onBlur, errors }) => {
                      return (
                        <div className=" space-y-2">
                          <Label>Ministère:</Label>
                          <Input
                            disabled={isSubmitting}
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
                  <Field name="Entreprise" onBlurValidate={z.string()}>
                    {({ value, setValue, onBlur, errors }) => {
                      return (
                        <div className=" space-y-2">
                          <Label>Entreprise:</Label>
                          <Input
                            disabled={isSubmitting}
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
                </div>
                <Field name="content" onBlurValidate={z.string()}>
                  {({ value, setValue, onBlur, errors }) => {
                    return (
                      <div className=" space-y-2">
                        <Label>Contenu:</Label>
                        <Textarea
                          disabled={isSubmitting}
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
                <div className="grid grid-cols-2 space-x-4">
                  <Field name="Ministry" onBlurValidate={z.string()}>
                    {({ value, setValue, onBlur, errors }) => {
                      return (
                        <div className=" space-y-2">
                          <Label>Daira secteur:</Label>
                          <Input
                            disabled={isSubmitting}
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
                  <Field name="Entreprise" onBlurValidate={z.string()}>
                    {({ value, setValue, onBlur, errors }) => {
                      return (
                        <div className=" space-y-2">
                          <Label>Baldiya secteur:</Label>
                          <Input
                            disabled={isSubmitting}
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
                </div>
              </div>
            </div>

            <Button disabled={!isValid || isSubmitting} type="submit">
              {isSubmitting ? (
                <>
                  <Loader className=" animate-spin h-6 w-6" />
                </>
              ) : (
                "Sauvegarder"
              )}
            </Button>
          </form>
        )}
      </Form>
    </div>
  );
};
