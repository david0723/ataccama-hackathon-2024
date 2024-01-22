import { usePromise } from "../hooks/usePromise";

type StatusProps = {
  threadId: string;
  runId: string;
};
export default function Status(props: StatusProps) {
  const { data, isLoading } = usePromise<Response>(() =>
    fetch(`/api/run?threadId=${props.threadId}&runId=${props.runId}`)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data) {
    console.log({ data });
    return <div>{JSON.stringify(data)}</div>;
  }

  return null;
}
