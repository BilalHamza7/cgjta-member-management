import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import MemberIcon from '../assets/member-filled.svg';

const MembersTable = ({ members = [] }) => {

  const [profiles, setProfiles] = useState({}); // store signed URLs keyed by profile path

  useEffect(() => {
    const fetchProfiles = async () => {
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
          <tr>
            <th className="px-6 py-3 text-left font-semibold text-white">ID</th>
            <th className="px-6 py-3 text-left font-semibold text-white">Name</th>
            <th className="px-6 py-3 text-left font-semibold text-white">Email</th>
            <th className="px-6 py-3 text-left font-semibold text-white">Level</th>
            <th className="px-6 py-3 text-left font-semibold text-white">Payment</th>
            <th className="px-6 py-3 text-left font-semibold text-white">Mobile</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {members.length > 0 ? (
            members.map((member, idx) => (
              <tr
                key={idx}
                className="hover:bg-[#F5F6EE] transition duration-200"
              >
                <td className="px-6 py-3 text-sm text-gray-800">{member.memberId}</td>
                <td className="px-6 py-3 text-sm text-gray-800 flex gap-3 items-center">
                  <img src={profiles[member.profileUrl] || MemberIcon} alt="" className="w-7 h-7 rounded-full" />
                  {member.fullName}
                </td>
                <td className="px-6 py-3 text-sm text-gray-800">{member.email}</td>
                <td className="px-6 py-3 text-sm text-gray-800">{member.membership.levelName}</td>
                <td className="px-6 py-3 text-sm text-gray-800">
                  {member.membership.paid ? (
                    <span className="px-2 py-1 text-green-700 bg-green-100 rounded text-xs font-medium">
                      Paid
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-red-700 bg-red-100 rounded text-xs font-medium">
                      Unpaid
                    </span>
                  )}
                </td>
                <td className="px-6 py-3 text-sm text-gray-800">{member.mobileNumber}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className="px-6 py-4 text-center text-gray-500 text-sm"
              >
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
