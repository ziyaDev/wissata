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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
import {
  SifatData,
  WissataTypeSchemadata,
  dairaData,
  receptionType,
} from "@/types";
import { useRouter } from "next/navigation";
import { Checkbox } from "../ui/checkbox";

export const ReceptionForm = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedWizara, setSelectedWizara] = useState<string | null>(null);
  const [selectedInstitutions, setSelectedInstitutions] = useState<
    string | null
  >(null);
  const [selectedTypePlaint, setSelectedTypePlaint] = useState<string | null>(
    null
  );
  const [selectedGrades, setSelectedGrades] = useState<string | null>(null);
  const router = useRouter();
  const [selectedDaira, setSelectedDaira] = useState<string | null>(null);
  const filteredGrades = SifatData.filter(
    (item) => item.name === selectedGrades
  ).flatMap((item) => item.association);
  const filteredInstitutions = WissataTypeSchemadata.filter(
    (item) => item.wizara === selectedWizara
  ).flatMap((item) => item.institution);
  const filteredTypePlaint = filteredInstitutions
    .filter((item) => item.name === selectedInstitutions)
    .flatMap((item) => item.mawdo3);
  const filteredPlaints = filteredTypePlaint
    .filter((item) => item.naw3arida === selectedTypePlaint)
    .flatMap((item) => item.mawdo3s);
  const filteredBaladiya = dairaData
    .filter((item) => item.name === selectedDaira)
    .flatMap((item) => item.baladiya);

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    try {
      await axios.post("/api/reception", values).then((response) => {
        router.push("/dashboard/reception");
      });
    } catch (error) {
      return toast({
        title: "حدث خطأ ",
        description: "الرجاء اعد المحاولة",
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
            <div className="  grid lg:grid-cols-3 gap-y-4 gap-x-3">
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
              <Field<Date>
                name="date"
                onBlurValidate={receptionType.shape.date}>
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
              </Field>
              <Field<string>
                name="docNumber"
                onBlurValidate={receptionType.shape.docNumber}>
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className=" space-y-2">
                      <Label>رقم وثيقة قانونية:</Label>
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
                      <Label>نوع الممثل:</Label>
                      <Select
                        defaultValue={value}
                        onValueChange={(value) => {
                          setValue(value);
                          setSelectedGrades(value);
                        }}>
                        <SelectTrigger disabled={isSubmitting}>
                          <SelectValue placeholder="اختيار" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {SifatData.map((sifa, i) => {
                              return (
                                <SelectItem key={i} value={sifa.name}>
                                  {sifa.name}
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
                name="gradesType"
                onBlurValidate={receptionType.shape.gradesType}>
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className=" space-y-2">
                      <Label>صفة الممثل:</Label>
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
                            {filteredGrades.map((association, i) => {
                              return (
                                <SelectItem key={i} value={association}>
                                  {association}
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
                name="city"
                onBlurValidate={receptionType.shape.city}>
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className=" space-y-2">
                      <Label>الدائرة:</Label>
                      <Select
                        defaultValue={value}
                        onValueChange={(value) => {
                          setValue(value);
                          setSelectedDaira(value);
                        }}>
                        <SelectTrigger disabled={isSubmitting}>
                          <SelectValue placeholder="اختيار" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {dairaData.map((daira, i) => {
                              return (
                                <SelectItem key={i} value={daira.name}>
                                  {daira.name}
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
                name="town"
                onBlurValidate={receptionType.shape.town}>
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className=" space-y-2">
                      <Label>البلدية:</Label>
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
                            {filteredBaladiya.map((ba, i) => {
                              return (
                                <SelectItem key={i} value={ba}>
                                  {ba}
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
              <Field
                name="ministry"
                onBlurValidate={receptionType.shape.ministry}>
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
              <Field
                name="unstutation"
                onBlurValidate={receptionType.shape.unstutation}>
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
                            {filteredInstitutions.map((institution, i) => {
                              return (
                                <SelectItem key={i} value={institution.name}>
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
                name="typePlaint"
                onBlurValidate={receptionType.shape.typePlaint}>
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
                            {filteredTypePlaint.map((type, i) => {
                              return (
                                <SelectItem key={i} value={type.naw3arida}>
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
              <Field
                name="subjectPlaint"
                onBlurValidate={receptionType.shape.subjectPlaint}>
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
                            {filteredPlaints.map((plaint, i) => {
                              return (
                                <SelectItem key={i} value={plaint}>
                                  {plaint}
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
              </Field>{" "}
              <Field<string>
                name="note"
                onBlurValidate={receptionType.shape.note}>
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className=" grid   gap-y-2">
                      <Label>ملاحظة:</Label>
                      <Input
                        type="text"
                        onChange={(e) => setValue(e.target.value)}
                      />
                    </div>
                  );
                }}
              </Field>
              <Field<boolean>
                name="petitionHasFiled"
                initialValue={false}
                onBlurValidate={receptionType.shape.petitionHasFiled}>
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className="  py-2">
                      <div className="items-top flex gap-x-2">
                        <Checkbox
                          checked={value}
                          onCheckedChange={() => setValue(!value)}
                          id="terms1"
                        />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor="terms1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            قام بايداع العريضة
                          </label>
                          <p className="text-sm text-muted-foreground">شؤس</p>
                        </div>
                      </div>
                      {errors.map((error) => (
                        <p key={error}>{error}</p>
                      ))}
                    </div>
                  );
                }}
              </Field>
            </div>

            {isSubmitting ? (
              <>
                <Button disabled={!isValid} type="button">
                  <Loader className=" animate-spin h-6 w-6" />
                </Button>
              </>
            ) : (
              <Button disabled={!isValid} type="submit">
                حفظ
              </Button>
            )}
          </form>
        )}
      </Form>
    </div>
  );
};
