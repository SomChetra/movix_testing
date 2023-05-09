import { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"
// components
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import Carousel from "../../../components/carousel/Carousel";

import useFetch from "../../../hooks/useFetch";

const TopRated = () => {
    const [endPoint, setEndPoint] = useState("movie");

    // https://developers.themoviedb.org/3/movies/get-top-rated-movies
    const { data, loading } = useFetch(`/${endPoint}/top_rated`);

    const onTabChange = (tab) => {
        setEndPoint(tab === "Movies" ? "movie" : "tv")
    }

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Top Rated</span>
                <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} endPoint={endPoint} />
        </div>
    )
}

export default TopRated;
