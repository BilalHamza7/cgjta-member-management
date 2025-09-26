import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import MemberIcon from '../assets/profile-male.svg';
import { useNavigate } from "react-router-dom";

const MembersTable = ({ members = [], loading }) => {

  const navigate = useNavigate();

  const [profiles, setProfiles] = useState({}); // stores signed URLs with profile path as keys

  useEffect(() => {
    const fetchProfiles = async () => {
      if (members.length === 0) return;

      const urls = {};

      await Promise.all(
        members.map(async (member) => {
          if (member.profileUrl) {
            const { data } = await supabase
              .storage
              .from("profile-images")
              .createSignedUrl(member.profileUrl, 3600);
            urls[member.profileUrl] = data?.signedUrl || null;
          }
        })
      );
      setProfiles(urls);
    };

    fetchProfiles();
  }, [members]);

  return (
    <div className="mt-5 overflow-x-auto rounded-lg shadow-gray-300 shadow-md">
      <table className="min-w-full rounded-lg ">
        <thead className="bg-[#314cb6ee]">
          <tr className="">
            <th className="p-3 text-left font-semibold text-white">ID</th>
            <th className="p-3 text-left font-semibold text-white">Name</th>
            <th className="p-3 text-left font-semibold text-white">Email</th>
            <th className="p-3 text-left font-semibold text-white">Level</th>
            <th className="p-3 text-left font-semibold text-white">Status</th>
            <th className="p-3 text-left font-semibold text-white">Mobile</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                Loading...
              </td>
            </tr>
          ) : members.length > 0 ? (
            members.map((member, idx) => (
              <tr
                key={idx}
                className="hover:bg-[#edede9] transition duration-200 cursor-pointer"
                onClick={() =>
                  navigate("/members/memberDetails", { state: { member, profiles } })
                }
              >
                <td className="p-3 text-gray-900">
                  {String(member.memberId).padStart(4, "0")}
                </td>
                <td className="p-3 text-gray-900 flex gap-3 items-center">
                  <img
                    src={profiles[member.profileUrl] || MemberIcon}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  {member.fullName}
                </td>
                <td className="p-3 text-gray-900">{member.email}</td>
                <td className="p-3 text-gray-900">{member.membership.levelName}</td>
                <td className="p-3 text-gray-900">
                  {member.membership.status === "Active" ? (
                    <span className="px-2 py-1 text-green-900 bg-green-200 rounded text-xs font-medium">
                      Active
                    </span>
                  ) : member.membership.status === "Inactive" ? (
                    <span className="px-2 py-1 text-yellow-900 bg-yellow-200 rounded text-xs font-medium">
                      Inactive
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-red-900 bg-red-200 rounded text-xs font-medium">
                      Terminated
                    </span>
                  )}
                </td>
                <td className="px-6 py-3 text-gray-900">{member.mobileNumber}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                No members found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MembersTable;
