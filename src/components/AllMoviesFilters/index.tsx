import { Input, Pagination, Button, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { useEffect } from "react";
import { useAllMoviesStore } from "../../store/allMoviesStore";
import { useLocation, useNavigate } from "react-router-dom";

const AllMoviesFilters = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const allMoviesStore = useAllMoviesStore()

    const getMoviesWithNewQuery = async (newPage: number, newLimit: number, newYear?: string[], newReleaseYearsStart?: string, newReleaseYearsEnd?: string) => {
        try {
            const addUrlParams = new URLSearchParams();
            if (newYear?.length) newYear.forEach(year => addUrlParams.append('year', year))
            // if (newReleaseYearsStart) addUrlParams.append('releaseYears.start', newReleaseYearsStart)
            // if (newReleaseYearsEnd) addUrlParams.append('releaseYears.end', newReleaseYearsEnd)

            const queryString = addUrlParams.toString();
            // console.log(queryString);


            const res = await axios.get(`https://api.kinopoisk.dev/v1.4/movie?page=${newPage.toString()}&limit=${newLimit.toString()}${queryString ? '&' + queryString : ''}`, {
                headers: {
                    'X-API-KEY': 'your-api-key'
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
        const newLimit = +(urlParams.get('limit')!) || 10

        const newYear = urlParams.getAll('year')
        const newReleaseYearsStart = urlParams.get('releaseYears.start') || undefined
        const newReleaseYearsEnd = urlParams.get('releaseYears.end') || undefined
        // console.log(newYear, newReleaseYearsStart, newReleaseYearsEnd);

        if (allMoviesStore.page !== newPage) allMoviesStore.changePage(newPage)
        if (allMoviesStore.limit !== newLimit) allMoviesStore.changeLimit(newLimit)

        if (allMoviesStore.year.length !== newYear.length) allMoviesStore.changeYear(newYear)
        if (allMoviesStore["releaseYears.start"] !== newReleaseYearsStart) allMoviesStore.changeReleaseYearsStart(newReleaseYearsStart || '')
        if (allMoviesStore["releaseYears.end"] !== newReleaseYearsEnd) allMoviesStore.changeReleaseYearsEnd(newReleaseYearsEnd || '')

        getMoviesWithNewQuery(newPage, newLimit, newYear, newReleaseYearsStart, newReleaseYearsEnd)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.search]);

    const changeURLQuery = (newLimit: number, newPage: number, newYear?: string[], newReleaseYearsStart?: string, newReleaseYearsEnd?: string) => {
        const urlParams = new URLSearchParams();
        urlParams.append('page', newPage ? newPage.toString() : '1');
        urlParams.append('limit', newLimit ? newLimit.toString() : '10');

        if (newYear?.length) newYear.forEach(year => urlParams.append('year', year))
        if (newReleaseYearsStart) urlParams.append('releaseYears.start', newReleaseYearsStart)
        if (newReleaseYearsEnd) urlParams.append('releaseYears.end', newReleaseYearsEnd)

        const queryString = urlParams.toString();
        // const newUrl = 'http://localhost:7070/movie?' + queryString;
        // window.location.replace(newUrl);
        navigate('/movie?' + queryString)
    }

    return (
        <section>
            <div className="container">
                <h1 className="text-6xl text-black-primary my-12">Поиск у <span className="text-blue-primary">Кинопоиска</span></h1>
                <div className="flex flex-col gap-12">
                    <div className="flex flex-row gap-12">
                        <div className="flex flex-col gap-5 w-full">
                            <p className="text-small text-default-500">Поиск по названию фильма</p>
                            <Input
                                className="w-1/2"
                                type="text"
                                placeholder="введите название"
                                labelPlacement="outside"
                                startContent={
                                    <img alt="search" src="./search.svg" className="text-2xl text-default-400 pointer-events-none flex-shrink-0 w-4 h-4" />
                                }
                            />
                        </div>
                    </div>
                    <div className="flex flex-row gap-12">
                        <Select
                            label="Фильмы каких лет ищите?"
                            placeholder="Выберите год/годы"
                            selectionMode="multiple"
                            className="max-w-xs"
                            selectedKeys={allMoviesStore.year}
                            onSelectionChange={(newYear) => changeURLQuery(allMoviesStore.limit, allMoviesStore.page, Array.from(newYear as string))}
                        // defaultSelectedKeys={['2024']}
                        >
                            {new Array(new Date().getFullYear() - 1949).fill(true).map((_, ind) => ({ label: (ind + 1950).toString(), value: (ind + 1950).toString(), description: "" })).reverse().map((year) => (
                                <SelectItem key={year.value} value={year.value}>
                                    {year.label}
                                </SelectItem>
                            ))}
                        </Select>
                        <Select
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
                        </Select>
                    </div>
                    <div className="flex flex-row gap-12">
                        <div className="flex flex-col gap-5 w-1/4">
                            <p className="text-small text-default-500">Номер страницы: {allMoviesStore.page}</p>
                            <Pagination
                                total={10}
                                color="primary"
                                page={allMoviesStore.page}
                                onChange={(newPage: number) => changeURLQuery(allMoviesStore.limit, newPage)}
                            />
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    variant="flat"
                                    color="primary"
                                    onPress={() => changeURLQuery(allMoviesStore.limit, allMoviesStore.page > 1 ? allMoviesStore.page - 1 : allMoviesStore.page)}
                                >
                                    Previous
                                </Button>
                                <Button
                                    size="sm"
                                    variant="flat"
                                    color="primary"
                                    onPress={() => changeURLQuery(allMoviesStore.limit, allMoviesStore.page < 10 ? allMoviesStore.page + 1 : allMoviesStore.page)}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5 w-1/4">
                            <p className="text-small text-default-500">Кол-во фильмов на странице: {allMoviesStore.limit}</p>
                            <Input
                                type="text"
                                placeholder="введите лимит"
                                labelPlacement="outside"
                                value={allMoviesStore.limit.toString()}
                                onValueChange={(newLimit: string) => changeURLQuery(+newLimit, allMoviesStore.page)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AllMoviesFilters;