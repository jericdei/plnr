import { useCurrentWeek } from "@/providers/week";
import { getTask, getTasks, getUpcomingTask } from "@/services/task.service";
import { useQuery } from "@tanstack/react-query";

interface QueryParams {
  weekId: string;
  day: Date;
}

export const TASKS_QUERY_KEY = "tasks";
export const TASK_QUERY_KEY = "task";

export function useGetTasksQuery({ weekId, day }: QueryParams) {
  return useQuery({
    enabled: !!weekId && !!day,
    queryKey: [TASKS_QUERY_KEY, weekId, day.getDate()],
    queryFn: () => getTasks(weekId, day),
  });
}

export function useGetTaskQuery(id?: string) {
  if (!id) {
    return { data: undefined };
  }

  return useQuery({
    enabled: !!id,
    queryKey: [TASK_QUERY_KEY, id],
    queryFn: () => getTask(parseInt(id)),
  });
}

export function useGetUpcomingTaskQuery() {
  const { week, day } = useCurrentWeek();

  return useQuery({
    queryKey: [TASK_QUERY_KEY, "upcoming", week.id, day],
    queryFn: () => getUpcomingTask(week.id, day),
  });
}
