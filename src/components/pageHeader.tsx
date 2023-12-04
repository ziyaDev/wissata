import { Separator } from "./ui/separator";

export const PageHeader = ({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) => {
  return (
    <div className="grid gap-2 w-full py-4">
      <div className=" space-y-2">
        <h1 className=" text-center font-semibold text-4xl">{title}</h1>
        <p className="  text-center text-muted-foreground text-base">{desc}</p>
      </div>
    </div>
  );
};
