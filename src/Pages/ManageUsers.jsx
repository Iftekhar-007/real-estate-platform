import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AxiosSecure from "../Routes/AxiosSecure";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = AxiosSecure();
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const makeAdmin = useMutation({
    mutationFn: async (id) => axiosSecure.patch(`/users/make-admin/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      Swal.fire("Done!", "User is now Admin", "success");
    },
  });

  const makeAgent = useMutation({
    mutationFn: async (id) => axiosSecure.patch(`/users/make-agent/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      Swal.fire("Done!", "User is now Agent", "success");
    },
  });

  const deleteUser = useMutation({
    mutationFn: async (id) => axiosSecure.delete(`/users/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      Swal.fire("Deleted!", "User has been deleted.", "success");
    },
  });

  const handleAction = (id, actionType) => {
    Swal.fire({
      title: `Are you sure to ${actionType}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, do it!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (actionType === "make admin") makeAdmin.mutate(id);
        if (actionType === "make agent") makeAgent.mutate(id);
        if (actionType === "delete") deleteUser.mutate(id);
      }
    });
  };

  if (isLoading) return <div className="text-center">Loading...</div>;

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="capitalize">{user.role || "user"}</td>
                <td className="space-x-2">
                  {user.role === "user" && (
                    <>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => handleAction(user._id, "make admin")}
                      >
                        Make Admin
                      </button>
                      <button
                        className="btn btn-sm btn-info"
                        onClick={() => handleAction(user._id, "make agent")}
                      >
                        Make Agent
                      </button>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => handleAction(user._id, "delete")}
                      >
                        Delete
                      </button>
                    </>
                  )}

                  {user.role === "admin" && (
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleAction(user._id, "delete")}
                    >
                      Delete
                    </button>
                  )}

                  {user.role === "agent" && (
                    <>
                      <button className="btn btn-sm btn-warning">
                        Mark as Fraud (🛠️)
                      </button>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => handleAction(user._id, "delete")}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
