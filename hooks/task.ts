import { getTasks } from "@/services/task.service";
import { useQuery } from "@tanstack/react-query";

interface QueryParams {
  weekId: string;
  day: Date;
}

export const TASKS_QUERY_KEY = "tasks";

export function useGetTasksQuery({ weekId, day }: QueryParams) {
  return useQuery({
    enabled: !!weekId && !!day,
    queryKey: [TASKS_QUERY_KEY, weekId, day.getDate()],
    queryFn: () => getTasks(weekId, day),
  });
}
