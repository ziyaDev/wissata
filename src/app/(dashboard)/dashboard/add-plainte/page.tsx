import { AddPlaintForm } from "@/components/forms/ajouter-plaint";
import { PageHeader } from "@/components/pageHeader";
import { NextPage } from "next";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <>
      <PageHeader title="Ajouter plainte" desc="qsd" />
      <AddPlaintForm />
    </>
  );
};

export default Page;
