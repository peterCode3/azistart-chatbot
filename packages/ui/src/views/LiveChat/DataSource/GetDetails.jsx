import React, { useState, useEffect } from 'react';
import '../live-chat.css'

function extractWebsiteName(url) {
  try {
    const { hostname } = new URL(url);
    return hostname;
  } catch (error) {
    console.error('Invalid URL:', url);
    return 'Unknown';
  }
}

function GetDetails() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3005/api/scrap_data_site')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="scrollAreaViewport">
      <table className="data-table">
        <thead>
          <tr>
            <th>Website Name</th>
            <th>Data Source</th>
            <th>Used By</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{extractWebsiteName(item.url)}</td>
              <td>Website</td>
              <td>Azister</td>
              <td>{item.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GetDetails;
