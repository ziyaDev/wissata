import { ReceptionForm } from "@/components/forms/reception";
import { PageHeader } from "@/components/pageHeader";
import { NextPage } from "next";

const Page: NextPage = ({}) => {
  return (
    <>
      <PageHeader title="Réception" desc="qsd" />
      <ReceptionForm />
    </>
  );
};

export default Page;
