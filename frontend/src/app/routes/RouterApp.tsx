import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import Routes from "./Routes";
import PageLoading from "@shared/components/PageLoading";



export default function RouterApp(){
    return <Suspense fallback={<PageLoading/>}>{useRoutes(Routes)}</Suspense>
}