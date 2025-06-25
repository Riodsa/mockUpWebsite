import Sidebar from "@/components/admin/Sidebar";
import ConfigCard from "@/components/admin/ConfigCard"
 
const sections = [
    {
        title: "What we do",
        configs: [
            {
                type: "card",
                path: "business-cards"
            }
        ]
    },
    {
        title: "Awards",
        configs: [
            {
                type: "card",
                path: "award-cards"
            }
        ]
    }
]

async function configType(type:string, path:string) {
    switch (type) {
        case "card":
            return (
                    <ConfigCard 
                        path={path}
                    />
            )
    }

}

export default function ConfigAboutUsPage() {
    return (
        <div className="min-h-dvh bg-white">
            <Sidebar/>
            {
                sections.map((section) => (
                    <div key={`section-${section.title}`} className="p-4">
                        {
                            section.configs.map((config) => (
                                configType(config.type,config.path)
                            ))
                        }
                        <hr className="text-black"></hr>
                    </div>
                ))
            }
        </div>
    );
}