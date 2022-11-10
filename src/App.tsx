import React, { useState } from 'react';
import '@/App.css'
import { Input } from 'antd';

function App() {

  const [count,setCount] = useState('')
  const onChange = (e:any) =>{
    setCount(e.target.value)
  }

  return (
    <div className="App">
      <header className="App-header">
        
        <h2>webpack1111</h2>
        <h2>webpack1111</h2>

        <Input value = {count} onChange = {onChange}/>
        <h2>非受控组件</h2>
        <Input type= "te"/>
      </header>
    </div>
  );
}

export default App;
