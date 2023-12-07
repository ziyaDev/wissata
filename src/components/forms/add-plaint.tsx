"use client";
import { Field, Form } from "houseform";
import { z, isValid } from "zod";
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
import { WissataTypeSchemadata, receptionType, validateField } from "@/types";

export const AddPlaintForm = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedWizara, setSelectedWizara] = useState<string | null>(null);
  const [selectedInstitutions, setSelectedInstitutions] = useState<
    string | null
  >(null);
  const [selectedTypePlaint, setSelectedTypePlaint] = useState<string | null>(
    null
  );

  const filteredInstitutions = WissataTypeSchemadata.filter(
    (item) => item.wizara === selectedWizara
  ).flatMap((item) => item.institution);
  const filteredTypePlaint = filteredInstitutions
    .filter((item) => item.name === selectedInstitutions)
    .flatMap((item) => item.mawdo3);
  const filteredPlaints = filteredTypePlaint
    .filter((item) => item.naw3arida === selectedTypePlaint)
    .flatMap((item) => item.mawdo3s);

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
                name="grades"
                onBlurValidate={receptionType.shape.grades}>
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
                name="docNumber"
                onBlurValidate={receptionType.shape.docNumber}>
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className=" space-y-2">
                      <Label>البلدية:</Label>
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
              <Field name="Ministry" onBlurValidate={z.string()}>
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className=" space-y-2">
                      <Label>الوزارة:</Label>
                      <Select
                        defaultValue={value}
                        onValueChange={(value) => {
                          setValue(value);
                          setSelectedWizara(value);
                        }}>
                        <SelectTrigger disabled={isSubmitting}>
                          <SelectValue placeholder="اختيار" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {WissataTypeSchemadata.map((wizara, i) => {
                              return (
                                <SelectItem key={i} value={wizara.wizara}>
                                  {wizara.wizara}
                                </SelectItem>
                              );
                            })}
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
              <Field name="Entreprise" onBlurValidate={z.string()}>
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className=" space-y-2">
                      <Label>المؤسسة:</Label>
                      <Select
                        defaultValue={value}
                        onValueChange={(value) => {
                          setValue(value);
                          setSelectedInstitutions(value);
                        }}>
                        <SelectTrigger disabled={isSubmitting}>
                          <SelectValue placeholder="اختيار" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {filteredInstitutions.length < 1 && (
                              <SelectLabel>الرجاء اختر وزارة</SelectLabel>
                            )}
                            {filteredInstitutions.map((institution) => {
                              return (
                                <SelectItem value={institution.name}>
                                  {institution.name}
                                </SelectItem>
                              );
                            })}
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
                      <Label>نوع العريضة:</Label>
                      <Select
                        defaultValue={value}
                        onValueChange={(value) => {
                          setValue(value);
                          setSelectedTypePlaint(value);
                        }}>
                        <SelectTrigger disabled={isSubmitting}>
                          <SelectValue placeholder="اختيار" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {filteredTypePlaint.length < 1 && (
                              <SelectLabel>الرجاء اختر مؤسسة</SelectLabel>
                            )}
                            {filteredTypePlaint.map((type) => {
                              return (
                                <SelectItem value={type.naw3arida}>
                                  {type.naw3arida}
                                </SelectItem>
                              );
                            })}
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
              <Field name="content" onBlurValidate={z.string()}>
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className="  space-y-2">
                      <Label>موضوع العريضة:</Label>

                      <Select onValueChange={(value) => setValue(value)}>
                        <SelectTrigger
                          disabled={
                            isSubmitting || filteredPlaints.length == 0
                          }>
                          <SelectValue
                            className=" text-right"
                            placeholder="اختيار "
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {filteredPlaints.length < 1 && (
                              <SelectLabel>الرجاء اختر نوع عريضة</SelectLabel>
                            )}
                            {filteredPlaints.map((plaint) => {
                              return (
                                <SelectItem value={plaint}>{plaint}</SelectItem>
                              );
                            })}
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
                name="town"
                onBlurValidate={receptionType.shape.town}>
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
                      <Label>المصدر:</Label>
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
                name="unstutation"
                onBlurValidate={receptionType.shape.unstutation}>
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className=" space-y-2">
                      <Label>نحو:</Label>
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
                name="subject"
                onBlurValidate={receptionType.shape.subject}>
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className=" grid gap-y-2">
                      <Label>الموضوع الخاص بالعريضة:</Label>
                      <Input
                        type="text"
                        placeholder="موقع ملفات PDF"
                        onChange={(e) => setValue(e.target.value)}
                      />
                    </div>
                  );
                }}
              </Field>
              <Field<string>
                name="subject"
                onBlurValidate={receptionType.shape.subject}>
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className=" grid gap-y-2">
                      <Label>رقم المراسلة:</Label>
                      <Input
                        type="text"
                        onChange={(e) => setValue(e.target.value)}
                      />
                    </div>
                  );
                }}
              </Field>
              <Field<Date>
                name="subject"
                onBlurValidate={receptionType.shape.subject}>
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className=" grid gap-y-2">
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
              </Field>{" "}
              <Field<string>
                name="subject"
                onBlurValidate={receptionType.shape.subject}>
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className=" grid gap-y-2">
                      <Label>الموضوع الخاص بالعريضة:</Label>
                      <Input
                        type="text"
                        placeholder="موقع ملفات PDF"
                        onChange={(e) => setValue(e.target.value)}
                      />
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
