import { useParams } from 'react-router-dom'

import useFetch from '../../hooks/useFetch';
// components
import DetailsBanner from './detailsBanner/DetailsBanner';
// pages
import Cast from './cast/Cast';
import VideoSection from './videoSection/VideoSection';
import Similar from './carousel/Similar';
import Recommendation from './carousel/Recommendation';

import './style.scss'

const Details = () => {
    const { mediaType, id } = useParams();

    // GET /movie/{movie_id} = get details movie videos
    const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);

    // GET details credit
    const { data: credits, loading: creditsLoading } = useFetch(`/${mediaType}/${id}/credits`);

    // console.log(credits);

    return (
        <div>
            <DetailsBanner
                video={data?.results?.[0]}
                crew={credits?.crew}
            />
            <Cast data={credits?.cast} loading={creditsLoading} />
            <VideoSection data={data} loading={loading} />
            <Similar mediaType={mediaType} id={id} />
            <Recommendation mediaType={mediaType} id={id} />
        </div>
    )
}

export default Details
