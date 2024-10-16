import { AddPlaintForm } from "@/components/forms/add-plaint";
import { PageHeader } from "@/components/pageHeader";
import { NextPage } from "next";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <>
      <PageHeader title="تقديم شكوى" desc="مضمون الشكوى" />
      <AddPlaintForm />
    </>
  );
};

export default Page;
