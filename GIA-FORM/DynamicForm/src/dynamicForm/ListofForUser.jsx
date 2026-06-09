import React, { useEffect, useState } from "react";
import api from "./api";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoIosArrowBack } from "react-icons/io";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

const ListofForUser = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();

  const [forms, setForms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");

  const accessToken = window.sessionStorage.getItem("accessToken");

  const fetchForms = async () => {
    try {
      const response = await api.get(`/data/getform_groups`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) setForms(response.data);
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
  };

  const insertGroup = async () => {
    if (!newGroupName) {
      alert("Please enter a group name.");
      return;
    }

    try {
      const response = await api.post(
        `/data/insertform_groups`,
        { group_name: newGroupName },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 201 || response.status === 200) {
        alert("Form group created!");
        setShowModal(false);
        setNewGroupName("");
        fetchForms(); // refresh the list
      }
    } catch (error) {
      console.error("Error creating group:", error);
      alert("Failed to create group.");
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="bg-green-900 text-white p-4 rounded-b-[20px] relative">
        <div className="flex items-center justify-between rounded-b-lg">
          <Link to={"/AdminDashboad"}>
            <button className="text-white text-[30px] font-extrabold">
              <IoIosArrowBack />
            </button>
          </Link>
          <h1 className="text-white font-extrabold text-2xl capitalize">GIA</h1>
          <div className="rounded-full bg-white p-2 px-3">
            <FontAwesomeIcon icon={faUser} className="text-blue-600" />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-8 space-y-6 bg-gray-100">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-700">
            List Of Forms Available
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {forms
            .filter((form) => form.id == groupId)
            .map((form) => (
              <div
                key={form.id}
                className="p-4 border rounded-lg shadow hover:bg-red-50 cursor-pointer bg-white"
                onClick={() => navigate(`/FormRenderer/${form.id}`)}
              >
                <h2 className="text-lg font-semibold">{form.group_name}</h2>
                <p className="text-sm text-gray-600">Group ID: {form.id}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Create New Form Group</h2>
            <input
              type="text"
              placeholder="Enter group name"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end space-x-3">
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => {
                  setShowModal(false);
                  setNewGroupName("");
                }}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={insertGroup}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListofForUser;
