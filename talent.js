/*jshint esversion: 6 */

var width = 700, height = 700;

pack = data => d3.pack()
    .size([width, height])
    .padding(3)
(d3.hierarchy(data)
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value));

var format = d3.format(",d");

color = d3.scaleLinear()
    .domain([0, 5])
    .range(["hsl(233,62%,37%)", "hsl(335,70%,70%)"])
    .interpolate(d3.interpolateHcl);

d3.json("experience.json").then(function(data) {
    const root = pack(data);
    const svg = d3.select('.mySVG')
        .attr("viewBox", `-${width/6} -${height / 2} ${width} ${height}`)
        .style('background', color(0))
        .on("click", () => zoom(root));

    const node = svg.append("g")
        .selectAll("circle")
        .data(root.descendants().slice(1))
        .join("circle")
            .attr("fill", d => d.children ? color(d.depth) : "hsl(335,70%,70%)")
            .on("mouseover", function(d) { 
                d3.select(this).attr("stroke", "#000");
                d3.select('.info-title').html(d.data.name);
                d3.select('.info-details').html(d.data.info);})
            .on("mouseout", function(d) { 
                d3.select(this).attr("stroke", null);
                d3.select('.info-title').html('Skill Information');
                d3.select('.info-details').html('Information will fill on skill hover.');})
            .on("click", d => focus !== d && (zoom(d), d3.event.stopPropagation()));
    
    const label = svg.append("g")
            .attr('class', "main-text")
            .attr("pointer-events", "none")
            .attr("text-anchor", "middle")
        .selectAll("text")
        .data(root.descendants().slice(1))
        .join("text")
            .style("fill-opacity", d => d.parent === root ? 1 : 0)
            .style("display", d => d.parent === root ? "inline" : "none")
            .text(d => d.data.name)
            .attr('class', 'text');

    var educ = d3.selectAll(".text")
            .filter(function(d) { return d.data.name=='Education'; })
            .attr("class", 'educ');


    zoomTo([root.x, root.y, root.r * 2]);

    function zoomTo(v) {
        const k = width / v[2];
        view = v;
        label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
        node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
        node.attr("r", d => d.r * k);
    }

    function zoom(d) {
        const focus0 = focus;
    
        focus = d;
    
        const transition = svg.transition()
            .duration(d3.event.altKey ? 7500 : 750)
            .tween("zoom", d => {
            const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
            return t => zoomTo(i(t));
            });
    
        label
        .filter(function(d) { return d.parent === focus  || this.style.display === "inline";})
        .transition(transition)
            .style("fill-opacity", d => d.parent === focus ? 1 : 0)
            .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
            .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
    }    
});

		
	