import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Home, MessageCircle, Calendar, User } from "lucide-react";
import ManagePropertyForm from "../components/ManagePropertyForm";
import LandlordEvents from "../components/LandlordEvents";
import LandlordProfile from "../components/LandlordProfile";
import LandlordPropertyList from "../components/LandlordPropertyList";
import { supabase } from "../config/supabaseClient";
import Messages from "../components/Messages";

const LandlordAdmin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("property");
  const [landlord, setLandlord] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(stored);
    if (user.role !== "landlord") {
      navigate("/login");
      return;
    }

    if (!user.profileId) {
      alert("Missing profile information. Please login again.");
      navigate("/login");
      return;
    }

    setLandlord(user);
    fetchEvents(user.profileId);
  }, [navigate]);

  const fetchEvents = async (landlordId) => {
    const { data, error } = await supabase
      .from("landlord_events")
      .select("*")
      .eq("landlord_id", landlordId);

    if (error) {
      console.error("Error fetching landlord events:", error.message);
    } else {
      const formatted = data.map((ev) => ({
        ...ev,
        id: ev.event_id,
        date: new Date(ev.start_time),
      }));
      setEvents(formatted);
    }
  };

  const handleEventAdd = async (newEvent) => {
    if (!landlord) return;
    const { title, description, date } = newEvent;

    const { data, error } = await supabase
      .from("landlord_events")
      .insert([
        {
          landlord_id: landlord.profileId,
          title,
          description,
          start_time: date,
          end_time: date,
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
    const { error } = await supabase.from("landlord_events").delete().eq("event_id", eventId);

    if (error) {
      console.error("Error deleting event:", error.message);
    } else {
      setEvents((prev) => prev.filter((ev) => ev.id !== eventId));
    }
  };

  const renderSection = () => {
    if (!landlord) return <p>Loading...</p>;

    switch (activeTab) {
      case "property":
        return <ManagePropertyForm landlordId={landlord.profileId} />;
      case "messages":
        return <Messages userType="landlord" profileId={landlord.profileId} />;
      case "meetings":
        return (
          <LandlordEvents
            events={events}
            onEventAdd={handleEventAdd}
            onEventDelete={handleEventDelete}
          />
        );
      case "profile":
        return <LandlordProfile landlord={landlord} />;
      case "view":
        return <LandlordPropertyList landlordId={landlord.profileId} />;
      default:
        return null;
    }
  };

  if (!landlord) return null;

  return (
    <div className="w-full">
      {/* HERO IMAGE */}
      <div className="relative w-full h-[80vh] sm:h-[90vh] md:h-[100vh]">
        <img
          src={assets.landlord_hero}
          alt="Landlord"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-20 px-4">
          <div className="bg-green px-6 sm:px-12 py-8 sm:py-10 rounded-tl-[3rem]">
            <h1 className="text-black text-3xl sm:text-4xl md:text-5xl font-italiana text-center">
              Welcome, {landlord.name}
            </h1>
          </div>
        </div>
      </div>

      {/* MINI NAVBAR */}
      <div className="flex justify-center mt-6 px-2">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 bg-brown_lt px-4 py-3 rounded-2xl shadow-md w-full sm:w-fit">
          {[
                  { key: "property", label: "Manage Property", icon: <Home size={20} /> },
            { key: "messages", label: "Messages", icon: <MessageCircle size={20} /> },
            { key: "meetings", label: "Meetings", icon: <Calendar size={20} /> },
            { key: "view", label: "View Properties", icon: <Home size={20} /> },
            { key: "profile", label: "Profile", icon: <User size={20} /> },          ].map((tab) => (
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

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-6">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default LandlordAdmin;
