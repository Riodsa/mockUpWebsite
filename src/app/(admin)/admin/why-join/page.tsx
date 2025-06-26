import Sidebar from "@/components/admin/Sidebar";
import { Card, Section, ConfigDict } from "../../../../../interface";
import AdminPanel from "@/components/admin/AdminPanel";

const sections: Section[] = [
    {
        title: "Life at Mitrphol",
        configs: [
            "life-at-mitrphol-card",
        ]
    },
    {
        title: "Career Growth",
        configs: [
            "career-growth-card"
        ]
    }
]

const configDict : ConfigDict = {
    "life-at-mitrphol-card": {
        type: "card",
        path: "life-at-mitrphol-cards",
        cardData: [],
    },
    "career-growth-card": {
        type: "card",
        path: "career-growth-cards",
        cardData: [],
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
        config.cardData = data;
    }));
}

export default async function ConfigWhyJoinPage() {

    await getConfigData();


    return (
        <div className="min-h-dvh flex flex-row">
            <Sidebar/>
            <AdminPanel sections={sections} configDict={configDict} />
        </div>
    );
}