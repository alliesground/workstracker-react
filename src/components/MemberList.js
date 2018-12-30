import React from 'react'

const MemberList = ({ members }) => (
  <div>
    <b>Members: </b>
    {
      members.map(member => (
        <span
          key={member.id}
        >
          {member.attributes.email}
        </span>
      ))
    }
  </div>
);

export default MemberList;
