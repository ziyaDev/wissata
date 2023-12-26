import AddReply from "@/components/forms/add-reply";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

const SelectReception = ({
  recipients,
}: {
  recipients: {
    sector?: string;
    id: string;
    reciption?: string;
    town?: string;
    save?: boolean;
  }[];
}) => {
  const [selectedReciption, setSelectedReciption] = useState<string | null>(
    null
  );
  if (selectedReciption) {
    return <AddReply recipientId={selectedReciption} />;
  }
  return (
    <div className=" space-y-3">
      <h1 className=" font-semibold text-xl">اختر مستلم:</h1>
      <Separator />
      <div className=" grid gap-4 lg:grid-cols-3">
        {recipients.map((rec, i) => {
          return (
            <button
              key={i}
              onClick={() => {
                setSelectedReciption(rec.id);
              }}
              className="grid border rounded h-44  p-4 hover:bg-accent">
              <span className=" text-2xl  font-semibold">
                المستلم رقم {i + 1}:
              </span>
              <Separator />
              <span className="mx-2">
                {rec.sector === "مديرية"
                  ? `رئيس المجلس الشعبي البلدي لبلدية ${rec.town}`
                  : rec.sector === "دائرة"
                  ? ` تحت اشراف رئيس دائرة
                  ${rec.reciption} 
                  لبلدية 
                  ${rec.town} `
                  : `${rec.reciption} `}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SelectReception;
