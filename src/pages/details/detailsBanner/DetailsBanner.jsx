import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genre/Genre";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImage/LazyLoadImg";
import PosterFallback from "../../../assets/no-poster.png";
import PlayBtn from "../PlayBtn";
import VideoPopup from "../../../components/videoPopUp/VideoPopup";

const DetailsBanner = ({ video, crew }) => {
    // video popup
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`);

    const { url } = useSelector((state) => state.home);

    // _genres object
    const _genres = data?.genres?.map((g) => g.id);

    // រកតួនាទី - director && writer
    const director = crew?.filter((f) => f.job === "Director");
    const writer = crew?.filter((f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer");

    // console.log(url.backdrop + data?.backdrop_path);

    // convert number to Hour&Minute = 134 = 2h14m
    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                    {!!data && (
                        <React.Fragment>
                                <div className="backdrop-img">
                                    <Img src={url.backdrop + data?.backdrop_path} />
                                </div>

                                <div className="opacity-layer"></div>

                                <ContentWrapper>
                                    <div className="content">
                                        {/* Image */}
                                        <div className="left">
                                            {data.poster_path ? (
                                                <Img 
                                                    className="posterImg"
                                                    src={url.backdrop + data.poster_path}
                                                />
                                            ) : (
                                                <Img 
                                                    className="posterImg"
                                                    src={PosterFallback} // Not Found
                                                />
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="right">
                                            {/* Title + Dayjs */}
                                            <div className="title">
                                                {`${data.name || data.title} (${dayjs(data?.release_date).format("YYYY")})`}
                                            </div>
                                            
                                            {/* subTitle - tagLine */}
                                            <div className="subtitle">
                                                {data.tagline}
                                            </div>

                                            {/* Genres */}
                                            <Genres data={_genres} />

                                            {/* CircleRating && Watch Trailer button */}
                                            <div className="row">
                                                <CircleRating rating={data.vote_average.toFixed(1)} />

                                                {/* Play-button */}
                                                <div className="playbtn"
                                                    onClick={() => {
                                                        setShow(true)
                                                        setVideoId(video.key)
                                                    }}
                                                >
                                                    <PlayBtn />
                                                    <span className="text">Watch Trailer</span>
                                                </div>
                                            </div>

                                            {/* Overview text */}
                                            <div className="overview">
                                                <div className="heading">Overview</div>
                                                <div className="description">{data.overview}</div>
                                            </div>

                                            {/* Info */}
                                            <div className="info">
                                                {/* info-status */}
                                                {data.status && (
                                                    <div className="infoItem">
                                                        <span className="text bold">Status: {" "}</span>
                                                        <span className="text">{data.status}</span>
                                                    </div>
                                                )}

                                                {/* info-release_data */}
                                                {data.release_date && (
                                                    <div className="infoItem">
                                                        <span className="text bold">
                                                            Release Date:{" "}
                                                        </span>
                                                        <span className="text">
                                                            {dayjs(
                                                                data.release_date
                                                            ).format("MMM D, YYYY")}
                                                        </span>
                                                    </div>
                                                )}

                                                {/* info-runtimes */}
                                                {data.runtime && (
                                                    <div className="infoItem">
                                                        <span className="text bold">
                                                            Runtime:{" "}
                                                        </span>
                                                        <span className="text">
                                                            {toHoursAndMinutes(
                                                                data.runtime
                                                            )}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* info-director - array */}
                                            {director?.length > 0 && (
                                                <div className="info">
                                                    <span className="text bold">Director: {" "}</span>
                                                    <span className="text">
                                                        {director?.map((d, i) => (
                                                            <span key={i}>
                                                                {d.name}
                                                                {director.length - 1 !== i && ", "}
                                                            </span>
                                                        ))}
                                                    </span>
                                                </div>
                                            )}

                                            {/* info-writer - array */}
                                            {writer?.length > 0 && (
                                                <div className="info">
                                                    <span className="text bold">
                                                        Writer:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {writer?.map((d, i) => (
                                                            <span key={i}>
                                                                {d.name}
                                                                {writer.length -
                                                                    1 !==
                                                                    i && ", "}
                                                            </span>
                                                        ))}
                                                    </span>
                                                </div>
                                            )}

                                        </div>
                                    </div>

                                    {/* Video-Popup */}
                                    <VideoPopup 
                                        show={show}
                                        setShow={setShow}
                                        videoId={videoId}
                                        setVideoId={setVideoId}
                                    />
                                </ContentWrapper>
                        </React.Fragment>
                    )}
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    )
}

export default DetailsBanner
