
import axios from "axios";
import { useState,useContext } from "react";
import { userContext } from "./userContext";
function Register() {
  const [username,setUserName] = useState();
  const [password,setPassword] = useState();
  const [userLogin,setUserLogin] = useState(false);
  const {setUsername,setId} = useContext(userContext);
  const userLoginMethods = ()=>{
    setUserLogin((prev)=>{
      return !prev
    })
  }
    async function uploadData(){
      const url = userLogin === true? '/register': '/login';
       const {data} = await axios.post(url,{username, password})
       setUsername(username);
       setId(data.id);
    }
  return (
    <section >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {userLogin === true?"Create":"Log In to"} your account
              </h1>
              <div className="space-y-4 md:space-y-6">
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
                      <input type="email"  id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required={true}
                        onChange={
                          (e)=>[
                            setUserName(e.target.value)
                          ]
                        }
                      />
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password"  id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true}
                       onChange={
                        (e)=>[
                          setPassword(e.target.value)
                        ]
                      }
                      />
                  </div>
                  
                  <button type="submit" className="w-full text-white bg-primary-600 hover:bg-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={uploadData}
                  >{userLogin === true?"Register":"Log In"}</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      {userLogin === true?"Already have an account":"Create an Account"}  <button  className="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={userLoginMethods}>{userLogin === true ? "Login" : "Sign Up"}</button>
                  </p>
              </div>
          </div>
      </div>
  </div>
</section>
  );
}

export default Register;
