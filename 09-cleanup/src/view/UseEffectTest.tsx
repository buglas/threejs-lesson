import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


const UseEffectTest: React.FC = (): JSX.Element => {
	const [count1, setCount1] = useState(0);  
	const [count2, setCount2] = useState(0); 

  useEffect(() => {  
    // 只具备componentDidMount 功能
    console.log('componentDidMount'); 
    return ()=>{
      // 只具备componentWillUnmount 功能
      console.log('componentWillUnmount');
    }
  },[]); 
  useEffect(() => {  
    // 具备componentDidMount、componentDidUpdate 功能，随所有State的更新而执行
    console.log('count1,count2',count1,count2);
  });
  useEffect(() => {  
    // 具备componentDidMount、componentDidUpdate 功能，随count1 的更新而执行
    console.log('count1',count1);
  },[count1]);  
  useEffect(() => {  
    // 具备componentDidMount、componentDidUpdate 功能，随count2 的更新而执行
    console.log('count2',count2);
  },[count2]);  

   
  
  return (  
    <div style={{margin:'15px'}}>  
      <p >
        <Link to="/">home</Link>
      </p>
      <p>You clicked {count1} times</p>  
      <button onClick={() => setCount1(count1 + 1)}>  
        count1
      </button>  
      <p>You clicked {count2} times</p>  
      <button onClick={() => setCount2(count2 + 1)}>  
        count2
      </button>  
      
    </div>  
  );  
}

export default UseEffectTest
