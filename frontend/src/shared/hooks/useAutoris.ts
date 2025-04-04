// import { setChange } from "../../../redux_tollkit/slices/logRegSlice/autorisSlice";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "redux_tollkit/store/store";

// export default function useAutoris({newStatus}:{newStatus:boolean}){

//     const dispatch = useDispatch<AppDispatch>()
//     const autoriseStatus = useSelector((state:RootState) => state.autorisStatus)
//     const eventStatus = useSelector((state:RootState) => state.changeEvent)
    
//     useEffect(() => {
//         if(eventStatus){
//             dispatch(setChange())
//         }
//     },[eventStatus])
// }
// postupaet suda evenStatus,  a naxuya ? esli mogno prosto hranit v store status autoris?? 