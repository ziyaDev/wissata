import { ReceptionForm } from "@/components/forms/add-reception";
import { PageHeader } from "@/components/pageHeader";
import ReceptionTableToolbar from "@/components/table/reception/reception-table-toolbar";
import { Receptions } from "@/components/table/reception/receptions";
import ReceptionTable from "@/components/table/reception/table-component";

const Page = () => {
  return (
    <>
      <PageHeader title="الاستقبالات" desc="" />
      <Receptions>
        <div className="grid gap-y-4">
          <ReceptionTableToolbar />
          <ReceptionTable />
        </div>
      </Receptions>
    </>
  );
};

export default Page;
