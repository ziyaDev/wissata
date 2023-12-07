import { PageHeader } from "@/components/pageHeader";
import ReceptionTable from "@/components/table/task/table-component";
import { NextPage } from "next";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <>
      <PageHeader title="مهامي" desc="" />
      <ReceptionTable />
    </>
  );
};

export default Page;
