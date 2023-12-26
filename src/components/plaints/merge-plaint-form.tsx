"use client";
import {
  Field,
  FieldArray,
  FieldArrayItem,
  Form,
  useFormContext,
} from "houseform";
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
import {
  SifatData,
  WissataTypeSchemadata,
  dairaData,
  directionData,
  plainteType,
  sectoreData,
} from "@/types";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import { Data } from "../table/reception/columns";
import { useRouter } from "next/navigation";

export const MergePlainteForm = ({ data }: { data: Data | null }) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedWizara, setSelectedWizara] = useState<string | null>(
    data?.ministry ? data?.ministry : null
  );
  const [selectedInstitutions, setSelectedInstitutions] = useState<
    string | null
  >(data?.unstutation ? data.unstutation : null);
  const [selectedTypePlaint, setSelectedTypePlaint] = useState<string | null>(
    data?.typePlaint ? data.typePlaint : null
  );
  const [selectedDaira, setSelectedDaira] = useState<string | null>(
    data?.city ? data.city : null
  );
  const [selectedGrades, setSelectedGrades] = useState<string | null>(
    data?.grades ? data.grades : null
  );
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

  const router = useRouter();
  const handleSubmit = async (values: Zod.infer<typeof plainteType>) => {
    setIsSubmitting(true);
    try {
      await axios
        .post("/api/plainte", values, {
          headers: {
            RESID: data?.id,
          },
        })
        .then((response) => {
          router.push("/dashboard/plaintes");
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
      <Form<Zod.infer<typeof plainteType>>
        onSubmit={(values) => {
          handleSubmit(values);
        }}>
        {({ isValid, submit, errors }) => (
          <form
            className=" grid gap-6 w-full  max-w-6xl"
            onSubmit={(e) => {
              e.preventDefault();
              submit();
              console.log(JSON.stringify(errors));
            }}>
            <div className="  grid lg:grid-cols-3 gap-y-4 gap-x-3">
              <Field
                name="fullName"
                initialValue={data?.fullName}
                onBlurValidate={plainteType.shape.fullName}>
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
                name="city"
                initialValue={data?.city}
                onBlurValidate={plainteType.shape.city}>
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
                initialValue={data?.town}
                onBlurValidate={plainteType.shape.town}>
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
                initialValue={data?.ministry}
                onBlurValidate={plainteType.shape.ministry}>
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
                initialValue={data?.unstutation}
                onBlurValidate={plainteType.shape.unstutation}>
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
                initialValue={data?.typePlaint}
                onBlurValidate={plainteType.shape.typePlaint}>
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
                initialValue={data?.subjectPlaint}
                onBlurValidate={plainteType.shape.subjectPlaint}>
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className="  space-y-2">
                      <Label>موضوع العريضة:</Label>

                      <Select
                        defaultValue={value}
                        onValueChange={(value) => setValue(value)}>
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
              </Field>
              <Field<string>
                name="grades"
                initialValue={data?.grades}
                onBlurValidate={plainteType.shape.grades}>
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
                initialValue={data?.gradesType}
                onBlurValidate={plainteType.shape.gradesType}>
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
                initialValue="PRESENT"
                name="sourcePlaint"
                onBlurValidate={plainteType.shape.sourcePlaint}>
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className=" hidden space-y-2">
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
                name="correspondenceNumber"
                onBlurValidate={plainteType.shape.correspondenceNumber}>
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
                name="correspondenceDate"
                onBlurValidate={plainteType.shape.correspondenceDate}>
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
                name="filesRelated"
                onBlurValidate={plainteType.shape.filesRelated}>
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className=" grid gap-y-2">
                      <Label>الملفات الخاصة بالشكوى:</Label>
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

            <Card>
              <Separator className=" mb-4 " />
              <CardContent>
                <FieldArray
                  name="recipients"
                  initialValue={[{ sector: "", reciption: "", town: "" }]}>
                  {({ value, add, remove }) => (
                    <div className=" grid gap-4">
                      {value.map((data, index) => {
                        return (
                          <PlaintSentTo
                            key={index}
                            remove={remove}
                            index={index}
                          />
                        );
                      })}
                      <Button
                        variant={"outline"}
                        type="button"
                        onClick={() =>
                          add({
                            sector: "",
                            reciption: "",
                            town: "",
                          })
                        }>
                        + اضافة مستلم
                      </Button>
                    </div>
                  )}
                </FieldArray>
              </CardContent>
            </Card>

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

const PlaintSentTo = ({
  index,
  remove,
}: {
  index: number;
  remove: (index: number) => void;
}) => {
  const [selectedSecture, setSelectedSecture] = useState<string | null>(null);
  const [selectedDaira, setSelectedDaira] = useState<string | null>(null);

  const filteredBaladiya = dairaData
    .filter((item) => item.name === selectedDaira)
    .flatMap((item) => item.baladiya);
  return (
    <>
      <div className=" space-y-4">
        <div className=" flex  items-center justify-between">
          <Label>المستلم رقم {index + 1} :</Label>
          <Button
            disabled={index === 0}
            onClick={() => remove(index)}
            variant={"outline"}>
            حذف
          </Button>
        </div>
        <Separator />
        <div className="grid grid-cols-3 gap-x-4">
          <FieldArrayItem<string>
            name={`recipients[${index}].sector`}
            key={`recipients[${index}].sector`}
            onBlurValidate={plainteType.shape.recipients.element.shape.sector}>
            {({ value, setValue, onBlur, errors }) => {
              return (
                <div className=" space-y-2">
                  <Label>القطاع :</Label>
                  <Select
                    defaultValue={value}
                    onValueChange={(value) => {
                      setValue(value);
                      setSelectedSecture(value);
                    }}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختيار" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {sectoreData.map((sec, index) => {
                          return (
                            <SelectItem key={index} value={sec}>
                              {sec}
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
          </FieldArrayItem>
          <FieldArrayItem<string>
            name={`recipients[${index}].reciption`}
            key={`recipients[${index}].reciption`}
            onBlurValidate={
              plainteType.shape.recipients.element.shape.reciption
            }>
            {({ value, setValue, onBlur, errors }) => {
              return (
                <div className=" space-y-2">
                  <Label>نحو:</Label>
                  <Select
                    defaultValue={value}
                    onValueChange={(value) => {
                      setValue(value);
                      if (selectedSecture === "دائرة") setSelectedDaira(value);
                    }}>
                    <SelectTrigger  
                      disabled={
                        selectedSecture === "دائرة"
                          ? false
                          : selectedSecture === "مديرية"
                          ? false
                          : true
                      }>
                      <SelectValue placeholder="اختيار" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {selectedSecture === "دائرة" &&
                          dairaData.map((daira, i) => {
                            return (
                              <SelectItem key={i} value={daira.name}>
                                {daira.name}
                              </SelectItem>
                            );
                          })}
                        {selectedSecture === "مديرية" &&
                          directionData.map((dir, i) => {
                            return (
                              <SelectItem key={i} value={dir}>
                                {dir}
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
          </FieldArrayItem>

          {selectedSecture === "دائرة" && (
            <FieldArrayItem<string>
              preserveValue
              name={`recipients[${index}].town`}
              key={`recipients[${index}].town`}
              onBlurValidate={plainteType.shape.recipients.element.shape.town}>
              {({ value, setValue, onBlur, errors }) => {
                return (
                  <div className=" space-y-2">
                    <Label>البلدية:</Label>
                    <Select
                      defaultValue={value}
                      onValueChange={(value) => {
                        setValue(value);
                      }}>
                      <SelectTrigger
                        disabled={selectedSecture === "دائرة" ? false : true}>
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
            </FieldArrayItem>
          )}
          <>
            {selectedSecture === "خارج اختصاص" && (
              <FieldArrayItem<boolean>
                name={`recipients[${index}].town`}
                onBlurValidate={
                  plainteType.shape.recipients.element.shape.save
                }>
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className=" space-y-2">
                      <Label>للحفظ او الانتظار:</Label>
                      <Select
                        defaultValue={"للحفظ"}
                        onValueChange={(value) => {
                          setValue(value === "للحفظ" ? true : false);
                        }}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختيار" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value={"للحفظ"}>للحفظ</SelectItem>
                            <SelectItem value={"للانتظار"}>للانتظار</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {errors.map((error) => (
                        <p key={error}>{error}</p>
                      ))}
                    </div>
                  );
                }}
              </FieldArrayItem>
            )}
          </>
        </div>
      </div>
    </>
  );
};
