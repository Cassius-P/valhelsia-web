import React, { useEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4plugins_forceDirected from '@amcharts/amcharts4/plugins/forceDirected';

import {AdvancementTree} from "@/models/AdvancementTree";
import advancementTree from "@/components/advancements/AdvancementTree";


interface TreeComponentProps {
    trees: AdvancementTree[];
}

const TreeComponent: React.FC<TreeComponentProps> = ({ trees }) => {
    useEffect(() => {

        const processTree = (tree: AdvancementTree): AdvancementTree => ({
            ...tree,
            value: tree.name.length * 5, // Adjust the multiplier as needed
            children: tree.children?.map(processTree),
        });

        const generateLabelHtml = (advancement: AdvancementTree) => {
            let customHtml = '<div class="flex flex-col space-y-4">' +
                '<span class="p-1 rounded-md bg-gray-50 text-gray-500">' + advancement.name + '</span>' +
                '<div class="flex justify-around h-5">';

            if (advancement.attributes && Array.isArray(advancement.attributes.players)) {
                advancement.attributes.players.forEach((player: Player) => {
                    customHtml += '<img class="aspect-square h-5" src="https://crafatar.com/avatars/' + player.player_uid + '"/>';
                });
            }

            customHtml += '</div></div>';

            advancement.customLabelHtml = customHtml;

            // Recursively call this function for each child
            if (Array.isArray(advancement.children)) {
                advancement.children.forEach(generateLabelHtml);
            }
        };

        const generateTipHtml = (advancement: AdvancementTree) => {
            let customHtml = '<div class="flex flex-col space-y-2">' +
                '<span class="font-semibold">' + advancement.name + '</span>' +
                '<span class="text-sm">' + advancement.attributes.description + '</span>' +
                '<div class="flex justify-around h-5">';

            if (advancement.attributes && Array.isArray(advancement.attributes.players)) {
                advancement.attributes.players.forEach((player: Player) => {
                    customHtml += '<img class="aspect-square h-5" src="https://crafatar.com/avatars/' + player.player_uid + '"/>';
                });
            }

            customHtml += '</div></div>';

            advancement.customTipHtml = customHtml;

            // Recursively call this function for each child
            if (Array.isArray(advancement.children)) {
                advancement.children.forEach(generateTipHtml);
            }
        }


        trees.forEach((tree: AdvancementTree) => {
            generateLabelHtml(tree);
            generateTipHtml(tree)
        });


        console.log("Trees",trees)

        // Apply the processTree function to all root elements
        const processedTrees = trees.map(processTree);

        // Create chart
        let chart = am4core.create('chartdiv', am4plugins_forceDirected.ForceDirectedTree);
        chart.zoomable = true;
        chart.chartContainer.wheelable = true;
        chart.minZoomLevel = 0.2;
        // Create series
        let series = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries());

        // Set data
        series.data = processedTrees

        // Configure data fields
        series.dataFields.value = 'value';
        series.dataFields.name = 'name';
        series.dataFields.children = 'children';

        series.minRadius = 10; // Default is 100
        series.maxRadius = 100; // Default is 300

        series.links.template.distance = 1; // Default is 1
        series.links.template.strength = 0.1; // Default is 0.5


        series.nodes.template.propertyFields.customLabelHtml = "customLabelHtml";
        series.nodes.template.propertyFields.customTipHtml = "customTipHtml";

        series.nodes.template.adapter.add('fill', (fill, target) => {
           if (target.dataItem && (!target.dataItem.dataContext['attributes']['parent_id'] || !target.dataItem.dataContext['attributes']['parent_id'].startsWith(target.dataItem.dataContext['attributes']['modId']))) {
                return am4core.color('#ba8080'); // Custom fill color for root nodes
            }
            return fill; // Default fill color for other nodes
        });


        // Configure nodes
        // Create custom label with HTML content
        series.nodes.template.label.hideOversized = false;
        series.nodes.template.label.truncate = false;
        series.nodes.template.label.html = "{customLabelHtml}";

        series.nodes.template.tooltipHTML = "{customTipHtml}";
        // Configure links
        series.links.template.strokeWidth = 1;


        series.manyBodyStrength = -40;

        // Dispose chart on unmount
        return () => {
            chart.dispose();
        };
    }, [trees]);

    return <div id="chartdiv" style={{ width: '100%', height: '100%' }} />;
};

export default TreeComponent;