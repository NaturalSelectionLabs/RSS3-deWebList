import Container from "../../components/Container";
import Error from "next/error";
import Link from "next/link";
import { MdArrowBackIosNew } from "react-icons/md";
import { NextPage } from "next";
import Parser from "rss-parser";
import { htmlToText } from "html-to-text";
import list from "../../lists/websites.json";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import faviconImage from "../../public/favicon.svg";
import Head from "next/head";
import md5 from "blueimp-md5";

type Website = {
    name: string;
    description?: string;
    logo?: string;
    type: string;
    value: string;
    tags: string[];
    feeds: WebsiteFeed[];
};

type WebsiteFeed = {
    type: string;
    file: string;
};

type WebsiteFeedListItem = {
    title: string;
    description?: string;
    url: string;
    created_at: string;
};

type JSONFeed = {
    items: {
        title: string;
        summary: string;
        url: string;
        date_published: string;
    }[];
};

type PlanetFeed = {
    articles: {
        title: string;
        content: string;
        link: string;
        created: string
    }[];
}

const WebsitePage: NextPage = () => {
    const router = useRouter();
    const { value } = router.query;
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [website, setWebsite] = useState<Website>();
    const [websiteURL, setWebsiteURL] = useState<string>("");
    const [feedURL, setFeedURL] = useState<string>("");
    const [feeds, setFeeds] = useState<WebsiteFeedListItem[]>([]);

    const buildWebsiteURL = (website: Website): string => {
        switch (website.type) {
        case "ENS":
            return `https://${website.value}.limo`;
        case "IPNS":
            return `https://gateway.ipfs.io/ipns/${website.value}`;
        case "IPFS":
            return `https://gateway.ipfs.io/ipfs/${website.value}`;
        default:
            throw "unsupported website type";
        }
    };

    useEffect(() => {
        if (!router.isReady) {
            return;
        }

        const website = list.websites.find((website): boolean => {
            return website.value === value;
        });

        setWebsite(website);

        const parser = new Parser();

        const loadRSSFeed = async (
            response: Response
        ): Promise<WebsiteFeedListItem[]> => {
            const data = await response.text();
            const rssFeed = await parser.parseString(data);

            let feeds: WebsiteFeedListItem[] = [];

            rssFeed.items.map((item) => {
                feeds.push({
                    // Delete CDATA
                    title: item.title!.replace(/^<!\[CDATA\[/, "").replace(/]]>$/, ""),
                    description: item.content,
                    url: item.link!,
                    created_at: item.pubDate!,
                });
            });

            return feeds;
        };

        const loadJSONFeed = async (
            response: Response
        ): Promise<WebsiteFeedListItem[]> => {
            const jsonFeed: JSONFeed = await response.json();

            let feeds: WebsiteFeedListItem[] = [];

            jsonFeed.items.map((item) => {
                feeds.push({
                    title: item.title!,
                    description: item.summary,
                    url: item.url!,
                    created_at: item.date_published!,
                });
            });

            return feeds;
        };

        const loadPlanetFeed = async (response: Response): Promise<WebsiteFeedListItem[]> => {
            const planetFeed: PlanetFeed = await response.json();

            let feeds: WebsiteFeedListItem[] = [];

            planetFeed.articles.map((article) => {
                feeds.push({
                    title: article.title!,
                    description: article.content,
                    url: article.link,
                    created_at: article.created,
                });
            });

            return feeds;
        };

        const buildFeedURL = async (website: Website) => {
            const internalWebsiteURL = buildWebsiteURL(website);
            setWebsiteURL(internalWebsiteURL);

            for (let feed of website.feeds) {
                const feedURL = `${internalWebsiteURL}/${feed.file}`;
                setFeedURL(feedURL);

                const response = await fetch(feedURL);

                let feeds: WebsiteFeedListItem[] = [];

                switch (feed.type) {
                case "application/feed+json":
                    feeds = await loadJSONFeed(response);
                    break;
                case "application/planet+json":
                    feeds = await loadPlanetFeed(response);
                    break;
                case "application/rss+xml":
                case "application/atom+xml":
                    feeds = await loadRSSFeed(response);
                    break;
                }

                if (feeds.length > 0) {
                    feeds = feeds.filter((feed) => {
                        return !(feed.title === "" && feed.description === "");
                    });

                    // Complete feed url
                    feeds.map((feed) => {
                        if (!feed.url.startsWith("http://") && !feed.url.startsWith("https://")) {
                            feed.url =  `${buildWebsiteURL(website)}${feed.url}`;
                        } 
                    });

                    setFeeds(feeds);

                    return;
                }
            }
        };

        if (website) {
            buildFeedURL(website)
                .then()
                .catch((error) => {
                    setError(error);
                });

            setIsLoading(false);
        }
    }, [router.isReady, value]);

    if (!website) {
        if (isLoading) {
            return <>{/* Skeleton page */}</>;
        }

        return <Error statusCode={404}/>;
    }

    if (!website.logo) {
        website.logo = `https://www.gravatar.com/avatar/${md5(website.value)}?default=retro`;
    }

    return (
        <>
            <Head>
                <title>{website.name} | deWebList</title>
                <meta property="og:title" content={`${website.name} | deWebList`}/>
            </Head>
            <article className="divide-y divide-slate-100">
                <WebsiteHeader website={website} websiteURL={websiteURL} feedURL={feedURL}/>
                <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-y lg:border-slate-100">
                    {
                        feeds.length == 0 && error === "" && (
                            <div className="py-10 sm:py-12">
                                <Container>
                                    <span className="font-bold text-xl text-slate-700">Loading...</span>
                                </Container>
                            </div>
                        )
                    }
                    {
                        website.feeds.length === 0 && (
                            <div className="py-10 sm:py-12">
                                <Container>
                                    <span className="font-bold text-xl text-slate-700">Unsupported website</span>
                                </Container>
                            </div>
                        )
                    }
                    {
                        error !== "" && (
                            <div className="py-10 sm:py-12">
                                <Container>
                                    <span className="font-bold text-xl text-slate-700">{error}</span>
                                </Container>
                            </div>
                        )
                    }
                    <WebsiteFeedList feeds={feeds}/>
                </div>
            </article>
        </>
    );
};

