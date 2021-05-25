import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {get} from "../actions";
import axios from "axios";
import useDataRequest from "../hooks/useDataRequest";
import "./../component/component.css"
import Todo from "./Todo";
import "./../App.css"

function SearchForm(){
    const {todos, completeTodo, removeTodo, getTodo} = useDataRequest()


    const [allData, setAllData] = useState([]);
    const [filteredData, setFilteredData] = useState(allData);
    const [info, setInfo] = useState({});
    const handleSearch = (event) =>{
        let value = event.target.value.toLowerCase();
        let result = [];
        console.log(value);
        result = allData.filter((data) => {
            return data.text.search(value) != -1;
        });
        setFilteredData(result);
    }
    const handleFocus= (value) =>{

        setInfo(value);
        console.log("info:",info)
    }
    React.useEffect(() => {
        axios('https://609b7dc92b549f00176e386b.mockapi.io/todo')
            .then(response => {
                console.log(response.data)
                setAllData(response.data);
                setFilteredData(response.data)  ;

            }).catch(error => {
            console.log('Error getting fake data: ' + error);
        })
    }, []);
    return(
        <div className="searchForm">
            <div>
                <label>Search:</label>
                <input type="text" onChange={(event) =>handleSearch(event)} />
            </div>
            <div className="infor">
                {String(info.id)}
                <br />
                {String(info.isCompleted)}
                <br />
                {info.text}
            </div>
            <div>
                {filteredData.map((value,index)=>{
                    return(
                        <ul key={value.id}>
                            <span className="todosearch" >
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