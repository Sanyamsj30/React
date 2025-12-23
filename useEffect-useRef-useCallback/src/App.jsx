import { useRef, useEffect, useState } from 'react'
import { useCallback } from 'react';

function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (characterAllowed) {
      str += "!@#$%^&*()_+";
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  } ,[length, numberAllowed, characterAllowed,setPassword] );

const copyPasswordToClipboard = useCallback(() => {
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0, 9999); // For mobile devices
  window.navigator.clipboard.writeText(password);
},[password])

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed, passwordGenerator]);

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-900'>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly 
          ref={passwordRef} />
          <button 
          onClick={copyPasswordToClipboard}>copy</button>
        </div>
        <div>
          <div>
            <input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e) => setLength(e.target.value)}/>
            <label htmlFor="length">Length: {length}</label>
          </div>
          <div>
            <input type="checkbox" id="number" checked={numberAllowed} onChange={() => {setNumberAllowed((prev) => !prev);
            }} 
            />
            <label htmlFor="number">Include Numbers</label>
          </div>
          <div>
            <input type="checkbox" id="character" checked={characterAllowed} onChange={() => {setCharacterAllowed((prev) => !prev);
            }} 
            />
            <label htmlFor="characters">Include Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
