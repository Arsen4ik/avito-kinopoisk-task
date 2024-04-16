import { Progress } from "@nextui-org/react";
import EmblaCarousel from './EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel'
// import { UseEmblaCarouselType } from "embla-carousel-react";
import './css/base.css'
import './css/embla.css'
import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SpecialMovieItem: FC = () => {
    const { movie } = useLocation()?.state || {}
    const navigate = useNavigate()
    // 
    // useEffect(() => {
    //     if (!movie?.name) {
    //         navigate('/');
    //     }
    // });
    // const OPTIONS: UseEmblaCarouselType = { loop: true }
    const OPTIONS: EmblaOptionsType = { loop: true }
    const SLIDE_COUNT = 5
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
    return (
        <section className="relative py-12">
            <div className="container flex flex-col gap-12 sm:px-6 md:px-0">
                {/* <p onClick={() => navigate(-1)}>back</p> */}
                <div className="flex flex-row justify-between items-center gap-12">
                    <img onClick={() => navigate(-1)} className="sm:h-12 sm:w-12 md:h-16 md:w-16 hover:cursor-pointer" src="/arrow-back.svg" alt="" />
                    <p className="sm:text-4xl md:text-6xl font-bold text-black-primary text-end">{movie?.name}</p>
                </div>
                <div className="flex flex-col gap-8 text-2xl">
                    <p className="text-2xl text-dark-gray-primary">{movie?.description}</p>
                    <p className="text-3xl font-bold">Рейтинги:</p>
                    {!!movie?.rating?.kp &&
                        <div>
                            <p>kp</p>
                            <Progress size="md" aria-label="rating" value={movie?.rating?.kp * 10} showValueLabel={true} formatOptions={{ style: "decimal" }} />
                        </div>
                    }
                    {!!movie?.rating?.imdb &&
                        <div>
                            <p>imdb</p>
                            <Progress size="md" aria-label="rating" value={movie?.rating?.imdb * 10} showValueLabel={true} formatOptions={{ style: "decimal" }} />
                        </div>
                    }
                    {!!movie?.rating?.filmCritics &&
                        <div>
                            <p>filmCritics</p>
                            <Progress size="md" aria-label="rating" value={movie?.rating?.filmCritics * 10} showValueLabel={true} formatOptions={{ style: "decimal" }} />
                        </div>
                    }
                    {!!movie?.rating?.russianFilmCritics &&
                        <div>
                            <p>russianFilmCritics</p>
                            <Progress size="md" aria-label="rating" value={movie?.rating?.russianFilmCritics} showValueLabel={true} formatOptions={{ style: "decimal" }} />
                        </div>
                    }

                    {/* <EmblaCarousel slides={SLIDES} options={OPTIONS} /> */}
                </div>
            </div>
        </section>
    );
}

export default SpecialMovieItem;