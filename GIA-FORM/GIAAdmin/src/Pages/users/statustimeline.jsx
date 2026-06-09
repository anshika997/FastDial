import React from "react";

const Statustimeline = ({ item }) => {
  const steps = [
    {
      title: "User Submitted",
      description: "The user has submitted the request.",
      time: item.user_enquiry_date_time
        ? new Date(item.user_enquiry_date_time).toLocaleString()
        : "N/A",
      completed: true,
      incompleteText: "The user has not submitted the request.",
    },
    {
      title: "Admin Accepted",
      description: "The admin has reviewed and accepted the request.",
      time: item.admin_accepted_date_time
        ? new Date(item.admin_accepted_date_time).toLocaleString()
        : "N/A",
      completed: item.admin_accepted_date_time,
      incompleteText: "The admin has not yet accepted the request.",
    },
    {
      title: "Vendor Assigned",
      description: "The vendor has been assigned to the request.",
      time: item.assigned_vendor_date_time
        ? new Date(item.assigned_vendor_date_time).toLocaleString()
        : "N/A",
      completed: item.assigned_vendor_date_time,
      incompleteText: "No vendor has been assigned yet.",
    },
    {
      title: "Vendor Accepted",
      description: "The vendor has accepted the request.",
      time: item.vendor_accepted_date_time
        ? new Date(item.vendor_accepted_date_time).toLocaleString()
        : "N/A",
      completed: item.vendor_accepted_date_time,
      incompleteText: "The vendor has not yet accepted the request.",
    },
    {
      title: "Vendor Completed",
      description: "The vendor has completed the request.",
      time: item.vendor_completed_date_time
        ? new Date(item.vendor_completed_date_time).toLocaleString()
        : "N/A",
      completed: item.vendor_completed_date_time,
      incompleteText: "The vendor has not completed the request.",
    },
  ];

  let shouldStop = false;

  return (
    <div className="max-w-lg mx-auto mt-10">
      <div className="relative">
        {steps.map((step, index) => {
          if (shouldStop) {
            return (
              <div key={index} className="flex items-start mb-6">
                <div className="relative">
                  <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                  {index !== steps.length - 1 && (
                    <div className="absolute left-2 top-4 h-[100px] w-1 bg-gray-300"></div>
                  )}
                </div>
                <div className="ml-3">
                  <h4 className="text-lg font-medium text-gray-800">{step.title}</h4>
                  <p className="text-sm text-red-500 mt-1">{step.incompleteText}</p>
                  <p className="text-sm text-gray-400 mt-1">{step.time}</p>
                </div>
              </div>
            );
          }

          if (!step.completed) {
            shouldStop = true;
          }

          return (
            <div key={index} className="flex items-start mb-6">
              <div className="relative">
                <div
                  className={`w-4 h-4 rounded-full ${
                    step.completed ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></div>
                {index !== steps.length - 1 && (
                  <div
                    className={`absolute left-2 top-4 h-[100px] w-1 ${
                      step.completed ? "bg-green-500" : "bg-gray-300"
                    }`}
                  ></div>
                )}
              </div>
              <div className="ml-3">
                <h4 className="text-lg font-medium text-gray-800">{step.title}</h4>
                <p className="text-sm text-gray-600">{step.description}</p>
                <p className="text-sm text-gray-400 mt-1">{step.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Statustimeline;
