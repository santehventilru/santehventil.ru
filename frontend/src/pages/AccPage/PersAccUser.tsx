import {  useLazyGetUserInfoQuery } from "@toolkit/api/userApi";
import { useSelector } from "react-redux";
import {RootState } from "@toolkit/store/store";
import { useEffect } from "react";
import PageLoading from "@shared/components/PageLoading";
import PersAccRender from "./PersAccRender";
import ErrorMessage from "@shared/ui/ErrorMessage";


export default function PersAccUser() {


    const isAuthenticated = useSelector((st: RootState) => st.autoriseSlice.autorisStatus);
    const [fetchUser, {data,  isSuccess, isLoading, isError }] = useLazyGetUserInfoQuery();

    useEffect(() => {
        isAuthenticated && fetchUser('user')

    }, [isAuthenticated]);

    return (
        <section id="PersonalAccount" key={isAuthenticated}>
            {isError && <ErrorMessage/>}
            {isLoading && <PageLoading />}
            {isSuccess && data &&  <PersAccRender data={data}/>}
            
        </section>
    );
}