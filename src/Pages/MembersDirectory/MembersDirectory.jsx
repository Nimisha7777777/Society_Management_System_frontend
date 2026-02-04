// 

import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import DashboardLayout from "../../layouts/DashboardLayout";
import Card from "../../Components/Card";
import "./MembersDirectory.css";

export default function MembersDirectory() {
  const { user } = useAuth();
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/members/directory", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        setMembers(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load members:", err);
        setLoading(false);
      });
  }, []);

  const filteredMembers = members.filter(member => {
    const q = search.toLowerCase();
    return (
      member.name?.toLowerCase().includes(q) ||
      member.flatNumber?.toLowerCase().includes(q) ||
      member.towerName?.toLowerCase().includes(q)
    );
  });

  return (
    <DashboardLayout>
      <div className="members-directory">

        <div className="directory-header">
          <h1 className="page-title">Member Directory</h1>
          <p className="page-subtitle">Know Your Neighbours</p>
        </div>

        <Card className="search-card">
          <input
            type="text"
            placeholder="Search by name, tower, or flat..."
            className="search-input"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </Card>

        {loading ? (
          <Card><p>Loading members...</p></Card>
        ) : filteredMembers.length === 0 ? (
          <Card className="empty-state-card">
            <p>No members found</p>
          </Card>
        ) : (
          <Card className="table-card">
            <table className="members-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Tower</th>
                  <th>Flat</th>
                  {user?.role === "ADMIN" && <th>Email</th>}
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map(member => (
                  <tr key={member.userId}>
                    <td>{member.name}</td>
                    <td>{member.towerName}</td>
                    <td>{member.flatNumber}</td>
                    {user?.role === "ADMIN" && (
                      <td>{member.email || "-"}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}

        <div className="directory-footer">
          Showing {filteredMembers.length} members
        </div>

      </div>
    </DashboardLayout>
  );
}
