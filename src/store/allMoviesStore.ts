import { create } from 'zustand';

interface allMoviesState {
    movies: any[]
    page: number
    limit: number
    'countries.name': string[]
    // 'premiere.world': string[]
    year: string[]
    // 'releaseYears.start': string
    // 'releaseYears.end': string
    country: string
    rating: [number, number]

    query: string

    changePage: (newVal: number) => void
    changeLimit: (newVal: number) => void
    changeMovies: (newMovies: any[]) => void
    changeYear: (newYear: string[]) => void

    changeCountry: (newCountry: string) => void
    changeRatingRange: (newRatingRange: [number, number]) => void
    changeQuery: (newQuery: string) => void
    // changeReleaseYearsStart: (newReleaseYearsStart: string) => void
    // changeReleaseYearsEnd: (newReleaseYearsEnd: string) => void
}

export const useAllMoviesStore = create<allMoviesState>()((set) => ({
    movies: [],
    page: 0,
    limit: 0,
    'countries.name': [],
    // 'premiere.world': [],
    year: [],
    // 'releaseYears.start': '',
    // 'releaseYears.end': '',
    country: '',
    rating: [12, 18],

    query: '',

    changePage: (newVal: number) => {
        set((state) => ({ ...state, page: newVal }))
    },
    changeLimit: (newVal: number) => {
        set((state) => ({ ...state, limit: newVal }))
    },
    changeMovies: (newMovies: any[]) => {
        set((state) => ({ ...state, movies: newMovies }))
    },
    changeYear: (newYear: string[]) => {
        set((state) => ({ ...state, year: [...newYear] }))
    },

    changeCountry: (newCountry: string) => {
        set((state) => ({ ...state, country: newCountry }))
    },
    changeRatingRange: (newRatingRange: [number, number]) => {
        set((state) => ({ ...state, rating: [...newRatingRange] }))
    },

    changeQuery: (newQuery: string) => {
        set((state) => ({ ...state, query: newQuery }))
    }
    // changeReleaseYearsStart: (newReleaseYearsStart: string) => {
    //     set((state) => ({ ...state, 'releaseYears.start': newReleaseYearsStart }))
    // },
    // changeReleaseYearsEnd: (newReleaseYearsEnd: string) => {
    //     set((state) => ({ ...state, 'releaseYears.end': newReleaseYearsEnd }))
    // }
}))