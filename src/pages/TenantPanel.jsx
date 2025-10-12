import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Home, MessageCircle, Calendar, User } from "lucide-react";
import RentalRooms from "../components/RentalRooms";
import TenantEvents from "../components/TenantEvents";
import { supabase } from "../config/supabaseClient";
import Messages from "../components/Messages";
import ComplaintBox from "../components/ComplaintBox";
import TenantProfile from "../components/TenantProfile";

const TenantPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("rental");
  const [tenant, setTenant] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(stored);
    if (user.role !== "tenant") {
      navigate("/login");
      return;
    }

    if (!user.profileId) {
      alert("Missing profile information. Please login again.");
      navigate("/login");
      return;
    }

    setTenant(user);

    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("tenant_events")
        .select("*")
        .eq("tenant_id", user.profileId);

      if (error) {
        console.error("Error fetching events:", error.message);
      } else {
        const formatted = data.map((ev) => ({
          ...ev,
          id: ev.event_id,
          date: new Date(ev.start_time),
        }));
        setEvents(formatted);
      }
    };

    fetchEvents();
  }, [navigate]);

  const handleEventAdd = async (newEvent) => {
  if (!tenant) return;
  const { title, description, date } = newEvent;

  // Normalize date to 00:00:00 local time
  const normalizedDate = new Date(date);
  normalizedDate.setHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from("tenant_events")
    .insert([
      {
        tenant_id: tenant.profileId,
        title,
        description,
        start_time: normalizedDate.toISOString(), // Store ISO for consistency
        end_time: normalizedDate.toISOString(),
      },
    ])
    .select();

  if (error) {
    console.error("Error adding event:", error.message);
  } else {
    const inserted = data[0];
    setEvents((prev) => [
      ...prev,
      { ...inserted, id: inserted.event_id, date: new Date(inserted.start_time) },
    ]);
  }
};


  const handleEventDelete = async (eventId) => {
    const { error } = await supabase.from("tenant_events").delete().eq("event_id", eventId);

    if (error) {
      console.error("Error deleting event:", error.message);
    } else {
      setEvents((prev) => prev.filter((ev) => ev.id !== eventId));
    }
  };

  const renderSection = () => {
    if (!tenant) return <p>Loading...</p>;

    switch (activeTab) {
      case "rental":
        return <RentalRooms />;
      case "messages":
        return (
          <Messages
            userType="tenant"
            profileId={tenant.profileId}
          />
        );
      case "meetings":
        return (
          <TenantEvents
            events={events}
            onEventAdd={handleEventAdd}
            onEventDelete={handleEventDelete}
          />
        );
      case "profile":
  return <TenantProfile tenant={tenant} />;

      default:
        return null;
    }
  };

  if (!tenant) return null;

  return (
    <div className="w-full">
      {/* HERO IMAGE */}
      <div className="relative w-full h-[100vh]">
        <img src={assets.tenantpanel_hero} alt="Tenant" className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-20">
          <div className="bg-white opacity-75 px-16 py-10" style={{ borderTopLeftRadius: "4rem" }}>
            <h1 className="text-black text-4xl md:text-5xl font-italiana px-2 text-center">
              Welcome, {tenant.name}
            </h1>
          </div>
        </div>
      </div>

      {/* SINGLE MINI NAVBAR */}
      <div className="flex justify-center mt-6">
<div className="flex flex-col sm:flex-row gap-2 sm:gap-3 bg-brown_lt px-4 sm:px-10 py-2 shadow-md w-full sm:w-fit">
  {[
    { key: "rental", label: "Rental Rooms", icon: <Home size={20} /> },
    { key: "messages", label: "Messages", icon: <MessageCircle size={20} /> },
    { key: "meetings", label: "Meetings", icon: <Calendar size={20} /> },
    { key: "profile", label: "Profile", icon: <User size={20} /> },
  ].map((tab) => (
    <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center justify-start sm:justify-center gap-2 px-4 py-2 rounded font-semibold transition-all
                ${activeTab === tab.key ? "bg-brown text-white rounded-tl-[1.5rem]" : "text-black hover:bg-brown/10"}
                w-full sm:w-auto
              `}
            >
      {tab.icon}
      <span className="whitespace-nowrap">{tab.label}</span>
    </button>
  ))}
</div>

      </div>

      {/* ACTIVE SECTION */}
      <div className="mt-6 p-6 bg-white shadow rounded max-w-4xl mx-auto">{renderSection()}</div>
      <div className="mt-6 max-w-4xl mx-auto bg-red-50 border border-red-200 p-6 rounded shadow">
  <ComplaintBox role="tenant" user={tenant} />
</div>
    </div>
  );
};

export default TenantPanel;
