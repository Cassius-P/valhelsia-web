import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import {D3DragEvent} from "d3";



type TreeComponentProps = {
    trees: Advancement[];
};



const D3: React.FC<TreeComponentProps> = ({ trees }) => {
    const ref = useRef(null);
    const getNodeHTML = (advancement: Advancement) => {
        let nodeColor = 'bg-light-gray-600 dark:bg-gray-600 hover:bg-light-gray-800 hover:dark:bg-gray-700';
        if(!advancement.parent_id) {
            nodeColor = 'bg-green-600  hover:bg-green-700 text-white';
        }
        if(advancement.parent_id && !advancement.parent_id.startsWith(advancement.mod_id)){
            nodeColor = 'bg-red-600  hover:bg-red-700 text-white';
        }
        let playerNode = null



        if(advancement.players && advancement.players.length > 0) {
            let content = ''
            for(let player of JSON.parse(advancement.players.toString())) {

                if(player.player_uid == null) continue;
                content += `<img class="aspect-square h-6" src="https://crafatar.com/avatars/${player.player_uid}" alt={player.player_uid}/>`
            }

            if(content !== '') {
                playerNode = `<div class="flex justify-around h-6 w-full p-2 absolute -bottom-6">${content}</div>`
            }


        }

        let iconNode = null
        if(advancement.image_base64){
            iconNode = `
                            <span class="w-8 flex justify-center items-center">
                                <img src="data:image/png;base64,${advancement.image_base64}" alt="${advancement.icon}" class="w-full"/>
                            </span>`
        }

        let escapedTitle = advancement.title.replaceAll("'", "&apos;").replaceAll('"', "&quot;");
        let escapedDescription = advancement.description.replaceAll("'", "&apos;").replaceAll('"', "&quot;");

        let tooltipHtml = `<div class="flex flex-col w-60">
                        <div class="flex space-x-4 items-center">
                            ${iconNode ? iconNode : ''}
                            <h2 class="font-semibold">${escapedTitle}</h2>
                        </div>
                        <div class="flex flex-col space-y-2">
                            <p class="text-sm font-thin">${escapedDescription}</p>
                        </div>
                    </div>`;

// ...

        return `<div class="h-full w-full flex justify-center items-center  relative px-10 ">
            <div class="w-full aspect-square rounded-full flex justify-center items-center relative p-4 transition-all cursor-help  ${nodeColor}" 
            data-tooltip-id='general-tip' 
            data-tooltip-html='${tooltipHtml}'>
                <span class="whitespace-normal w-full text-center font-semibold text-xl ">
                    ${escapedTitle}
                </span>
                ${playerNode ? playerNode : ''}
            </div>
        </div>`;
    }

    useEffect(() => {
        const svgElement = ref.current;
        if (svgElement) {
            // @ts-ignore
            const width = svgElement.clientWidth;
            // @ts-ignore
            const height = svgElement.clientHeight;
            let currentTreeId: string | null = null;

            const svg = d3.select(ref.current);
            svg.selectAll('*').remove();

            // Define arrow markers
            svg.append("defs").selectAll("marker")
                .data(["end"])
                .enter().append("marker")
                .attr("id", String)
                .attr("viewBox", "0 -5 10 10")
                .attr("refX", 44)
                .attr("refY", 0)
                .attr("markerWidth", 6)
                .attr("markerHeight", 6)
                .attr("orient", "auto")
                .append("path")
                .attr("d", "M0,-5L10,0L0,5")
                .attr('class', 'fill-gray-600 dark:fill-light-gray-400')

            const g = svg.append('g').attr('class', 'everything');



            const dragstarted = (event: D3DragEvent<SVGElement, Advancement, unknown>, d: Advancement) => {
                // @ts-ignore
                currentTreeId = d.treeId;
                if (!event.active) simulation.alphaTarget(0.1).restart();
                // @ts-ignore
                d.fx = d.x;
                // @ts-ignore
                d.fy = d.y;
            }

            const dragged = (event: D3DragEvent<SVGElement, Advancement, unknown>, d: Advancement) => {

                // @ts-ignore
                if (d.treeId === currentTreeId) {
                    // @ts-ignore
                    d.fx = event.x;
                    // @ts-ignore
                    d.fy = event.y;
                }
            }

            const dragended = (event: D3DragEvent<SVGElement, Advancement, unknown>, d: Advancement)=> {
                currentTreeId = null;
                if (!event.active) simulation.alphaTarget(0).restart();
                // @ts-ignore
                d.fx = null;
                // @ts-ignore
                d.fy = null;
            }

            const drag = d3.drag<SVGForeignObjectElement, Advancement>()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended);


            const zoom = d3.zoom()
                .scaleExtent([0.1, 3])
                .on('start', function(event) {
                    if (event.sourceEvent && event.sourceEvent.type === "mousedown") {
                        d3.select(this).style('cursor', 'grabbing');
                    }
                })
                .on('zoom', function(event) {
                    g.attr('transform', event.transform);
                })
                .on('end', function(event) {
                    if (event.sourceEvent && event.sourceEvent.type === "mouseup") {
                        d3.select(this).style('cursor', 'grab');
                    }
                });

            // @ts-ignore
            svg.call(zoom).style('cursor', 'grab');

            // @ts-ignore
            svg.call(zoom.transform, d3.zoomIdentity.scale(0.6));

            const nodeById = new Map(trees.map((node) => [node.id, node]));
            const links = trees
                .filter((t) => t.parent_id)
                .map((t) => ({ source: nodeById.get(t.parent_id), target: nodeById.get(t.id) }))
                .filter((link) => link.source && link.target);

            // @ts-ignore
            const simulation = d3.forceSimulation(trees)

                // @ts-ignore
                .force('link', d3.forceLink(links).id((d) => d.id).distance(120))
                .force('charge', d3.forceManyBody().strength(-200))
                .force('center', d3.forceCenter(width / 2, height / 2))
                .force('collide', d3.forceCollide(130));

// Warm-up the simulation

            const link = g.append('g')
                .selectAll('line')
                .data(links)
                .enter().append('line')
                .attr('class', 'stroke-current text-gray-600 dark:text-light-gray-400')
                .attr('stroke-width', 4)
                .attr("marker-end", "url(#end)");  // Add arrow marker

            const node = g.append('g')
                .selectAll('foreignObject')
                .data(trees)
                .enter().append('foreignObject')
                .attr('width', 250)
                .attr('height', 250)
                .html(d => getNodeHTML(d))
                .call(drag);

            simulation.on('tick', () => {

                link

                    // @ts-ignore
                    .attr('x1', (d) => d.source.x)
                    // @ts-ignore
                    .attr('y1', (d) => d.source.y)
                    // @ts-ignore
                    .attr('x2', (d) => d.target.x)
                    // @ts-ignore
                    .attr('y2', (d) => d.target.y);

                node
                    // @ts-ignore
                    .attr('x', (d) => d.x - 125)
                    // @ts-ignore
                    .attr('y', (d) => d.y - 125);
            });
        }
    }, [trees]);

    return (
        <svg ref={ref} style={{ width: '100%', height: '100%' }}></svg>
    );
};

export default D3;
