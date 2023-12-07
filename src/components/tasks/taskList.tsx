import useSWR from "swr";

const TasksList = () => {
  const { data } = useSWR("/api/tasks");

  if (data) {
    return;
  }
};
