import { useCallback, useEffect, useRef, useState } from "react"

function App() {
  const [length, setLength] = useState(12)
  const [upperAllowed, setUpperAllowed] = useState(true)
  const [lowerAllowed, setLowerAllowed] = useState(true)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = ""
    
    if (upperAllowed) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (lowerAllowed) str += "abcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "~!@#$%^&*()_+=-[]{}'?><"

    if (str.length === 0) {
        setPassword("")
        return
    }

    for (let i = 0; i < length; i++) {
      const charIndex = Math.floor(Math.random() * str.length)
      pass += str.charAt(charIndex)
    }
    setPassword(pass)
  }, [length, upperAllowed, lowerAllowed, numberAllowed, charAllowed])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, upperAllowed, lowerAllowed, numberAllowed, charAllowed, passwordGenerator])

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f5f6f7]">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
        
        <div className="bg-[#4267B2] py-6 px-4 text-white text-center text-2xl font-bold">
            Password Generator
        </div>

        <div className="p-8">
          <div className="flex shadow-sm rounded-lg overflow-hidden mb-8 border border-gray-200 focus-within:ring-[#4267B2]/20">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-4 px-5 text-gray-800 text-xl font-mono,bg-white"
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyPasswordToClipboard}
              className="bg-[#4267B2] text-white px-8 py-4 font-bold shrink-0 hover:bg-[#365899] active:bg-[#2d4373] transition-colors"
            >
              Copy
            </button>
          </div>

          <div className="flex flex-col gap-6 text-[#4b4f56]">
            
            <div className="flex items-center gap-x-4">
              <input
                type="range"
                min={6}
                max={20}
                value={length}
                className="cursor-pointer w-full accent-[#4267B2]"
                onChange={(e) => setLength(Number(e.target.value))}
              />
              <label className="font-bold min-w-[100px]">Length: {length}</label>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center gap-x-2 font-semibold cursor-pointer">
                    <input
                        type="checkbox"
                        checked={upperAllowed}
                        className="w-5 h-5 accent-[#4267B2]"
                        onChange={() => setUpperAllowed((prev) => !prev)}
                    />
                    Uppercase
                </label>

                <label className="flex items-center gap-x-2 font-semibold cursor-pointer">
                    <input
                        type="checkbox"
                        checked={lowerAllowed}
                        className="w-5 h-5 accent-[#4267B2]"
                        onChange={() => setLowerAllowed((prev) => !prev)}
                    />
                    Lowercase
                </label>

                <label className="flex items-center gap-x-2 font-semibold cursor-pointer">
                    <input
                        type="checkbox"
                        checked={numberAllowed}
                        className="w-5 h-5 accent-[#4267B2]"
                        onChange={() => setNumberAllowed((prev) => !prev)}
                    />
                    Numbers
                </label>

                <label className="flex items-center gap-x-2 font-semibold cursor-pointer">
                    <input
                        type="checkbox"
                        checked={charAllowed}
                        className="w-5 h-5 accent-[#4267B2]"
                        onChange={() => setCharAllowed((prev) => !prev)}
                    />
                    Characters
                </label>
            </div>
            <button 
  onClick={passwordGenerator}
  className="mt-4 w-full bg-gray-100 text-[#4267B2] py-3 rounded-lg font-bold border border-gray-200 transition-all active:bg-[#4267B2] active:text-white"
>
  Regenerate Password
</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App



