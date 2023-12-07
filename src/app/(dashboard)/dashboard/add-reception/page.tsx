import { ReceptionForm } from "@/components/forms/add-reception";
import { PageHeader } from "@/components/pageHeader";
import { NextPage } from "next";

const Page: NextPage = ({}) => {
  return (
    <>
      <PageHeader title="طلب استقبال" desc="" />
      <ReceptionForm />
    </>
  );
};

export default Page;
