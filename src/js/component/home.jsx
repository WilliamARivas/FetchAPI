import React, { useEffect, useState} from "react";



//create your first component
const Home = () => {

	const [list, setList] = useState([]);

	useEffect(() => {
		getList()
	},[])

	const getList = () =>{
		fetch("https://assets.breatheco.de/apis/fake/todos/user/williamarivas")
		.then(response => response.json())
		.then(result => setList(result))
		.catch(error => console.log("error: ", error))
	}


	const addTask = (myTask) =>{
		const newList = [...list, myTask]
		fetch("https://assets.breatheco.de/apis/fake/todos/user/williamarivas", {
			method: 'PUT',
			headers: {
				'Content-Type': 'Application/json'
			},
			body: JSON.stringify(newList),
			redirect: 'follow'
		})
			.then(response => response.json())
			.then(result => getList())
			.catch(error => console.log("error: ", error))
	}

	console.log(list)
	return (
		<div className="text-center">
			{list.map((task, i) =>{
				return <p key={i}>{task.label}<span>     x</span></p>
			})}
			<button
				onClick={()=>addTask({label: "eat", done: false})}
				className="btn btn-primary"
			>
				Add
			</button>
		</div>
	);
};

export default Home;
