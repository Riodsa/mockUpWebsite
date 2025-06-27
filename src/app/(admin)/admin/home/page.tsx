import Sidebar from "@/components/admin/Sidebar";
import {
  ConfigDict,
  Section
} from "../../../../../interface";
import AdminPanel from "@/components/admin/AdminPanel";

const section: Section[] = [
  {
    title: "Hero Section",
    configs: ["hero-image", "hero-text"],
  },
];

const configDict: ConfigDict = {
  "hero-image": {
    label: "Hero Image",
    type: "image",
    path: "images?page=home&section=hero",
  },
  "hero-text": {
    label: "Hero Text",
    type: "text",
    path: "texts?page=home&section=hero&type=heading",
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

export default async function ConfigHomePage() {
  await getConfigData();

  return (
    <div className="min-h-dvh flex flex-row w-screen">
      <Sidebar />
      <AdminPanel sections={section} configDict={configDict} />
    </div>
  );
}
