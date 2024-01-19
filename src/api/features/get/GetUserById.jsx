import { useQuery } from "@tanstack/react-query";
import { instance } from "../../constants";
import { USERS_URL } from "../../../config";

export const GetUserById = ({ userId }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["userData", userId],
    queryFn: () =>
      instance.get(`${USERS_URL}/${userId}`).then((res) => res.data),
  });

  if (isPending) return "Loading...";

  if (error) return `An error has occurred: ${error.message}`;

  return (
    <>
      {data.data.user.firstname} {data.data.user.lastname}
    </>
  );
};
