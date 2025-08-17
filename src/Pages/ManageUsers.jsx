import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AxiosSecure from "../Routes/AxiosSecure";
// import AxiosSecure from "../Routes/AxiosSecure";

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

  const markFraud = useMutation({
    mutationFn: async (id) => axiosSecure.patch(`/users/mark-fraud/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      Swal.fire("Fraud Marked!", "Agent has been marked as fraud", "warning");
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
        if (actionType === "mark fraud") markFraud.mutate(id);
      }
    });
  };

  if (isLoading)
    return <span className="loading loading-spinner text-accent"></span>;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-semibold text-center my-6">Manage Users</h2>
      <table className="table w-full">
        <thead>
          <tr className="text-base text-gray-700">
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
                <td className="capitalize">
                  {user.role === "fraud" ? (
                    <span className="badge badge-error">Fraud</span>
                  ) : (
                    user.role || "user"
                  )}
                </td>
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
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => handleAction(user._id, "mark fraud")}
                      >
                        Mark as Fraud
                      </button>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => handleAction(user._id, "delete")}
                      >
                        Delete
                      </button>
                    </>
                  )}

                  {user.role === "fraud" && (
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleAction(user._id, "delete")}
                    >
                      Delete
                    </button>
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
