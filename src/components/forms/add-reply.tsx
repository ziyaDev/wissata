import { CalendarIcon, Loader } from "lucide-react";
import { Button } from "../ui/button";
import { Field, Form } from "houseform";
import { useState } from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { plainteType, SifatData } from "@/types";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const AddReply = ({ recipientId }: { recipientId: string }) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedTypeReply, setSelectedTypeReply] = useState<string | null>(
    null
  );
  return (
    <div className=" flex justify-center  h-full  ">
      <Form
        onSubmit={(values) => {
          //handleSubmit(values);
        }}>
        {({ isValid, submit, errors }) => (
          <form
            className=" grid gap-6 w-full  max-w-4xl"
            onSubmit={(e) => {
              e.preventDefault();
              submit();
              console.log(JSON.stringify(errors));
            }}>
            <h1 className=" text-2xl font-semibold">البريد الوارد:</h1>
            <Separator />
            <div className="  grid lg:grid-cols-3 gap-y-4 gap-x-3">
              <Field<string>
                name="typeReply"
                onBlurValidate={plainteType.shape.grades}>
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className=" space-y-2">
                      <Label>طبيعة الورقة:</Label>
                      <Select
                        defaultValue={value}
                        onValueChange={(value) => {
                          setValue(value);
                          setSelectedTypeReply(value);
                        }}>
                        <SelectTrigger disabled={isSubmitting}>
                          <SelectValue placeholder="اختيار" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value={"رد"}>رد</SelectItem>
                            <SelectItem value={"مراسلة"}>مراسلة</SelectItem>
                            <SelectItem value={"لاتحتسب"}>لاتحتسب</SelectItem>
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
              {selectedTypeReply === "رد" && (
                <Field<string>
                  preserveValue={false}
                  name="reply"
                  onBlurValidate={plainteType.shape.grades}>
                  {({ value, setValue, onBlur, errors }) => {
                    return (
                      <div className="   space-y-2">
                        <Label>طبيعة الرد:</Label>
                        <Select
                          defaultValue={value}
                          onValueChange={(value) => {
                            setValue(value);
                          }}>
                          <SelectTrigger disabled={isSubmitting}>
                            <SelectValue placeholder="اختيار" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value={"ايجابي"}>ايجابي</SelectItem>
                              <SelectItem value={"سلبي"}>سلبي</SelectItem>
                              <SelectItem value={"مبهم"}>مبهم</SelectItem>
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
              )}
              <div className=" grid  col-span-3 gap-y-4">
                <h1 className=" text-xl font-semibold">رقم البريد الصادر:</h1>
                <Separator />
              </div>
              <Field<string>
                name="typeReply"
                onBlurValidate={plainteType.shape.grades}>
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className=" space-y-2">
                      <Label>رقم الرد:</Label>
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
              <Field<Date> name="date">
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className=" grid gap-y-2">
                      <Label>تاريخ الرد:</Label>
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
                    </div>
                  );
                }}
              </Field>
              <div className=" grid  col-span-3 gap-y-4">
                <h1 className=" text-xl font-semibold">
                  رقم البريد الوارد من الادارة:
                </h1>
                <Separator />
              </div>
              <Field<string>
                name="typeReply"
                onBlurValidate={plainteType.shape.grades}>
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className=" space-y-2">
                      <Label>رقم الرد:</Label>
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
              <Field<Date> name="date">
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className=" grid gap-y-2">
                      <Label>تاريخ الرد:</Label>
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
                    </div>
                  );
                }}
              </Field>
            </div>

            <Button disabled={!isValid} type="submit">
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

export default AddReply;
