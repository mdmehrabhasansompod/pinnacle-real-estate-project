import React, { useState, useEffect } from "react";
import {
  getAllEmails,
  deleteEmail,
  broadcastEmail,
  sendToOneSubscriber,
} from "../api/newsletterApi";
import { FaSearch, FaTrash, FaPaperPlane } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Newsletter = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({ id: null, email: "" });
  const [singleSubject, setSingleSubject] = useState("");
  const [singleMessage, setSingleMessage] = useState("");

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const data = await getAllEmails();
      setSubscribers(data);
    } catch (err) {
      console.error("Error fetching subscribers:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this subscriber?")) return;
    try {
      await deleteEmail(id);
      setSubscribers((prev) => prev.filter((sub) => sub._id !== id));
    } catch (err) {
      console.error("Error deleting subscriber:", err);
    }
  };

  const handleBroadcast = async () => {
    if (!subject || !message) {
      setStatus({ type: "error", message: "Subject and message are required!" });
      return;
    }
    try {
      setLoading(true);
      const res = await broadcastEmail(subject, message);
      setStatus({ type: "success", message: res.message });
      setSubject("");
      setMessage("");
    } catch (err) {
      console.error("Broadcast error:", err);
      setStatus({ type: "error", message: "Failed to send broadcast." });
    } finally {
      setLoading(false);
    }
    setTimeout(() => setStatus(null), 4000);
  };

  const openPopup = (id, email) => {
    setPopupData({ id, email });
    setSingleSubject("");
    setSingleMessage("");
    setShowPopup(true);
  };

  const handleSendOne = async () => {
    if (!singleSubject || !singleMessage) {
      alert("Subject and message are required!");
      return;
    }
    try {
      setLoading(true);
      const res = await sendToOneSubscriber(popupData.id, singleSubject, singleMessage);
      setStatus({ type: "success", message: res.message });
      setShowPopup(false);
    } catch (err) {
      console.error("Error sending single email:", err);
      setStatus({ type: "error", message: "Failed to send email." });
    } finally {
      setLoading(false);
    }
    setTimeout(() => setStatus(null), 4000);
  };

  const filtered = subscribers.filter((sub) =>
    sub.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <motion.h1
        className="text-2xl font-bold mb-4 text-gray-800"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Newsletter Subscribers
      </motion.h1>

      <AnimatePresence>
        {status && (
          <motion.div
            key="status"
            className={`p-2 mb-4 rounded ${
              status.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {status.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search */}
      <motion.div
        className="flex items-center border rounded p-2 mb-4 w-full sm:w-72"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <FaSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search email..."
          className="flex-1 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </motion.div>

      {/* Broadcast Section */}
      <motion.div
        className="bg-gray-100 p-4 rounded mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="font-semibold mb-2">Send Broadcast</h2>
        <input
          type="text"
          placeholder="Subject"
          className="w-full border rounded p-2 mb-2"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <textarea
          placeholder="Message"
          className="w-full border rounded p-2 mb-2"
          rows="3"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={handleBroadcast}
          disabled={loading}
          className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Sending..." : "Send to All"}
        </button>
      </motion.div>

      {/* Subscribers Table */}
      <motion.table
        className="w-full border-collapse border"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Email</th>
            <th className="border p-2">Subscribed At</th>
            <th className="border p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((sub) => (
            <motion.tr
              key={sub._id}
              className="hover:bg-gray-50"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <td className="border p-2">{sub.email}</td>
              <td className="border p-2">
                {sub.subscribedAt ? new Date(sub.subscribedAt).toLocaleString() : "N/A"}
              </td>
              <td className="border p-2 text-center flex gap-3 justify-center">
                <button
                  onClick={() => openPopup(sub._id, sub.email)}
                  className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
                >
                  <FaPaperPlane /> Send
                </button>
                <button
                  onClick={() => handleDelete(sub._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </td>
            </motion.tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center p-4 text-gray-500">
                No subscribers found.
              </td>
            </tr>
          )}
        </tbody>
      </motion.table>

      {/* Popup Modal */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded shadow-lg w-full max-w-md"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className="text-lg font-bold mb-4">Send Email to {popupData.email}</h2>
              <input
                type="text"
                placeholder="Subject"
                className="w-full border rounded p-2 mb-2"
                value={singleSubject}
                onChange={(e) => setSingleSubject(e.target.value)}
              />
              <textarea
                placeholder="Message"
                className="w-full border rounded p-2 mb-2"
                rows="4"
                value={singleMessage}
                onChange={(e) => setSingleMessage(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 rounded border"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendOne}
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {loading ? "Sending..." : "Send"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Newsletter;

