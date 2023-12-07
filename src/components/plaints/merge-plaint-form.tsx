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
import { Data } from "../table/reception/columns";

const MergePlaintForm = ({ data }: { data: Data }) => {
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
            <Field
              initialValue={data.fullName}
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
            <Field<string>
              initialValue={data.docNumber}
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
              initialValue={data.grades}
              name="grades"
              onBlurValidate={receptionType.shape.grades}>
              {({ value, setValue, onBlur, errors }) => {
                return (
                  <div className=" space-y-2">
                    <Label>الصفة:</Label>
                    <Select
                      defaultValue={value}
                      onValueChange={(value) => setValue(value)}>
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
              initialValue={data.city}
              // TODO: Add fieldtodo

              name=""
              onBlurValidate={z.string()}>
              {({ value, setValue, onBlur, errors }) => {
                return (
                  <div className=" space-y-2">
                    <Label>:</Label>
                    <Select
                      defaultValue={value}
                      onValueChange={(value) => setValue(value)}>
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
            <Field name="Ministry" onBlurValidate={z.string()}>
              {({ value, setValue, onBlur, errors }) => {
                return (
                  <div className=" space-y-2">
                    <Label>رقم المراسلة:</Label>
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
                    <Label>تاريخ المراسلة:</Label>
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
                          {value ? format(value, "yyyy-MM-dd") : "اختيار تاريخ"}
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
            <Field name="content" onBlurValidate={z.string()}>
              {({ value, setValue, onBlur, errors }) => {
                return (
                  <div className="  space-y-2">
                    <Label>للحفظ او الانتظار:</Label>

                    <Select onValueChange={(value) => setValue(value)}>
                      <SelectTrigger disabled={isSubmitting}>
                        <SelectValue
                          className=" text-right"
                          placeholder="اختيار "
                        />
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
              initialValue={data.town}
              name="town"
              onBlurValidate={receptionType.shape.town}>
              {({ value, setValue, onBlur, errors }) => {
                return (
                  <div className=" space-y-2">
                    <Label>الدائرة:</Label>
                    <Select
                      defaultValue={value}
                      onValueChange={(value) => setValue(value)}>
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
              initialValue={data.city}
              name="city"
              onBlurValidate={receptionType.shape.city}>
              {({ value, setValue, onBlur, errors }) => {
                return (
                  <div className=" space-y-2">
                    <Label>البلدية:</Label>
                    <Select
                      defaultValue={value}
                      onValueChange={(value) => setValue(value)}>
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
              initialValue={data.sector}
              name="sector"
              onBlurValidate={receptionType.shape.sector}>
              {({ value, setValue, onBlur, errors }) => {
                return (
                  <div className=" space-y-2">
                    <Label>القطاع الوزاري:</Label>
                    <Select
                      defaultValue={value}
                      onValueChange={(value) => setValue(value)}>
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
              initialValue={data.unstutation}
              name="unstutation"
              onBlurValidate={receptionType.shape.unstutation}>
              {({ value, setValue, onBlur, errors }) => {
                return (
                  <div className=" space-y-2">
                    <Label>المؤسسة:</Label>
                    <Select
                      defaultValue={value}
                      onValueChange={(value) => setValue(value)}>
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
              initialValue={data.subject}
              name="subject"
              onBlurValidate={receptionType.shape.subject}>
              {({ value, setValue, onBlur, errors }) => {
                return (
                  <div className=" space-y-2">
                    <Label>الموضوع الخاص بالعريضة:</Label>
                    <Select
                      defaultValue={value}
                      onValueChange={(value) => setValue(value)}>
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
  );
};

export default MergePlaintForm;
