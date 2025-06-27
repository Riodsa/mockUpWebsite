import { Section, ConfigDict } from "../../../interface";
import ConfigCard from "./ConfigCard";
import ConfigText from "./ConfigText";
import ConfigImage from "./ConfigImage";

export default function AdminPanel({ sections, configDict }: { sections: Section[]; configDict: ConfigDict }) {
    return (
        <div className="w-full ml-80 mx-10 my-10 flex flex-col flex-wrap">
            {sections.map((section,index) => (
            <div key={index} className="w-fit my-10 flex flex-col flex-wrap gap-10">
                <h1 className="text-4xl font-bold text-black">{section.title}</h1>
                <div className="flex flex-row w-fit flex-wrap">
                {section.configs.map((config) => (
                    <div key={`config-${configDict[config].path}`} className="flex flex-wrap gap-15 relative h-auto">
                    {configDict[config].type === "card" && configDict[config].cardData ? 
                        <ConfigCard
                              key={`config-${configDict[config].path}`}
                              cardData={configDict[config].cardData}
                              path={configDict[config].path}
                          />
                      : 
                     configDict[config].type === "text" && configDict[config].textData ? (
                       <ConfigText
                            key={`text-${configDict[config].textData.id}`}
                            id={configDict[config].textData.id}
                            text={configDict[config].textData.text}
                            text_en={configDict[config].textData.text_en}
                            type={configDict[config].textData.type}
                            page={configDict[config].textData.page}
                            section={configDict[config].textData.section}
                            label={configDict[config].label}
                            path={configDict[config].path}
                       />
                     ) : (
                       configDict[config].type === "image" && configDict[config].imageData ? (
                         <ConfigImage
                            key={`image-${configDict[config].imageData.id}`}
                            id={configDict[config].imageData.id}
                            image_url={configDict[config].imageData?.image_url}
                            path={configDict[config].path}
                            page={configDict[config].imageData?.page}
                            section={configDict[config].imageData?.section}
                            label={configDict[config].label}
                         />
                       ) : 
                       null
                     )}
                    </div>
                ))}
                </div>
            </div>
        ))}
        </div>
    );
}
