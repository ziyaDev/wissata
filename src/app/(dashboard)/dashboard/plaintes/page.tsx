import { PageHeader } from "@/components/pageHeader";
import { Plaintes } from "@/components/table/plaintes/plaintes";
import PlaintesTableToolbar from "@/components/table/plaintes/plaintes-table-toolbar";
import PlaintesTable from "@/components/table/plaintes/table-components";
import { NextPage } from "next";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <>
      <PageHeader title="الشكاوي" desc="" />
      <Plaintes>
        <div className="grid gap-y-4">
          <PlaintesTableToolbar />
          <PlaintesTable />
        </div>
      </Plaintes>
    </>
  );
};

export default Page;
