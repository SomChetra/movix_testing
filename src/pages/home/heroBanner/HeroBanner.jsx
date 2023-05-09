import { useEffect, useState } from 'react';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useFetch from '../../../hooks/useFetch';
// components
import LazyLoadImg from '../../../components/lazyLoadImage/LazyLoadImg';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

const HeroBanner = () => {
    const [backgroud, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home);
    
    // FetchAPI upcoming movie
    const { data, loading } = useFetch("/movie/upcoming")

    // Random Background Image:
    useEffect(() => {
        // ( base_URL + FilePath )
        const randomBG = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path; // ID FilePath
        setBackground(randomBG)
    }, [data, url.backdrop]);

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`)
        }
    }

    return (
        <div className='heroBanner'>
            {/* Background image */}
            {!loading && <div className='backdrop-img'>
                <LazyLoadImg src={backgroud} />
            </div> }

            <div className='opacity-layer'></div>

            <ContentWrapper>
                <div className="wrapper">
                    <div className="heroBannerContent">
                        <span className="title">Welcome.</span>
                        <span className='subTitle'>
                            Millions of movies, TV shows and people to discover.
                            Explore now.
                        </span>
                        <div className="searchInput">
                            <input 
                                type="text" 
                                name="search" 
                                id="search" 
                                placeholder='Search for a movie or tv show...'
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyUp={searchQueryHandler}
                            />
                            <button>Search</button>
                        </div>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    )
}

export default HeroBanner
