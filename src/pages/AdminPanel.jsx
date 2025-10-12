import React, { useEffect, useState } from 'react';
import { supabase } from '../config/supabaseClient';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
  const [tenants, setTenants] = useState([]);
  const [landlords, setLandlords] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();

  // ✅ Check if user is logged in and is admin
  useEffect(() => {
    const checkAuth = async () => {
      setCheckingAuth(true);

      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        toast.error("You must be logged in.");
        navigate('/login');
        return;
      }

      const role = user.user_metadata?.role;

      if (role !== 'admin') {
        toast.error("Access denied. Admins only.");
        navigate('/unauthorized'); // redirect or show error
        return;
      }

      // ✅ Passed auth check
      await fetchData();
      await fetchComplaints();
      setCheckingAuth(false);
    };

    checkAuth();
  }, []);

  const fetchData = async () => {
    setLoading(true);

    const { data: tenantsData, error: tenantsError } = await supabase
      .from('tenants')
      .select('*');

    const { data: landlordsData, error: landlordsError } = await supabase
      .from('landlords')
      .select('*');

    if (tenantsError || landlordsError) {
      toast.error('Failed to fetch users');
      console.error(tenantsError || landlordsError);
    } else {
      setTenants(tenantsData || []);
      setLandlords(landlordsData || []);
    }

    setLoading(false);
  };

  const fetchComplaints = async () => {
    const { data, error } = await supabase
      .from("complaints")
      .select(`
        id,
        description,
        file_url,
        created_at,
        tenant_id,
        tenants (name, email)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      toast.error("Failed to fetch complaints.");
      console.error(error);
    } else {
      setComplaints(data);
    }
  };

  const handleDelete = async (id, role) => {
    const table = role === 'tenant' ? 'tenants' : 'landlords';
    const confirm = window.confirm(`Are you sure you want to delete this ${role}?`);
    if (!confirm) return;

    const { error } = await supabase.from(table).delete().eq('id', id);

    if (error) {
      toast.error('Failed to delete user');
      console.error(error);
    } else {
      toast.success(`${role} deleted successfully`);
      fetchData();
    }
  };

  // 🔁 While checking authentication
  if (checkingAuth) return <p className="p-6">Checking access...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-2">Tenant Complaints</h2>
        {complaints.length === 0 ? (
          <p>No complaints submitted yet.</p>
        ) : (
          <table className="w-full table-auto border">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2">From</th>
                <th className="p-2">Email</th>
                <th className="p-2">Complaint</th>
                <th className="p-2">Attachment</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((comp) => (
                <tr key={comp.id} className="border-t">
                  <td className="p-2">{comp.tenants?.name || "Unknown"}</td>
                  <td className="p-2">{comp.tenants?.email}</td>
                  <td className="p-2">{comp.description}</td>
                  <td className="p-2">
                    {comp.file_url ? (
                      <a
                        href={comp.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View File
                      </a>
                    ) : (
                      "No File"
                    )}
                  </td>
                  <td className="p-2">
                    {new Date(comp.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {loading ? (
        <p className="mt-6">Loading...</p>
      ) : (
        <>
          <section className="mb-8 mt-10">
            <h2 className="text-xl font-semibold mb-2">Tenants</h2>
            {tenants.length === 0 ? (
              <p>No tenants found.</p>
            ) : (
              <table className="w-full table-auto border">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="p-2">Name</th>
                    <th className="p-2">Email</th>
                    <th className="p-2">Phone</th>
                    <th className="p-2">Civil ID</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tenants.map((tenant) => (
                    <tr key={tenant.id} className="border-t">
                      <td className="p-2">{tenant.name}</td>
                      <td className="p-2">{tenant.email}</td>
                      <td className="p-2">{tenant.phone}</td>
                      <td className="p-2">{tenant.civil_id}</td>
                      <td className="p-2">
                        <button
                          className="text-red-600 hover:underline"
                          onClick={() => handleDelete(tenant.id, 'tenant')}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Landlords</h2>
            {landlords.length === 0 ? (
              <p>No landlords found.</p>
            ) : (
              <table className="w-full table-auto border">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="p-2">Name</th>
                    <th className="p-2">Email</th>
                    <th className="p-2">Phone</th>
                    <th className="p-2">Civil ID</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {landlords.map((landlord) => (
                    <tr key={landlord.id} className="border-t">
                      <td className="p-2">{landlord.name}</td>
                      <td className="p-2">{landlord.email}</td>
                      <td className="p-2">{landlord.phone}</td>
                      <td className="p-2">{landlord.civil_id}</td>
                      <td className="p-2">
                        <button
                          className="text-red-600 hover:underline"
                          onClick={() => handleDelete(landlord.id, 'landlord')}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        </>
      )}
    </div>
  );
}
