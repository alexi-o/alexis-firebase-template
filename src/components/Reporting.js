import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function Reporting() {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "reports"));
        const data = querySnapshot.docs.map((doc) => doc.data());
        setReportData(data);
      } catch (error) {
        console.error("Error fetching report data: ", error);
      }
    };

    fetchReportData();
  }, []);

  return (
    <div>
      <h2>Site Reports</h2>
      {reportData.length ? (
        <table>
          <thead>
            <tr>
              <th>Report Name</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((report, index) => (
              <tr key={index}>
                <td>{report.name}</td>
                <td>{report.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No reports available.</p>
      )}
    </div>
  );
}

export default Reporting;
