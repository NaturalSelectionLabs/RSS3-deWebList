import Link from "next/link";
import { PropsWithChildren } from "react";
import Image from "next/image";
import faviconImage from "../public/favicon.svg";
import RSS3Logo from "../public/RSS3Logo.svg";
import RSS3LogoV from "../public/RSS3LogoV.svg";
import { SiDiscord, SiGithub, SiGmail, SiInstagram, SiTelegram, SiTwitter } from "react-icons/si";
import { MdAdd } from "react-icons/md";

const Layout = (props: PropsWithChildren<{}>) => {
    return (
        <>
            <Header/>
            <Main>{props.children}</Main>
            <Footer/>
        </>
    );
};

const Header = () => {
    return (
        <header
            className="bg-slate-50 lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-112 lg:items-start lg:overflow-y-auto xl:w-120">
            <div
                className="hidden lg:sticky lg:top-0 lg:flex lg:w-16 lg:flex-none lg:items-center lg:whitespace-nowrap lg:py-12 lg:text-sm lg:leading-7 lg:[writing-mode:vertical-rl] gap-4">
                <span className="font-mono text-slate-500">Develop by</span>
                <div className="space-y-1 font-bold text-slate-900">
                    <Link className="flex items-center" href="https://rss3.io" target="_blank">
                        <Image src={ RSS3LogoV} alt="" width={12} height={48} priority />
                    </Link>
                </div>
            </div>
            <div
                className="relative z-10 mx-auto px-4 py-10 sm:px-6 md:max-w-2xl md:px-4 lg:min-h-full lg:flex-auto lg:border-x lg:border-slate-200 lg:py-12 lg:px-8 xl:px-12">
                <Link
                    href="/"
                    className="relative mx-auto hidden overflow-hidden rounded-lg bg-white shadow-xl shadow-slate-200 sm:rounded-xl lg:w-auto lg:rounded-2xl lg:block lg:mb-12"
                    aria-label="Homepage"
                >
                    <Image
                        className="w-full"
                        src={faviconImage}
                        alt=""
                        sizes="(min-width: 1024px) 20rem, (min-width: 640px) 16rem, 12rem"
                        priority
                    />
                    <div
                        className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/10 sm:rounded-xl lg:rounded-2xl"/>
                </Link>
                <div className="text-center lg:text-left">
                    <p className="text-2xl font-bold text-slate-900">
                        <Link href="/">Decentralized Website List</Link>
                    </p>
                    <p className="mt-3 text-lg font-medium leading-8 text-slate-700">
                        Explore the many awesome decentralized websites.
                    </p>
                </div>
                <div className="mt-10 hidden lg:block">
                    <ContributingSection/>
                </div>
                <div className="mt-10">
                    <SocialSection/>
                </div>
            </div>
        </header>
    );
};

const Main = (props: PropsWithChildren<{}>) => {
    return (
        <main className="border-t border-slate-200 lg:relative lg:mb-28 lg:ml-112 lg:border-t-0 xl:ml-120">
            <div className="relative">{props.children}</div>
        </main>
    );
};

const Footer = () => {
    return (
        <footer className="border-t border-slate-200 bg-slate-50 py-10 pb-40 sm:py-16 sm:pb-32 lg:hidden">
            <div className="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4">
                <ContributingSection/>
                <div className="mt-8 flex items-center text-sm leading-7 text-slate-900 gap-2">
                    <span>Develop by</span>
                    <Link className="flex items-center" href="https://rss3.io" target="_blank">
                        <Image src={ RSS3Logo} width={48} height={12} priority/>
                    </Link>
                </div>
            </div>
        </footer>
    );
};

const ContributingSection = () => {
    return (
        <section className="flex flex-col space-y-4">
            <h2 className="font-bold text leading-7 text-slate-900">
                <span>Contributing</span>
            </h2>
            <Link
                href="https://github.com/NaturalSelectionLabs/RSS3-deWebList/edit/main/lists/websites.json"
                target="_blank">
                <button type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-primary-blue px-6 py-3 space-x-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <MdAdd size={24} color={"white"} aria-hidden="true"/>
                    <span className="font-bold">Add Your Website</span>
                </button>
            </Link>
        </section>
    );
};

const SocialSection = () => {
    const socials = [
        {
            "icon": <SiGithub size={18}/>,
            "name": "GitHub",
            "url": "https://github.com/NaturalSelectionLabs",
        },
        {
            "icon": <SiTwitter size={18}/>,
            "name": "Twitter",
            "url": "https://twitter.com/rss3_",
        },
        {
            "icon": <SiDiscord size={18}/>,
            "name": "Discord",
            "url": "https://discord.com/invite/aGuwzF2hW4",
        },
        {
            "icon": <SiTelegram size={18}/>,
            "name": "Telegram",
            "url": "https://t.me/rss3_en",
        },
        {
            "icon": <SiInstagram size={18}/>,
            "name": "Instagram",
            "url": "https://www.instagram.com/rss3.io/",
        },
        {
            "icon": <SiGmail size={18}/>,
            "name": "Email",
            "url": "mailto:contact@rss3.io",
        }
    ];

    return (
        <section className="space-y-4">
            <h2 className="sr-only font-bold text leading-7 text-slate-900 lg:not-sr-only">
                Social
            </h2>
            <ul className="mt-4 flex justify-center gap-10 text-base font-medium leading-7 text-black sm:gap-8 lg:flex-col lg:gap-4">
                {
                    socials.map((social, index) => (
                        <li key={index}>
                            <Link href={social.url} target="_blank" className="flex items-center space-x-4 text-lg">
                                {social.icon}
                                <span className="hidden lg:block">{social.name}</span>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </section>
    );
};

export default Layout;
