export interface CardConfig {
  id: string;
  title: string;
  title_en?: string;
  body: string;
  body_en?: string;
  image_url: string;
  href?: string;
  is_active?: boolean;
}

export interface ImageConfig {
  id: string;
  image_url: string;
  page: string;
  section: string;
}

export interface TextConfig {
  id: string;
  text: string;
  text_en?: string;
  page: string;
  section: string;
  type: "heading" | "paragraph" | "subheading";
}

export interface ConfigDict {
    [key: string]: {
        label?: string;
        type: "image" | "text" | "card";
        path: string;
        imageData?: ImageConfig;
        cardData?: CardConfig[];
        textData?: TextConfig;
    };
};

export interface Section {
  title: string;
  configs: string[];
}
