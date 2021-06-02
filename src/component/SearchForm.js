import React, {useState} from "react";
import {axios} from "../axios";
import "./../component/component.css"
import "./../App.css"


function SearchForm(){

    const [allData, setAllData] = useState([]);
    const [filteredData, setFilteredData] = useState(allData);
    const [info, setInfo] = useState(null);
    const handleSearch = (event) =>{
        let value = event.target.value.toLowerCase();
        let result = [];
        result = allData.filter((data) => {
            return data.text.match(value);
        });
        setFilteredData(result);
    }
    const handleFocus= (value) =>{
        setInfo(value);
    }
    const handleExit = () => {
        setInfo(null)
    }
    React.useEffect(() => {
        axios.get('/todo')
            .then(response => {
                setAllData(response.data);
                setFilteredData(response.data);
                console.log('info:', info); // See Log
            }).catch(error => {
            console.log('Error getting fake data: ' + error);
        })
    }, []);
    return(
        <div className="todo-list">
            <div>
                <label>Search:</label>
                <input type="text" placeholder="On your wish" onChange={(event) =>handleSearch(event)}  />
            </div>
            {(info != null) && <div className="infor">
                <button className="exit" onClick={() => handleExit()}>Exit</button>
                <br />
                {String(info.id)}
                <br />
                {String(info.isCompleted)}
                <br />
                {info.text}
            </div>}
            <div>
                {filteredData.map((value,index)=>{
                    return(
                        <ul key={value.id}>
                            <span className="todo" >
                                {value.text}
                                <button onClick={() => handleFocus(value)}>Show</button>
                            </span>
                        </ul>
                    )
                })}
            </div>
        </div>
    )
}
export default SearchForm;