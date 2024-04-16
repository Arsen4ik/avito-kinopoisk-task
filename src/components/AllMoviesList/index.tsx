import { FC } from "react";
import { useAllMoviesStore } from "../../store/allMoviesStore";
import { CustomCard } from "./customCard";
import { Card, CardBody, CardHeader, Image, Spacer } from "@nextui-org/react";
import { Link, useLocation } from "react-router-dom";

const AllMoviesList: FC = () => {
    const allMoviesStore = useAllMoviesStore()
    const location = useLocation()

    return (
        <section className="py-12">
            <div className="container flex flex-col gap-12 sm:px-6 md:px-0">
                <p className="text-4xl text-black-primary">Фильмы по вашему запросу:</p>
                <div className="flex flex-row flex-wrap justify-center sm:gap-6 md:gap-12">
                    {
                        allMoviesStore.movies.length ? (
                            allMoviesStore.movies.map(movie =>
                                <Link key={movie.id} to={`/movie/${movie.id}`} state={{ movie, previousPathName: location.pathname + location.search }}>
                                    <Card className="py-4 max-w-[294px]">
                                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                            <p className="text-tiny uppercase font-bold">{movie.alternativeName}</p>
                                            <small className="text-default-500">{movie.year}</small>
                                            <h4 className="font-bold text-large">{movie.name}</h4>
                                        </CardHeader>
                                        <CardBody className="overflow-visible py-2">
                                            <Image
                                                alt="Card background"
                                                className="object-contain rounded-xl sm:object-cover sm:h-64 md:h-auto"
                                                src={movie.poster.url ?? '/empty-image.svg'}
                                                width={270}
                                            />
                                        </CardBody>
                                    </Card>
                                </Link>
                            )
                        ) : <div className="flex">
                            <CustomCard />
                            <Spacer x={4} />
                            <CustomCard />
                            <Spacer x={4} />
                            <CustomCard />
                        </div>
                    }
                </div>
            </div>
        </section>
    );
}

export default AllMoviesList;