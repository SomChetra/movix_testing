import { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"
// components
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import Carousel from "../../../components/carousel/Carousel";

import useFetch from "../../../hooks/useFetch";

const Popular = () => {
    const [endPoint, setEndPoint] = useState("movie");

    // https://developers.themoviedb.org/3/tv/get-popular-tv-shows
    const { data, loading } = useFetch(`/${endPoint}/popular`);

    const onTabChange = (tab) => {
        setEndPoint(tab === "Movies" ? "movie" : "tv")
    }

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">What's Popular</span>
                <SwitchTabs data={[ "Movies", "TV Shows" ]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} />
        </div>
    )
}

export default Popular
