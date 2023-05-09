import { useRef } from "react"
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill,} from "react-icons/bs"; // icons
import { useNavigate } from "react-router-dom"; // react-router
import { useSelector } from "react-redux"; // react-redux
import dayjs from "dayjs"; // dayjs
import PosterFallback from '../../assets/no-poster.png'; // poster-image
// components
import ContentWrapper from "../contentWrapper/ContentWrapper"; // wrapper style
import  LazyLoadImg from '../lazyLoadImage/LazyLoadImg';
import CircleRating from "../circleRating/CircleRating";
import Genre from "../genre/Genre";

import "./style.scss"

const Carousel = ({ data, loading, endPoint, title }) => {
    const carouselContainer = useRef();
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();

    // navigation next - prev
    const navigation = (dir) => {
        const container = carouselContainer.current;

        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    }

    // Loading Skeleton
    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        );
    };

    return (
        <div className="carousel">
            <ContentWrapper>
                {title && <div className="carouselTitle">{title}</div>}
                
                {/* Left-arrow */}
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />

                {/* Right-arrow */}
                <BsFillArrowRightCircleFill 
                    className="carouselRighttNav arrow"
                    onClick={() => navigation("right")}
                />

                {/*  */}
                {!loading ? (
                    <div 
                        className="carouselItems"
                        ref={carouselContainer}
                    >
                        {data?.map((item) => {

                            {/* console.log(item) */}

                            const posterUrl = item.poster_path
                                ? url.poster + item.poster_path
                                : PosterFallback;
                            return (
                                <div 
                                    key={item.id} 
                                    className="carouselItem" 
                                    onClick={() => navigate(`${item.media_type || endPoint }/${item.id}`)}
                                >
                                    {/* poster */}
                                    <div className="posterBlock" 
                                        // style={{ backgroundImage: `url(${posterUrl})` }}
                                    >
                                        <img src={posterUrl} alt="poster_url" className="lazy-load-image-background" />

                                        <CircleRating rating={item.vote_average.toFixed(1)} />

                                        <Genre data={item.genre_ids.slice(0,2)} />
                                    </div>
                                    {/* text */}
                                    <div className="textBlock">
                                        <span className="title">
                                            {item.title || item.name}
                                        </span>
                                        <span className="date">
                                            {dayjs(item.release_Date).format(
                                                "MMM D, YYYY"
                                            )}
                                        </span>
                                    </div>

                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="loadingSkeleton">
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>
                )}

            </ContentWrapper>
        </div>
    )
}

export default Carousel
