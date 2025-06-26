export interface Card {
  id: string;
  title?: string;
  title_en?: string;
  body?: string;
  body_en?: string;
  image_url?: string;
  href?: string;
  is_active?: boolean;
}
export interface configDictType {
    [key: string]: {
        type: string;
        label? : string;
        path: string;
        data: Card[]
    }
}