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
import { receptionType, validateField } from "@/types";
import { typePlaint } from "../selects";

export const ReceptionForm = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    try {
      await axios.post("/api/reception", values).then((response) => {
        if (response.status === 200) {
          return toast({
            title: "تم بنجاح",
            description: "طلبك قيد المعالجة",
          });
        } else if (response.status === 201) {
          return toast({
            title: "تم بنجاح",
            description: "تم تقديم الشكوى",
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
      <Form<any>
        onSubmit={(values) => {
          handleSubmit(values);
        }}>
        {({ isValid, submit }) => (
          <form
            className=" grid gap-6 w-full  max-w-6xl"
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}>
            <div className="  grid grid-cols-3 gap-y-4 gap-x-3">
              <Field<string>
                name="fullName"
                onBlurValidate={receptionType.shape.fullName}>
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className=" space-y-2">
                      <Label>الاسم و اللقب:</Label>
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
              <Field name="date" onBlurValidate={receptionType.shape.date}>
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className=" space-y-2">
                      <Label>تاريخ:</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            disabled={isSubmitting}
                            className={cn(
                              " w-full  bg-muted/20 justify-start text-left  ",
                              !value && "text-muted-foreground"
                            )}>
                            <CalendarIcon className="ml-2 h-4 w-4" />
                            {value
                              ? format(value, "yyyy-MM-dd")
                              : "اختيار تاريخ"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-1">
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
              <Field<string>
                name="docNumber"
                onBlurValidate={receptionType.shape.docNumber}>
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className=" space-y-2">
                      <Label>رقم وثيقة قانونية:</Label>
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
              <Field<string>
                name="grades"
                onBlurValidate={receptionType.shape.grades}>
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className=" space-y-2">
                      <Label>الصفة:</Label>
                      <Select onValueChange={(value) => setValue(value)}>
                        <SelectTrigger disabled={isSubmitting}>
                          <SelectValue placeholder="اختيار" />
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
              <Field<string>
                // TODO: Add fieldtodo

                name=""
                onBlurValidate={z.string()}>
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className=" space-y-2">
                      <Label>:</Label>
                      <Select onValueChange={(value) => setValue(value)}>
                        <SelectTrigger disabled={isSubmitting}>
                          <SelectValue placeholder="اختيار" />
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
              <Field<string>
                name="note"
                onBlurValidate={receptionType.shape.note}>
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className=" space-y-2">
                      <Label>الملاحضة:</Label>
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
              <Field<string>
                name="town"
                onBlurValidate={receptionType.shape.town}>
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className=" space-y-2">
                      <Label>الدائرة:</Label>
                      <Select onValueChange={(value) => setValue(value)}>
                        <SelectTrigger disabled={isSubmitting}>
                          <SelectValue placeholder="اختيار" />
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
              <Field<string>
                name="city"
                onBlurValidate={receptionType.shape.city}>
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className=" space-y-2">
                      <Label>البلدية:</Label>
                      <Select onValueChange={(value) => setValue(value)}>
                        <SelectTrigger disabled={isSubmitting}>
                          <SelectValue placeholder="اختيار" />
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
              <Field<boolean>
                name="petitionHasFiled"
                onBlurValidate={receptionType.shape.petitionHasFiled}>
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className=" space-y-2">
                      <Label> هل اودع عريضة ؟ </Label>
                      <Select
                        onValueChange={(va) =>
                          setValue(va === "true" ? true : false)
                        }>
                        <SelectTrigger disabled={isSubmitting}>
                          <SelectValue placeholder="اختيار" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem
                              onClick={() => setValue(true)}
                              value={"true"}>
                              نعم
                            </SelectItem>
                            <SelectItem
                              onClick={() => setValue(false)}
                              value={"false"}>
                              ﻻ
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
              <Field<string>
                name="sector"
                onBlurValidate={receptionType.shape.sector}>
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className=" space-y-2">
                      <Label>القطاع الوزاري:</Label>
                      <Select onValueChange={(value) => setValue(value)}>
                        <SelectTrigger disabled={isSubmitting}>
                          <SelectValue placeholder="اختيار" />
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
              <Field<string>
                name="unstutation"
                onBlurValidate={receptionType.shape.unstutation}>
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className=" space-y-2">
                      <Label>المؤسسة:</Label>
                      <Select onValueChange={(value) => setValue(value)}>
                        <SelectTrigger disabled={isSubmitting}>
                          <SelectValue placeholder="اختيار" />
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
              <Field<string>
                name="subject"
                onBlurValidate={receptionType.shape.subject}>
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className=" space-y-2">
                      <Label>الموضوع الخاص بالعريضة:</Label>
                      <Select onValueChange={(value) => setValue(value)}>
                        <SelectTrigger disabled={isSubmitting}>
                          <SelectValue placeholder="اختيار" />
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
                "حفظ"
              )}
            </Button>
          </form>
        )}
      </Form>
    </div>
  );
};
