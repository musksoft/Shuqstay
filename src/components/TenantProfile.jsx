import React from "react";
import {
  User,
  Mail,
  CreditCard,
  Phone,
  Calendar,
  Globe,
  Info,
} from "lucide-react";

export default function TenantProfile({ tenant }) {
  if (!tenant) return <div>Unauthorized</div>;

  const fields = [
    { label: "Name", value: tenant.name, icon: <User className="w-5 h-5 text-[#7a5238]" /> },
    { label: "Email", value: tenant.email, icon: <Mail className="w-5 h-5 text-[#7a5238]" /> },
    { label: "Civil ID", value: tenant.civil_id, icon: <CreditCard className="w-5 h-5 text-[#7a5238]" /> },
    { label: "Phone", value: tenant.phone, icon: <Phone className="w-5 h-5 text-[#7a5238]" /> },
    { label: "Age", value: tenant.age, icon: <Calendar className="w-5 h-5 text-[#7a5238]" /> },
    { label: "Nationality", value: tenant.nationality, icon: <Globe className="w-5 h-5 text-[#7a5238]" /> },
    { label: "Status", value: tenant.status, icon: <Info className="w-5 h-5 text-[#7a5238]" /> },
  ];

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-[#d6cbb2]">
      <h2 className="text-4xl font-italiana font-bold text-[#704324] mb-8 text-center tracking-wide">
        Tenant Profile
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {fields.map(({ label, value, icon }) => (
          <div
            key={label}
            className="flex items-center space-x-4 p-4 rounded-lg bg-[#faf6f2] border border-transparent hover:border-[#7a5238] transition cursor-default shadow-sm"
          >
            <div className="p-3 bg-[#7a5238]/20 rounded-full">{icon}</div>
            <div>
              <h3 className="text-sm text-[#7a5238] font-semibold mb-1">{label}</h3>
              <p className="text-lg font-medium text-[#5b3f2e]">{value || "N/A"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
