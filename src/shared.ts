export interface ImageType {
  png?: string;
  svg?: string;
  theme?: {
    primary_color_hex?: string;
  };
}

export type Status = "live" | "upcoming" | "killed";
