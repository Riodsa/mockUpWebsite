import Sidebar from "@/components/admin/Sidebar";
import ConfigCard from "@/components/admin/ConfigCard"
import { Card } from "../../../../../interface";

const sections = [
    {
        title: "What we do",
        configs: [
            "what-we-do-card",
            // "temp"
        ]
    },
    {
        title: "Awards",
        configs: [
            "award-card"
        ]
    }
]

const configDict : configDictType = {
    "what-we-do-card": {
        type: "card",
        path: "business-cards",
        data: [],
    },
    "award-card": {
        type: "card",
        path: "award-cards",
        data: [],
    }
}

interface configDictType {
    [key: string]: {
        type: string;
        path: string;
        data: Card[]
    }
}

const fetchData = async (path:string) => {
    const res = await fetch(`${process.env.BACKEND_URL}/api/${path}`)
    const data = await res.json()
    return data
}

const getConfigData = async () => {
    const keys = Object.keys(configDict);
    await Promise.all(keys.map(async (key : string) => {
        const config = configDict[key];
        const data = await fetchData(config.path);
        config.data = data;
    }));
}

export default async function ConfigAboutUsPage() {


    await getConfigData();

    // console.log("sectionData", configDict);

    return (
        <div className="min-h-dvh ml-80 bg-white flex flex-row">
            <Sidebar/>
            <div className="flex flex-col">
                 {
                sections.map((section,i) => (
                    <div key={`section-${section.title}`} className="p-4">
                        <h1 className="text-2xl font-bold mb-4">{section.title}</h1>
                        {
                            section.configs.map((config:string) => (
                                <div key={`config-${configDict[config].path}`} className="bg-gray-100 rounded-3xl flex flex-col gap-5 mb-8 p-8 pb-10 relative"> 
                                <h2 className="text-xl font-bold mb-2">{configDict[config].type}</h2>
                                    <div  className="flex flex-wrap gap-10 relative h-auto">
                                        {
                                            configDict[config].data.map((card : Card) => (
                                                <ConfigCard
                                                    key={`card-${card.id}`}
                                                    id={card.id}
                                                    title={card.title}
                                                    image_url={card.image_url}
                                                    body={card.body}
                                                    href={card.href}
                                                    is_active={card.is_active ??  true}
                                                    path={configDict[config].path}
                                                />
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
                        {
                            i < sections.length - 1 && (
                                <div className="w-full h-1 bg-black rounded-xl">
                                </div>
                            )
                        }
                    </div>
                ))
            }
            </div>
        </div>
    );
}
