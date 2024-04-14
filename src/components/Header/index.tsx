import { FC } from "react";


const Header: FC = () => {
    return (
        <header className="bg-black-primary">
            <div className="container sm:px-7 sm:py-4 md:px-0">
                <div className="flex flex-row items-end">
                    <img className="h-8" src='/kinopoisk.svg' alt="logo" />
                    <p className="text-white text-2xl">ino<span className="text-red-primary ml-[1px]">поиск</span></p>
                </div>
            </div>
        </header>
    );
}

export default Header;