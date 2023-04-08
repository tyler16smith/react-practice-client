import React, { useEffect, useState } from 'react'

export default function App() {
  
  const [backendData, setBackendData] = useState([])
  
  useEffect(() => {
    fetch("/api")
        .then(response => response.json())
        .then(data => {
          setBackendData(data.users);
          console.log(data.users);
        })
        .catch(error => console.error('Error fetching data:', error));
  }, [])
  
  return (
    <div>
      {backendData.length === 0 ? (
        <p>No data</p>
      ) : (
        <div>
          {backendData && backendData.map(function(user, index) {
            return (
              <p key={index}>{user}</p>
            )
          })}
        </div>
      )}
    </div>
  )
}