type WebsiteHeaderProps = {
    website: Website;
    websiteURL: string;
    feedURL: string;
};

const WebsiteHeader = (props: WebsiteHeaderProps) => {
    const router = useRouter();

    return (
        <Container>
            <header className="flex flex-col space-y-10 py-10">
                <div className="flex items-center gap-6">
                    <div className="flex flex-col">
                        <a
                            onClick={() => router.back()}
                            className="flex items-center space-x-2 text-slate-600 cursor-pointer"
                        >
                            <MdArrowBackIosNew/>
                            <span>Back</span>
                        </a>
                        <div className="flex mt-10 space-x-8">
                            <div>
                                <Image
                                    src={props.website.logo ?? faviconImage}
                                    width={72}
                                    height={72}
                                    priority
                                    className="rounded-xl"
                                />
                            </div>
                            <div className="flex flex-col justify-between">
                                <h1 className="text-4xl font-bold text-slate-900">
                                    {props.website.name}
                                </h1>
                                <p className="text-lg font-medium leading-8 text-slate-700 line-clamp-1">
                                    {props.website.description ??
                                        "This website has no description"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <ul className="flex space-x-4">
                    {props.website.type === "ENS" && (
                        <li>
                            <Link
                                href={`https://rss3.io/result?search=${
                                    props.website.value as string
                                }`}
                                target="_blank"
                                className="border bg-blue-500 text-white rounded py-2 px-4 font-bold hover:bg-blue-700"
                            >
                                <span>View on rss3.io</span>
                            </Link>
                        </li>
                    )}
                    <li>
                        <Link
                            href={`${props.websiteURL as string}`}
                            target="_blank"
                            className="border border-slate-300 rounded py-2 px-4 font-bold hover:bg-slate-300"
                        >
                            <span>View</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={`${props.feedURL as string}`}
                            target="_blank"
                            className="border border-slate-300 rounded py-2 px-4 font-bold hover:bg-slate-300"
                        >
                            <span>RSS</span>
                        </Link>
                    </li>
                </ul>
            </header>
        </Container>
    );
};

type WebsiteFeedListProps = {
    feeds: WebsiteFeedListItem[];
};

const WebsiteFeedList = (props: WebsiteFeedListProps) => {
    return (
        <>
            {props.feeds.map((feed, index) => (
                <Link
                    href={feed.url}
                    target="_blank"
                    key={index}
                    className="block hover:bg-slate-100"
                >
                    <article className="py-10 sm:py-12">
                        <Container>
                            <div className="space-y-2">
                                <p className="text-slate-500">
                                    {moment(feed.created_at).format("LLL")}
                                </p>
                                <h3 className="text-2xl font-bold line-clamp-2">
                                    {feed.title}
                                </h3>
                                {feed.description && (
                                    <p className="leading-relaxed sm:leading-loose overflow-x-auto line-clamp-6">
                                        {htmlToText(feed.description)}
                                    </p>
                                )}
                            </div>
                        </Container>
                    </article>
                </Link>
            ))}
        </>
    );
};

export default WebsitePage;
