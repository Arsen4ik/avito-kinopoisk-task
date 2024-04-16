import { Input, Pagination, Button, Select, SelectItem, Slider } from "@nextui-org/react";
import axios from "axios";
import { useEffect } from "react";
import { useAllMoviesStore } from "../../store/allMoviesStore";
import { useLocation, useNavigate } from "react-router-dom";


// import { debounce } from 'lodash';

const AllMoviesFilters = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const allMoviesStore = useAllMoviesStore()

    const getMoviesWithNewQuery = async (newPage: number, newLimit: number, newRatingRange: [string, string], newYear: string[], newCountry: string, newQuery: string) => {
        try {
            const addUrlParams = new URLSearchParams();
            addUrlParams.append('ageRating', `${newRatingRange[0].toString()}-${newRatingRange[1].toString()}`)
            if (newYear?.length) newYear.forEach(year => addUrlParams.append('year', year))
            if (newCountry) addUrlParams.append('premiere.country', newCountry)
            if (newQuery) addUrlParams.append('query', newQuery)
            // if (newReleaseYearsStart) addUrlParams.append('releaseYears.start', newReleaseYearsStart)
            // if (newReleaseYearsEnd) addUrlParams.append('releaseYears.end', newReleaseYearsEnd)

            const queryString = addUrlParams.toString();
            // console.log(queryString);

            const res = await axios.get(`https://api.kinopoisk.dev/v1.4/movie${newQuery ? '/search' : ''}?page=${newPage.toString()}&limit=${newLimit ? newLimit.toString() : '10'}${queryString ? '&' + queryString : ''}`, {
                headers: {
                    'X-API-KEY': process.env.REACT_APP_TOKEN
                }
            })
            console.log(res);
            allMoviesStore.changeMovies(res.data.docs)
        } catch (e) {
            console.error('error from API!!!: ', e);
        }
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);

        const newPage = +(urlParams.get('page')!) || 1
        const newLimit = +(urlParams.get('limit')!) || 0

        const newYear = urlParams.getAll('year')
        const newCountry = urlParams.get('premiere.country') || ''
        const newRating = urlParams.get('ageRating')?.split('-').map(Number) as [number, number] || [12, 18]

        const newQuery = urlParams.get('query') || ''
        // console.log(newRating);

        // const newReleaseYearsStart = urlParams.get('releaseYears.start') || undefined
        // const newReleaseYearsEnd = urlParams.get('releaseYears.end') || undefined
        // console.log(newYear, newReleaseYearsStart, newReleaseYearsEnd);

        if (allMoviesStore.page !== newPage) allMoviesStore.changePage(newPage)
        if (allMoviesStore.limit !== newLimit) allMoviesStore.changeLimit(newLimit)

        if (allMoviesStore.year.length !== newYear.length) allMoviesStore.changeYear(newYear)
        if (allMoviesStore.country !== newCountry) allMoviesStore.changeCountry(newCountry)
        if (allMoviesStore.rating[0] !== newRating[0] || allMoviesStore.rating[1] !== newRating[1]) allMoviesStore.changeRatingRange(newRating)

        if (allMoviesStore.query !== newQuery) allMoviesStore.changeQuery(newQuery)
        // if (allMoviesStore["releaseYears.start"] !== newReleaseYearsStart) allMoviesStore.changeReleaseYearsStart(newReleaseYearsStart || '')
        // if (allMoviesStore["releaseYears.end"] !== newReleaseYearsEnd) allMoviesStore.changeReleaseYearsEnd(newReleaseYearsEnd || '')

        // getMoviesWithNewQuery(newPage, newLimit, newYear, newReleaseYearsStart, newReleaseYearsEnd)
        // debounce(() => getMoviesWithNewQuery(newPage, newLimit, newYear), 1000)
        getMoviesWithNewQuery(newPage, newLimit, newRating.map(String) as [string, string], newYear, newCountry, newQuery)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.search]);

    const changeURLQuery = (newLimit: number, newPage: number, newRatingRange: [number, number], newYear: string[], newCountry: string, newQuery: string) => {
        const urlParams = new URLSearchParams();
        urlParams.append('page', newPage ? newPage.toString() : '1');
        urlParams.append('limit', newLimit ? newLimit.toString() : '0');

        if (newYear?.length) newYear.forEach(year => urlParams.append('year', year))
        if (newCountry) urlParams.append('premiere.country', newCountry || '')
        urlParams.append('ageRating', `${newRatingRange[0].toString()}-${newRatingRange[1].toString()}`)

        if (newQuery) urlParams.append('query', newQuery)
        // if (newReleaseYearsStart) urlParams.append('releaseYears.start', newReleaseYearsStart)
        // if (newReleaseYearsEnd) urlParams.append('releaseYears.end', newReleaseYearsEnd)

        const queryString = urlParams.toString();
        // const newUrl = 'http://localhost:7070/movie?' + queryString;
        // window.location.replace(newUrl);
        console.log(newQuery, allMoviesStore.query);

        if (newQuery) {
            navigate('/movie/search?' + queryString)
        } else {
            navigate('/movie?' + queryString)
        }
    }
    // console.log(process.env.REACT_APP_VAR);


    return (
        <section>
            <div className="container sm:px-6 md:px-0">
                <h1 className="text-black-primary sm:text-4xl md:text-6xl my-12">Поиск у <span className="text-blue-primary font-bold">Кинопоиска</span></h1>
                <div className="flex flex-col gap-12">
                    <div className="flex flex-row gap-12">
                        <div className="flex flex-col gap-5 w-full">
                            <p className="text-small text-default-500">Поиск по названию фильма</p>
                            <Input
                                className="sm:w-full md:w-1/2"
                                type="text"
                                placeholder="введите название"
                                labelPlacement="outside"
                                value={allMoviesStore.query}
                                onValueChange={(newQuery) => changeURLQuery(allMoviesStore.limit, allMoviesStore.page, allMoviesStore.rating, allMoviesStore.year, allMoviesStore.country, newQuery)}
                                startContent={
                                    // <img alt="search" src="./search.svg" className="text-2xl text-default-400 pointer-events-none flex-shrink-0 w-4 h-4" />
                                    <svg className="text-2xl text-default-400 pointer-events-none flex-shrink-0 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <defs>
                                            <clipPath id="clip94_3">
                                                <rect id="svg" width="24.000000" height="24.000000" fill="white" fillOpacity="0" />
                                            </clipPath>
                                        </defs>
                                        <g clipPath="url(#clip94_3)">
                                            <path id="path" d="M18 10.5C18 14.64 14.64 18 10.5 18C6.35 18 3 14.64 3 10.5C3 6.35 6.35 3 10.5 3C14.64 3 18 6.35 18 10.5ZM15.11 16.51L15.08 16.51C14.69 16.12 14.69 15.5 15.08 15.1C15.48 14.7 16.1 14.7 16.5 15.1L16.5 15.13L15.11 16.51ZM21.67 20.29L21.7 20.29C22.1 20.68 22.1 21.3 21.7 21.7C21.31 22.1 20.69 22.1 20.29 21.7L20.29 21.67L21.67 20.29Z" fill="#000000" fillOpacity="0" fillRule="nonzero" />
                                            <path id="path" d="M15.79 15.81L21 21M10.5 18C6.35 18 3 14.64 3 10.5C3 6.35 6.35 3 10.5 3C14.64 3 18 6.35 18 10.5C18 14.64 14.64 18 10.5 18Z" stroke="#A8A29E" strokeOpacity="1.000000" strokeWidth="2.000000" strokeLinejoin="round" strokeLinecap="round" />
                                        </g>
                                    </svg>
                                }
                            />
                        </div>
                    </div>
                    <div className="flex flex-row gap-12 items-center sm:flex-wrap lg:flex-nowrap">
                        <Select
                            label="Фильмы каких лет ищите:"
                            placeholder="Выберите год/годы"
                            selectionMode="multiple"
                            className="sm:w-full md:w-1/3 xl:w-1/4"
                            selectedKeys={allMoviesStore.year}
                            value={allMoviesStore.year}
                            onSelectionChange={(newYear) => changeURLQuery(allMoviesStore.limit, allMoviesStore.page, allMoviesStore.rating, Array.from(newYear as string), allMoviesStore.country, allMoviesStore.query)}
                        // defaultSelectedKeys={['2024']}
                        >
                            {new Array(new Date().getFullYear() - 1949).fill(true).map((_, ind) => ({ label: (ind + 1950).toString(), value: (ind + 1950).toString(), description: "" })).reverse().map((year) => (
                                <SelectItem key={year.value} value={year.value}>
                                    {year.label}
                                </SelectItem>
                            ))}
                        </Select>
                        <Input className="md:w-1/3 xl:w-1/4" label="В какой стране снят фильм:" value={allMoviesStore.country} onValueChange={(newCountry: string) => changeURLQuery(allMoviesStore.limit!, allMoviesStore.page, allMoviesStore.rating, allMoviesStore.year, newCountry, allMoviesStore.query)} />
                        <Slider
                            label="возрастной рейтинг"
                            step={1}
                            size="lg"
                            minValue={0}
                            showSteps={true}
                            maxValue={18}
                            value={allMoviesStore.rating}
                            defaultValue={[12, 18]}
                            onChange={(newRatingRange) => changeURLQuery(allMoviesStore.limit, allMoviesStore.page, newRatingRange as [number, number], allMoviesStore.year, allMoviesStore.country, allMoviesStore.query)}
                            // formatOptions={{ style: "currency", currency: "USD" }}
                            className="sm:w-full md:w-2/4"
                        />
                    </div>
                    {/* <Input className="w-1/4" label="Какой рейтинг у фильма?" /> */}
                    {/* <Select
                            label="От"
                            placeholder="начало диапозона поиска"
                            className="max-w-xs"
                            selectedKeys={allMoviesStore["releaseYears.start"] ? [allMoviesStore["releaseYears.start"]] : ''}
                            onSelectionChange={(newReleaseYearsStart) => changeURLQuery(allMoviesStore.limit, allMoviesStore.page, allMoviesStore.year, Array.from(newReleaseYearsStart as string)[0])}
                        >
                            {new Array(new Date().getFullYear() - 1949).fill(true).map((_, ind) => ({ label: (ind + 1950).toString(), value: (ind + 1950).toString(), description: "" })).reverse().map((year) => (
                                <SelectItem key={year.value} value={year.value}>
                                    {year.label}
                                </SelectItem>
                            ))}
                        </Select>
                        <Select
                            label="До"
                            placeholder="конец диапозона поиска"
                            className="max-w-xs"
                            selectedKeys={allMoviesStore["releaseYears.end"] ? [allMoviesStore["releaseYears.end"]] : ''}
                            onSelectionChange={(newReleaseYearsEnd) => changeURLQuery(allMoviesStore.limit, allMoviesStore.page, allMoviesStore.year, allMoviesStore["releaseYears.start"], Array.from(newReleaseYearsEnd as string)[0])}
                        >
                            {new Array(new Date().getFullYear() - 1949).fill(true).map((_, ind) => ({ label: (ind + 1950).toString(), value: (ind + 1950).toString(), description: "" })).reverse().map((year) => (
                                <SelectItem key={year.value} value={year.value}>
                                    {year.label}
                                </SelectItem>
                            ))}
                        </Select> */}
                    {/* </div> */}
                    <div className="flex gap-12 sm:flex-col-reverse md:flex-row">
                        <div className="flex flex-col gap-5 md:w-1/2 lg:w-1/3 xl:w-1/4">
                            <p className="text-small text-default-500">Номер страницы: {allMoviesStore.page}</p>
                            <Pagination
                                total={10}
                                color="primary"
                                page={allMoviesStore.page}
                                onChange={(newPage: number) => changeURLQuery(allMoviesStore.limit, newPage, allMoviesStore.rating, allMoviesStore.year, allMoviesStore.country, allMoviesStore.query)}
                            />
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    variant="flat"
                                    color="primary"
                                    onPress={() => changeURLQuery(allMoviesStore.limit, allMoviesStore.page > 1 ? allMoviesStore.page - 1 : allMoviesStore.page, allMoviesStore.rating, allMoviesStore.year, allMoviesStore.country, allMoviesStore.query)}
                                >
                                    назад
                                </Button>
                                <Button
                                    size="sm"
                                    variant="flat"
                                    color="primary"
                                    onPress={() => changeURLQuery(allMoviesStore.limit, allMoviesStore.page < 10 ? allMoviesStore.page + 1 : allMoviesStore.page, allMoviesStore.rating, allMoviesStore.year, allMoviesStore.country, allMoviesStore.query)}
                                >
                                    далее
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5 sm:w-full md:w-1/3 w-1/4">
                            <p className="text-small text-default-500">Кол-во фильмов на странице: {allMoviesStore.limit || 10}</p>
                            <Input
                                type="text"
                                placeholder="введите лимит"
                                labelPlacement="outside"
                                value={allMoviesStore.limit ? allMoviesStore.limit.toString() : ''}
                                onValueChange={(newLimit: string) => changeURLQuery(+newLimit, allMoviesStore.page, allMoviesStore.rating, allMoviesStore.year, allMoviesStore.country, allMoviesStore.query)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AllMoviesFilters;