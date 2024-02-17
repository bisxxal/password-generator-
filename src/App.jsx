import React, { useRef } from "react";
import { useCallback ,useEffect} from "react";
import { useState } from "react";
 
function App() {

const passwordRef = useRef(null)


  const [length, setLength] = useState(8);
const [numbAllowed, setNumAllowed] = useState(false);
const [password, setPassword] = useState('');
const [charAllowed, setCharAllowed] = useState(false);

const passwordGenerator = useCallback(() => {
  let pass = "";
  let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
  if (numbAllowed) str += "0123456789";
  if (charAllowed) str += "!@#$%^&*<{}[]||>?";

  for (let i = 1; i <= length; i++) {
    let char = Math.floor(Math.random() * str.length+1);
    pass += str.charAt(char);
  }
  setPassword(pass);
}, [length, numbAllowed, charAllowed,setPassword]);

const copyPasswordToClip = useCallback(()=>{
  passwordRef.current?.select();
  // passwordRef.current.setSelectionRange(0,20) ; // for selctition Range
  window.navigator.clipboard.writeText(password);
},[password])
useEffect(() => {
  passwordGenerator();
}, [length, numbAllowed, charAllowed, passwordGenerator]);

  return (
    
    <div className="flex items-center flex-col text-white bg-zinc-900 h-[100vh]  w-full">
      <h1 className="m-6 text-center caret-violet-700 font-bold  ">
        {" "}
        Password generator {" "}
      </h1>
      <div className= "pb-5 px-6 flex flex-col gap-12   w-[60%] rounded-2xl  bg-gray-700">
   <div className="flex justify-between  items-center "> <input placeholder="password" readOnly value={password} ref={passwordRef} type="text" className="px-7 h-[6vh] text-red-600 rounded-xl mt-4 w-[48vw] " />
      <button onClick={copyPasswordToClip} className="bg-[#5050e3]   h-[6vh] rounded-xl mt-auto px-11">copy</button></div>
<div className="flex ">
  <input type="range" name="" min={8} max={100} value={length} onChange={(e)=>{setLength(e.target.value)}} id="" className="mx-6"/> <label>length: {length}</label>
  <input type="checkbox" name="" defaultValue={numbAllowed} onChange={()=>{setNumAllowed((prev)=>!prev)}} id="numberInput" className="ml-6"/> <label   htmlFor="numberInpt">Number</label>
  <input type="checkbox" name="" defaultValue={charAllowed} onChange={()=>{setCharAllowed((prev)=>!prev)}} id="charterINput"className="ml-6" /> <label className="mr-6" htmlFor="charterINput">Charater</label>
</div>
      </div>
    </div>
  );
}

export default App;
