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
        })
    

        // set the height & width of the svg
        const width = 850;
        const height = 600;
        const padding = 40;

        // drawing the svg
        const svg = d3.select('svg')
                    .attr('width', width)
                    .attr('height', height)
                    .style('background-color', 'coral')

    } catch (error) {
        console.log(error);
    }
})