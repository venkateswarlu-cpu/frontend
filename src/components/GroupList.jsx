import React from 'react'

const GroupList = ({ groups }) => {
  return (
    <div>
      <h2>Groups</h2>
      {groups.length === 0 ? (
        <p>No groups yet</p>
      ) : (
        <ul>
          {groups.map((g) => (
            <li key={g._id}>{g.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default GroupList
