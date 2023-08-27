export interface AdvancementTree {
    name: string;
    id: string;
    hasParent?: boolean;
    children?: AdvancementTree[];
    attributes: { [key: string]: any };
    value?: string | number;
    customLabelHtml?: string;
    customTipHtml?: string;
}