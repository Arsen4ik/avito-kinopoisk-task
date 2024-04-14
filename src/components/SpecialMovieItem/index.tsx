import { Progress } from "@nextui-org/react";
import EmblaCarousel from './EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel'
// import { UseEmblaCarouselType } from "embla-carousel-react";
import './css/base.css'
import './css/embla.css'
import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SpecialMovieItem: FC = () => {
    const { movie } = useLocation().state
    const navigate = useNavigate()
    // const OPTIONS: UseEmblaCarouselType = { loop: true }
    const OPTIONS: EmblaOptionsType = { loop: true }
    const SLIDE_COUNT = 5
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
    return (
        <section className="relative py-12">
            <div className="container flex flex-col gap-12">
                {/* <p onClick={() => navigate(-1)}>back</p> */}
                <div className="flex flex-row justify-between items-center">
                    <img onClick={() => navigate(-1)} className="h-16 w-16" src="/arrow-back.svg" alt="" />
                    <p className="text-6xl font-bold text-black-primary">{movie.name}</p>
                </div>
                <div className="flex flex-col gap-8 text-2xl">
                    <p className="text-2xl">{movie.description}</p>
                    <p className="text-3xl font-bold">Рейтинги:</p>
                    {!!movie.rating.kp &&
                        <div>
                            <p>kp</p>
                            <Progress size="md" aria-label="rating" value={movie.rating.kp * 10} />
                        </div>
                    }
                    {!!movie.rating.imdb &&
                        <div>
                            <p>imdb</p>
                            <Progress size="md" aria-label="rating" value={movie.rating.imdb * 10} />
                        </div>
                    }
                    {!!movie.rating.filmCritics &&
                        <div>
                            <p>filmCritics</p>
                            <Progress size="md" aria-label="rating" value={movie.rating.filmCritics * 10} />
                        </div>
                    }
                    {!!movie.rating.russianFilmCritics &&
                        <div>
                            <p>russianFilmCritics</p>
                            <Progress size="md" aria-label="rating" value={movie.rating.russianFilmCritics} />
                        </div>
                    }
                    <EmblaCarousel slides={SLIDES} options={OPTIONS} />
                </div>
            </div>
        </section>
    );
}

export default SpecialMovieItem;