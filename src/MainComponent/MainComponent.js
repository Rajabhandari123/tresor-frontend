import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const MainComponent = () => {
    const [csvData, setcsvData] = useState([]);
    const [type, setType] = useState("A");


    useEffect(() => {
        getData('A');
    }, []);

    const getData = (type) => {
        axios.get(`http://localhost:5000/getCSVData/${type}`)
            .then(res => {
                setcsvData(res.data.data)
            })
            .catch(err => {
                console.log(err);

            });
    }

    const selectType = (event) => {
        if (event.target.value !== type) {
            setType(event.target.value)
            const type = event.target.value;
            getData(type);
        }
    }
    return (
        <div>
            <select id="type" name="type" onClick={selectType}>
                <option value="A">Type A</option>
                <option value="B">Type B</option>
                <option value="C">Type C</option>
                <option value="D">Type D</option>
                <option value="E">Type E</option>

            </select>
            <BarChart width={600} height={300} data={csvData}>
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis />
                <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
                <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="Number" fill="#8884d8" barSize={30} />
            </BarChart>
        </div>
    );
}

export default MainComponent;