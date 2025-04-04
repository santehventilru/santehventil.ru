// import { useGetUserInfoQuery } from "@reduxApi/userApi"
// import { useEffect, useState } from "react"
// import Api from "../../api/apiService"
// import { toast } from "react-toastify"


// export default function AdminUserMain(){
//     const {data:userData = [], isSuccess} = useGetUserInfoQuery('alluser')

//     const [newPassword, setNewPassword] = useState("");

//     const handleInputChange = (e) => {
//         setNewPassword(e.target.value);
//     };

//     const changePas = async (userID) => {

//         await Api.put(`/api/user/password/${userID}`, {id:userID, new_pass:newPassword})
//         .then((res) => {
//             res && toast.success("Смена успеша")
//         }).catch((err) => {
//             console.error(err)
//             toast.error('Ошибка')
//         })
//     }

//     useEffect(() => {
//         console.log(userData)
//     },[userData])
//     return(
//         <div>
//             новый пароль
//             <input type="text" onChange={handleInputChange}/>
//             {isSuccess && userData.map(user => user.role !== 'admin' && (
//                 <div>
//                     <div>
//                         Login:{user.login}
//                     </div>
//                     <div>
//                         Email:{user.email}
//                     </div>
//                     <div>
//                         Phone:{user.phone}
//                     </div>
                    
//                     <button onClick={() => {changePas(user.id)}}>Change password</button>
//                 </div>
//             ))}
//         </div>
//     )
// }