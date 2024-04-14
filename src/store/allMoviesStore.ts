import { create } from 'zustand';

interface allMoviesState {
    movies: any[]
    page: number
    limit: number
    ageRating: string[]
    'countries.name': string[]
    // 'premiere.world': string[]
    year: string[]
    'releaseYears.start': string
    'releaseYears.end': string
    changePage: (newVal: number) => void
    changeLimit: (newVal: number) => void
    changeMovies: (newMovies: any[]) => void
    changeYear: (newYear: string[]) => void
    changeReleaseYearsStart: (newReleaseYearsStart: string) => void
    changeReleaseYearsEnd: (newReleaseYearsEnd: string) => void
}

export const useAllMoviesStore = create<allMoviesState>()((set) => ({
    movies: [],
    page: 0,
    limit: 0,
    ageRating: [],
    'countries.name': [],
    // 'premiere.world': [],
    year: [],
    'releaseYears.start': '',
    'releaseYears.end': '',
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
    changeReleaseYearsStart: (newReleaseYearsStart: string) => {
        set((state) => ({ ...state, 'releaseYears.start': newReleaseYearsStart }))
    },
    changeReleaseYearsEnd: (newReleaseYearsEnd: string) => {
        set((state) => ({ ...state, 'releaseYears.end': newReleaseYearsEnd }))
    }
}))