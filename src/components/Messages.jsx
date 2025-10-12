import React, { useState, useEffect } from "react";
import { supabase } from "../config/supabaseClient";

const Messages = ({ userType, profileId }) => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  const isLandlord = userType === "landlord";
  const otherUserType = isLandlord ? "tenant" : "landlord";

  useEffect(() => {
    const fetchUsers = async () => {
      const table = isLandlord ? "tenants" : "landlords";
      const { data, error } = await supabase.from(table).select("id, name");
      if (!error) setAllUsers(data);
    };
    fetchUsers();
  }, [isLandlord]);

  useEffect(() => {
    if (!profileId) return;
    async function fetchConversations() {
      const query = supabase
        .from("tenant_landlord_conversations")
        .select(
          isLandlord
            ? `id, tenant:tenants(id, name)`
            : `id, landlord:landlords(id, name)`
        )
        .eq(isLandlord ? "landlord_id" : "tenant_id", profileId)
        .order("created_at", { ascending: false });

      const { data } = await query;
      setConversations(data || []);
      if (data?.length) setSelectedConversation(data[0].id);
    }
    fetchConversations();
  }, [profileId, userType]);

  useEffect(() => {
    if (!selectedConversation) return;
    async function fetchMessages() {
      const { data } = await supabase
        .from("tenant_landlord_messages")
        .select("*")
        .eq("conversation_id", selectedConversation)
        .order("created_at", { ascending: true });
      setMessages(data);
    }
    fetchMessages();
  }, [selectedConversation]);

  const handleStartConversation = async (otherUserId) => {
    const tenant_id = isLandlord ? otherUserId : profileId;
    const landlord_id = isLandlord ? profileId : otherUserId;

    const { data: existing } = await supabase
      .from("tenant_landlord_conversations")
      .select("id")
      .eq("tenant_id", tenant_id)
      .eq("landlord_id", landlord_id)
      .limit(1);

    if (existing?.length > 0) {
      setSelectedConversation(existing[0].id);
    } else {
      const { data: newConv } = await supabase
        .from("tenant_landlord_conversations")
        .insert([{ tenant_id, landlord_id }])
        .select()
        .single();

      setConversations((prev) => [newConv, ...prev]);
      setSelectedConversation(newConv.id);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const { data } = await supabase
      .from("tenant_landlord_messages")
      .insert([
        {
          conversation_id: selectedConversation,
          sender_type: userType,
          sender_id: profileId,
          message: newMessage.trim(),
        },
      ])
      .select();

    setMessages((prev) => [...prev, data[0]]);
    setNewMessage("");
  };

  const selectedConvObj = conversations.find((c) => c.id === selectedConversation);

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full h-full">
      {/* Sidebar */}
      <div className="w-full md:w-1/3 border-r overflow-y-auto max-h-[400px] md:max-h-full p-2">
        <h3 className="font-semibold mb-2">Start Conversation</h3>
        <select
          className="w-full border px-2 py-1 rounded mb-4"
          onChange={(e) => handleStartConversation(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>
            Select a {otherUserType}...
          </option>
          {allUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <h3 className="font-semibold mb-2">Conversations</h3>
        {conversations.length === 0 && <p>No conversations yet.</p>}
        {conversations.map((conv) => {
          const name = isLandlord
            ? conv.tenant?.name || "Unknown Tenant"
            : conv.landlord?.name || "Unknown Landlord";

          return (
            <div
              key={conv.id}
              onClick={() => setSelectedConversation(conv.id)}
              className={`p-2 cursor-pointer rounded ${
                conv.id === selectedConversation
                  ? "bg-brown text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {name}
            </div>
          );
        })}
      </div>

      {/* Chat area */}
      <div className="w-full md:w-2/3 flex flex-col justify-between">
        <h3 className="font-semibold mb-2 px-2">
          Messages with{" "}
          {selectedConvObj
            ? isLandlord
              ? selectedConvObj.tenant?.name
              : selectedConvObj.landlord?.name
            : "Select a conversation"}
        </h3>

        {/* Messages */}
        <div className="flex-grow overflow-y-auto border rounded p-2 bg-gray-50 flex flex-col max-h-[400px]">
          {messages.length === 0 && <p className="text-gray-500">No messages yet.</p>}
          {messages.map((msg) => {
            const isSender = msg.sender_type === userType;
            return (
              <div
                key={msg.id}
                className={`flex ${isSender ? "justify-end" : "justify-start"} px-1`}
              >
                <div
                  className={`max-w-[80%] p-4 mb-2 rounded-b-md text-sm ${
                    isSender
                      ? "bg-green rounded-tl-[1.5rem]"
                      : "bg-blue rounded-tr-[1.5rem]"
                  }`}
                >
                  <p className="mb-1">{msg.message}</p>
                  <small className="text-xs text-gray-600 block text-right">
                    {new Date(msg.created_at).toLocaleTimeString()}
                  </small>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div className="flex space-x-2 mt-3 p-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow border rounded px-2 py-2"
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="bg-brown text-white px-4 py-2 rounded hover:bg-brown/90"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messages;
