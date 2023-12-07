import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TasksType } from "@/types";

const TasksTable = ({ data }: { data: TasksType[] }) => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>المهمة</TableHead>
            <TableHead>صاحب المهمة</TableHead>
            <TableHead>الوصف</TableHead>
            <TableHead>الحالة</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((task) => (
            <TableRow key={task.title}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.createdBy}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>{task.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TasksTable;
