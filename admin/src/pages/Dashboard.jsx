import React, { useEffect, useState } from 'react';

const Dashboard = () => {
    const [monthlyEarnings, setMonthlyEarnings] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8085/appointment') // ตรวจสอบว่า URL นี้ถูกต้อง
            .then(response => response.json())
            .then(data => {
                console.log('Fetched Data:', data); // แสดงข้อมูลที่ได้รับจาก API เพื่อตรวจสอบ

                // คำนวณรายได้รายเดือนจากข้อมูล
                const earningsByMonth = data.reduce((acc, appointment) => {
                    if (appointment.status && appointment.status.trim().toLowerCase() === 'paid') {
                        // ตรวจสอบฟอร์แมตวันที่
                        const date = new Date(appointment.appointmentDate);
                        if (!isNaN(date)) { // ตรวจสอบว่า date แปลงสำเร็จหรือไม่
                            const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;
                            if (!acc[monthYear]) {
                                acc[monthYear] = 0;
                            }
                            acc[monthYear] += 200; // สมมติว่ารายได้ต่อการจองที่จ่ายแล้วคือ 200
                        } else {
                            console.error('Invalid date format:', appointment.appointmentDate);
                        }
                    }
                    return acc;
                }, {});

                // แปลงข้อมูลให้พร้อมแสดงในตาราง
                const earningsArray = Object.entries(earningsByMonth).map(([month, total]) => ({ month, total }));
                setMonthlyEarnings(earningsArray);
            })
            .catch(error => console.error('Error fetching appointments:', error));
    }, []);

    return (
        <div className="p-5">
            <h2 className="text-gray-600">Monthly Total Earnings</h2>
            <table className="w-full mt-5 border-collapse border border-gray-300">
                <thead>
                <tr>
                    <th className="border border-gray-300 px-4 py-2">Month-Year</th>
                    <th className="border border-gray-300 px-4 py-2">Total Earnings (฿)</th>
                </tr>
                </thead>
                <tbody>
                {monthlyEarnings.length === 0 ? (
                    <tr>
                        <td colSpan="2" className="text-center py-4">No data available</td>
                    </tr>
                ) : (
                    monthlyEarnings.map(({ month, total }, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 px-4 py-2">{month}</td>
                            <td className="border border-gray-300 px-4 py-2">{total}</td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
