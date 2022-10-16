import type { NextPage } from "next";
import Container from "../components/Container";
import Link from "next/link";
import list from "../lists/websites.json";
import Image from "next/image";
import faviconImage from "../public/favicon.svg";

type Website = {
    name: string;
    description?: string;
    logo?: string;
    type: string;
    value: string;
    tags: string[];
}

const IndexPage: NextPage = () => {
    return (
        <>
            <div className="pt-16 lg:pt-12 space-y-12">
                <Container>
                    <h1 className="text-4xl font-bold leading-7 text-slate-900">Websites</h1>
                </Container>
                <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
                    {
                        list.websites.map((website, index) => (
                            <WebsiteItem key={index} website={website}/>
                        ))
                    }
                </div>
            </div>
        </>
    );
};

type WebsiteItemProp = {
    website: Website;
}

const WebsiteItem = (props: WebsiteItemProp) => {
    return (
        <Link href={`/websites/${props.website.value}`} className="block bg-white hover:bg-slate-100">
            <article className="py-10 sm:py-12">
                <Container>
                    <div className="flex space-x-4">
                        <Image src={props.website.logo ?? faviconImage} width={64} height={64} priority className="rounded-xl bg-slate-100"/>
                        <div className="flex flex-col justify-between flex-1">
                            <h3 className="text-2xl font-bold">{props.website.name}</h3>
                            <p className="line-clamp-1">{props.website.description ?? "This website has no description"}</p>
                        </div>
                    </div>
                    <ul className="mt-4 flex space-x-2">
                        {
                            props.website.tags.map((tag, index) => (
                                <li key={index}
                                    className="inline-block bg-slate-500 text-sm rounded px-1 py-0.5 text-white">{tag}</li>
                            ))
                        }
                    </ul>
                </Container>
            </article>
        </Link>
    );
};

export default IndexPage;
