// fetching the data from the api after the page has finished to load
document.addEventListener('DOMContentLoaded', () => {
   
    let dataset = [];
    const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";
    try {
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            dataset = data
            console.log(dataset)

            // set the height & width of the svg
            const width = 850;
            const height = 600;
            const padding = 40;
    
            const tooltip = d3.select('#tooltip');

            // drawing the svg
            const svg = d3.select('svg')
                        .attr('width', width)
                        .attr('height', height)
                        .style('background-color', 'lightsmoke')
    
            // creating the x & y scales for the x & y axis for the gragh
    
            // xScale
            let xScale = d3.scaleLinear()
                        .domain([d3.min(dataset, (item) => item['Year'] - 1),d3.max(dataset, (item) => item['Year'] + 1)])
                        .range([padding, width - padding]);
            
            // yScale
            let yScale = d3.scaleTime()
                        .domain([d3.min(dataset, (item) => new Date(item['Seconds']) * 1000), d3.max(dataset, (item) => new Date(item['Seconds']) * 1000)])
                        .range([padding, height - padding]);   
                        
            // Drawing the axis on the svg
            
            let xAxis = d3.axisBottom(xScale)  // x axis
                        .tickFormat(d3.format('d'))

            let yAxis = d3.axisLeft(yScale)    // y axis
                        .tickFormat(d3.timeFormat('%M:%S'))
    
            // adding the x axis
            svg.append('g')
                .attr('id', 'x-axis')
                .attr("transform", `translate(0,${height - padding})`)
                // .attr('data-xvalue',(item) => {
                //     return item["Year"]
                // })
                .call(xAxis);
    
            // adding the y axis
            svg.append('g')
                .attr('id', 'y-axis')
                .attr("transform", `translate(${padding},0)`)
                .call(yAxis);

            
    
    console.log(dataset)
            // creating the circle dots to the svg using the data from the api
            svg.selectAll('circle')
                .data(dataset)
                .enter()
                .append('circle')
                .attr('class', 'dot')
                .attr('r', 6)
                .attr('data-xvalue', (item) => {
                    return item['Year']
                })
                .attr('data-yvalue', (item) => {
                    return new Date(item['Seconds'] * 1000)
                })
                .attr('cx', (item) => xScale(item['Year']))
                .attr('cy', (item) => yScale(new Date(item['Seconds'] * 1000 )))
                .attr('fill', (item) => {
                    if(item['Doping'] != "") {
                        return "rgb(31, 119, 180)";
                    }else {
                        return "rgb(255, 127, 14)";
                    }
                })
                .on('mouseover', (item) =>{
                    tooltip.transition()
                    .style('visibility', 'visible')

                    if(item['Doping'] != ""){
                        tooltip.text(item['Year'] + ' - ' + item['Name'] + ' - ' + item['Time'] + ' - ' + item['Doping'])
                    }else{
                        tooltip.text(item['Year'] + ' - ' + item['Name'] + ' - ' + item['Time'] + ' - ' + 'No Allegations')
                    }

                    tooltip.attr('data-year', item['Year'])
                })
                .on('mouseout', (item) => {
                    tooltip.transition()
                    .style('visibility', 'hidden')
                })
        })


    } catch (error) {
        console.log(error);
    }
})