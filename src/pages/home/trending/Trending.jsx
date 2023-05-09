import { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"
// components
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import Carousel from "../../../components/carousel/Carousel";

import useFetch from "../../../hooks/useFetch";

const Trending = () => {
    const [endPoint, setEndPoint] = useState("day");

    // https://developers.themoviedb.org/3/trending/get-trending
    const { data, loading } = useFetch(`/trending/movie/${endPoint}`);

    const onTabChange = (tab) => {
        setEndPoint(tab === "Day" ? "day" : "week")
    }

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Trending</span>
                <SwitchTabs data={[ "Day", "Week" ]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} endPoint={endPoint} />
        </div>
    )
}

export default Trending;
