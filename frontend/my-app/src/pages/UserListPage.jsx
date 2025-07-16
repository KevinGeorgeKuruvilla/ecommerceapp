import { useEffect, useState } from "react";
import axios from "axios";

export default function UserListPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const isAdmin = userInfo?.isAdmin;

  useEffect(() => {
    if (!isAdmin) return;

    const fetchUsers = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.get(
          "http://localhost:5000/api/admin/users",
          config
        );
        setUsers(data);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [userInfo, isAdmin]);

  if (!isAdmin)
    return <p className="text-center text-red-500">Access Denied</p>;

  if (loading) return <p className="text-center">Loading users...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <table className="w-full bg-white border rounded shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Role</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="text-center">
              <td className="p-3 border">{user.name}</td>
              <td className="p-3 border">{user.email}</td>
              <td className="p-3 border">{user.isAdmin ? "Admin" : "User"}</td>
              <td className="p-3 border space-x-2">
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => alert("Delete functionality coming soon")}
                >
                  Delete
                </button>
                {/* Optional: Add toggle admin button here */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
