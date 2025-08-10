import React, { useState } from "react";

const Profile = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1 234 567 890",
    address: "123 Fashion Street, NY, USA",
  });

  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // You would typically send this to a backend
    setEditing(false);
  };

  return (
    <section className="min-h-screen bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-purple-700">My Profile</h2>

        <div className="space-y-6">
          {["name", "email", "phone", "address"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
                {field}
              </label>
              {editing ? (
                <input
                  name={field}
                  value={user[field]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-purple-500"
                />
              ) : (
                <p className="text-gray-800">{user[field]}</p>
              )}
            </div>
          ))}

          {editing ? (
            <div className="flex space-x-4">
              <button
                onClick={handleSave}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(false)}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Optional: Order History Preview */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Orders</h3>
          <p className="text-gray-500">You haven't placed any orders yet.</p>
        </div>
      </div>
    </section>
  );
};

export default Profile;
