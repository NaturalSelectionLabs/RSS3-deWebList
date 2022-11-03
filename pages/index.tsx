import type { NextPage } from "next";
import Container from "../components/Container";
import Link from "next/link";
import list from "../lists/websites.json";
import Image from "next/image";
import faviconImage from "../public/favicon.svg";
import md5 from "blueimp-md5";

type Website = {
    name: string;
    description?: string;
    logo?: string;
    type: string;
    value: string;
    tags: string[];
}

const IndexPage: NextPage = () => {
    // Set default logo
    list.websites.map((website) => {
        if (!website.logo) {
            website.logo = `https://www.gravatar.com/avatar/${md5(website.value)}?default=retro`;
        }
    });

    return (
        <>
            <div className="lg:pt-12 divide-y divide-slate-100">
                <Container className="hidden lg:block px-10">
                    <h1 className="text-4xl font-bold leading-7 text-slate-900">Websites</h1>
                </Container>
                <div className="divide-y divide-slate-100 lg:mt-12 lg:border-t lg:border-slate-100">
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
                        <div className="flex-shrink-0 justify-center flex">
                            <Image src={props.website.logo ?? faviconImage} width={64} height={64} priority className="rounded-xl bg-slate-100"/>
                        </div>
                        <div className="flex flex-col justify-between">
                            <h3 className="text-2xl font-bold line-clamp-1">{props.website.name}</h3>
                            <p className="line-clamp-1">{props.website.description ?? "This website has no description"}</p>
                        </div>
                    </div>
                    <ul className="mt-4 flex space-x-2">
                        {
                            props.website.tags.map((tag, index) => (
                                <li key={index}
                                    className="inline-block bg-black text-sm rounded px-2 py-1 text-white">{tag}</li>
                            ))
                        }
                    </ul>
                </Container>
            </article>
        </Link>
    );
};

export default IndexPage;
