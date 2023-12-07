import { ZodError, ZodType, z } from "zod";

const validateField = <T>(
  zodType: ZodType<T>,
  fieldName: keyof T,
  value: any
): Promise<boolean> => {
  try {
    const parsedValue = zodType.parse({ [fieldName]: value });
    return Promise.resolve(parsedValue[fieldName] === value);
  } catch (error) {
    if (error instanceof ZodError) {
      return Promise.reject(false);
    }
    console.log(error);
    throw error; // Re-throw other errors
  }
};
const WissataTypeSchema = z.object({
  wizara: z.string(),
  institution: z.array(
    z.object({
      name: z.string(),
      mawdo3: z.array(
        z.object({
          naw3arida: z.string(),
          mawdo3s: z.array(z.string()),
        })
      ),
    })
  ),
});
interface WissataType extends Zod.infer<typeof WissataTypeSchema> {}

const WissataTypeSchemadata: WissataType[] = [
  {
    wizara: "الوزارة الأولى",
    institution: [
      {
        name: "المديرية العامة للوظيفة العمومية ",
        mawdo3: [
          {
            naw3arida: "شخص طبيعي",
            mawdo3s: [
              "المعادلة الإدارية للشهادات",
              "المسابقات والامتحانات الخاصة بالتوظيف",
              "أخرى",
            ],
          },
          {
            naw3arida: "خدمة عمومية",
            mawdo3s: [],
          },
        ],
      },
      {
        name: "مجموع الوكالة الوطنية لترقية الإستثمار ( AAPI )",
        mawdo3: [
          {
            naw3arida: "شخص طبيعي",
            mawdo3s: [
              "منح الإمتيازات الجبائية و الشبه جبائية",
              "تمديد فترة الإمتياز",
              "أخرى",
            ],
          },
          {
            naw3arida: "خدمة عمومية ",
            mawdo3s: [],
          },
        ],
      },
      {
        name: "اخرى",
        mawdo3: [
          {
            naw3arida: "شخص طبيعي",
            mawdo3s: [],
          },
          {
            naw3arida: "خدمة عمومية ",
            mawdo3s: [],
          },
        ],
      },
    ],
  },
  {
    wizara: "وزارة الشؤون الخارجية والجالية الوطنية بالخارج",
    institution: [
      {
        name: "مجموع المصالح المركزية",
        mawdo3: [
          {
            naw3arida: "شخص طبيعي",
            mawdo3s: ["استخراج وثائق الحالة المدنية و البيومترية", "أخرى"],
          },
          {
            naw3arida: "خدمة عمومية",
            mawdo3s: [],
          },
        ],
      },
      {
        name: "أخرى",
        mawdo3: [
          {
            naw3arida: "شخص طبيعي",
            mawdo3s: [],
          },
          {
            naw3arida: "خدمة عمومية",
            mawdo3s: [],
          },
        ],
      },
    ],
  },
  {
    wizara: "وزارة الداخلية والجماعات المحلية والتهيئة العمرانية",
    institution: [
      {
        name: "  الولاية",
        mawdo3: [
          {
            naw3arida: "شخص طبيعي",
            mawdo3s: [
              "رخص مزاولة النشاطات التجارية والمهن المقننة",
              "رخصة اقتناء التجهيزات الحساسة لأغراض الحيازة والاستعمال",
              "رخصة اقتناء الأسلحة والذخيرة",
              "اعتماد جمعية (جهوية او ولائية)",
              "تعويض عن نزع الملكية",
              "التعويض عن ضحايا الإرهاب",
              "الطعون الخاصة بالاستفادة من السكن",
              "تسوية الوضعيات مالية",
              "تنفيذ الأحكام القضائية ",
              "أخرى",
            ],
          },
          {
            naw3arida: "خدمة عمومية",
            mawdo3s: [],
          },
        ],
      },
      {
        name: "الدائرة",
        mawdo3: [
          {
            naw3arida: "شخص طبيعي",
            mawdo3s: [
              " السكن العمومي الإيجاري",
              " السكن الترقوي المدعم",
              " محلات ذات الاستعمال المهني",
              "تسوية البنايات في اطار القانون 08/15",
              "تسوية الوضعيات مالية",
              "تنفيذ الأحكام القضائية ",
              " أخرى",
            ],
          },
          {
            naw3arida: "خدمة عمومية",
            mawdo3s: [],
          },
        ],
      },
      {
        name: "البلدية",
        mawdo3: [
          {
            naw3arida: "شخص طبيعي",
            mawdo3s: [
              "تنظيم و تسيير الأسواق الأسبوعية ",
              "استخراج البطاقة الرمادية ",
              "استخراج وثائق الحالة المدنية و البيومترية",
              "رخصة التجزئة",
              "رخصة البناء",
              "رخصة بناء لمشروع استثماري",
              "رخصة الهدم",
              "شهادة التعمير",
              "شهادة المطابقة",
              "شهادة الحيازة",
              "رخصة الاشغال على الطريق",
              "تسوية البنايات في إطار القانون 15/08",
              "إعانة البناء الريفي",
              "محلات ذات الاستعمال المهني",
              "اعتماد الجمعيات (الناشطة على مستوى البلدية)",
              "المنحة الجزافية للتضامن",
              "منحة التمدرس",
              "اعانة شهر رمضان",
              "رخص الاستغلال للأنشطة التجارية",
              "رخصة استغلال الشواطىء و مناطق الإستجمام",
              "تسوية الوضعيات مالية",
              "تنفيذ الأحكام القضائية ",
              "أخرى",
            ],
          },
          {
            naw3arida: "خدمة عمومية",
            mawdo3s: [
              "الإنارة العمومية",
              "التهيئة الحضرية",
              "انجاز ملحقات ادارية",
              "انجاز فضاءات ترفيهية",
              "الإطعام المدرسي",
              "النقل المدرسي",
              "التدفئة المدرسية",
              "فتح ممرات و مسالك",
              "جمع النفايات",
            ],
          },
        ],
      },
      {
        name: "  الوكالة الولائية للتنظيم والتسيير الحضريين",
        mawdo3: [
          {
            naw3arida: "شخص طبيعي",
            mawdo3s: [
              "تسوية وضعية التجزئات العقارية والسكنية",
              "تسوية وضعية المستفيدين من سكنات في اطار الترقوي المدعم او الترقوي ، التساهمي",
              "تسوية الوضعيات مالية",
              "تنفيذ الأحكام القضائية ",
              "أخرى",
            ],
          },
          {
            naw3arida: "خدمة عمومية",
            mawdo3s: [],
          },
        ],
      },
      {
        name: "  أخرى",
        mawdo3: [
          {
            naw3arida: "شخص طبيعي",
            mawdo3s: [],
          },
          {
            naw3arida: "خدمة عمومية",
            mawdo3s: [],
          },
        ],
      },
    ],
  },
];
const receptionType = z.object({
  fullName: z.string().min(2),
  date: z.coerce.date(),
  docNumber: z.string().optional(),
  grades: z.string().trim().min(1), //! important
  town: z.string().trim().min(1), //! important
  city: z.string().trim().min(1), //! important
  note: z.string().optional(),
  petitionHasFiled: z.boolean(), //! important
  sector: z.string().optional(), //! important
  unstutation: z.string().optional(), //! important
  subject: z.string().optional(), //! important
});
const tasksTypeSchema = z.object({
  createdBy: z.string(),
  users: z.array(z.string()).min(1),
  title: z.string(),
  description: z.string().nullable().optional(),
  finishedAt: z.date().nullable().optional(),
  status: z.enum(["pending", "complete", "processing"]),
});
export interface TasksType extends Zod.infer<typeof tasksTypeSchema> {}

export { receptionType, validateField, WissataTypeSchemadata };
