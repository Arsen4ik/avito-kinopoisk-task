import { FC } from "react";
import AllMoviesFilters from "../../components/AllMoviesFilters";
import AllMoviesList from "../../components/AllMoviesList";

const AllMoviesPage: FC = () => {


    return (
        <>
            {/* <h1>all</h1>
            <p>{allMoviesStore.limit}</p>
            <p>{allMoviesStore.page}</p>
            <input type="text" value={allMoviesStore.limit} onChange={(e) => allMoviesStore.changeLimit(+e.currentTarget.value)} />
            <input type="text" value={allMoviesStore.limit} onChange={(e) => changeURLQuery(+e.currentTarget.value)} />

            <button>click</button>
            <pre>{JSON.stringify(allMoviesStore.movies, null, 4)}</pre> */}

            <AllMoviesFilters />
            <AllMoviesList />
        </>
    );
}

export default AllMoviesPage