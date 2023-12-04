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

export const ReceptionForm = () => {
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
    <div className=" flex justify-center  h-full ">
      <Form<{ firstName: string; lastName: string; date: Date; type: string }>
        onSubmit={(values) => {
          handleSubmit(values);
        }}>
        {({ isValid, submit }) => (
          <form
            className=" grid gap-6 w-full  max-w-lg"
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}>
            <div className=" space-y-2">
              <Field name="firstName" onBlurValidate={z.string()}>
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className=" space-y-2">
                      <Label>Prénom:</Label>
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
              <Field<string>
                name="lastName"
                onChangeValidate={z
                  .string()
                  .min(8, "Must be at least 8 characters long")}>
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className=" space-y-2">
                      <Label>Nom de famille:</Label>
                      <Input
                        value={value}
                        disabled={isSubmitting}
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
              <Field<Date> name="date" onChangeValidate={z.date()}>
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className=" space-y-2">
                      <Label>Date d'aujourd'huit:</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            disabled={isSubmitting}
                            className={cn(
                              " w-full  bg-muted/20 justify-start text-left font-normal",
                              !value && "text-muted-foreground"
                            )}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {value ? (
                              format(value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={value}
                            onSelect={(e) => e && setValue(e)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
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
                            <SelectItem value="القطاع الوزاري">
                              القطاع الوزاري
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
