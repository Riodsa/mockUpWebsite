import Sidebar from "@/components/admin/Sidebar";
import { ConfigDict } from "../../../../../interface";
import AdminPanel from "@/components/admin/AdminPanel";

const sections = [
  {
    title: "What we do",
    configs: ["what-we-do-card"],
  },
  {
    title: "Awards",
    configs: ["award-card"],
  },
];

const configDict: ConfigDict = {
  "what-we-do-card": {
    type: "card",
    path: "business-cards",
    cardData: [],
  },
  "award-card": {
    type: "card",
    path: "award-cards",
    cardData: [],
  },
};

const fetchData = async (path: string) => {
  const res = await fetch(`${process.env.BACKEND_URL}/api/${path}`);
  const data = await res.json();
  return data;
};

const getConfigData = async () => {
  const keys = Object.keys(configDict);
  await Promise.all(
    keys.map(async (key: string) => {
      const config = configDict[key];
      const data = await fetchData(config.path);
      if (config.type === "image") {
        config.imageData = data[0];
      } else if (config.type === "text") {
        config.textData = data[0];
      } else if (config.type === "card") {
        config.cardData = data;
      }
    })
  );
};

export default async function ConfigAboutUsPage() {
  await getConfigData();

  return (
    <div className="min-h-dvh flex flex-row">
      <Sidebar />
      <AdminPanel sections={sections} configDict={configDict} />
    </div>
  );
}
