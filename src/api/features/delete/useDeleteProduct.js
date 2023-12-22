import { useMutation } from "react-query";
import { instance } from "../../constants";

export const useDeleteProduct = (id) => {
  const mutation = useMutation(() => instance.delete(`${PRODUCTS_URL}/${id}`));

  const deleteData = () => {
    mutation.mutate();
  };

  if (mutation.isLoading) {
    return <span>Deleting...</span>;
  }

  if (mutation.isError) {
    return <span>Error: {mutation.error.message}</span>;
  }

  if (mutation.isSuccess) {
    return <span>Post deleted!</span>;
  }

  return (
    <div>
      <button onClick={deleteData}>Delete Post</button>
    </div>
  );
};
