import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

const Users = ({ token }) => {
  const [users, setUsers] = useState([]);

  async function getUser() {
    try {
      const response = await axios.get(`${backendUrl}/api/users/userlist`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (response.data.success) {
        setUsers(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch users");
    }
  }

  useEffect(() => {
    getUser();
  }, []); // Runs only once when the component mounts

  async function deleteUser(userId) {
    try {
      const response = await axios.post(`${backendUrl}/api/users/delete-user/${userId}`,{}, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (response.data.success) {
        getUser()
        toast.success("User deleted successfully");
      } else {

        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete user");
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Users List</h2>
      {users.length > 0 ? (
        <ul className="divide-y divide-gray-300">
          {users.map((user) => (
            <li key={user._id} className="py-3 px-4 flex justify-between items-center">
              <div>
                <span className="text-gray-700 font-medium">{user.name}</span>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <button
                onClick={() => deleteUser(user._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No users found.</p>
      )}
    </div>
  );
};

export default Users;
