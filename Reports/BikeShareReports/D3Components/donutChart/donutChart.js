define(['d3'], function(d3) {
  return function (instanceData) {
    console.log(instanceData);

    var chartWidth = instanceData.width > 0 ? instanceData.width : 150;
    var chartHeight = instanceData.height > 0 ? instanceData.height : 150;  
    var radius = chartWidth / 2;
    var donutWidth = 11;
    var arc = d3.arc().innerRadius(radius - donutWidth).outerRadius(radius);

    var svg = d3.select('body').append('svg')
          .attr('width', chartWidth)
          .attr('height', chartHeight);

    var pie = d3.pie();

    var grouping = svg.append('g')
    .attr('transform', 'translate(' + chartWidth / 2 + ',' + chartHeight / 2 + ')');

    var path = grouping
      .selectAll('path').data(pie([40,20,10]))
      // .selectAll('path').data(pie(instanceData.series[0])).value(function(d) { return d.Value; }) // TODO: Uncomment this line when this component is hooked up to a live data set. The .value() function should return the property (on an object) that yields an integer value.
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('class', function(d) {
        return 'segment-' + d.index;
      });
  };
});
