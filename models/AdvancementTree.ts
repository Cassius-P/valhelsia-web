export interface AdvancementTree {
    name: string;
    hasParent?: boolean;
    children?: AdvancementTree[];
    attributes: { [key: string]: any };
    value?: string | number;
    customLabelHtml?: string;
    customTipHtml?: string;
}