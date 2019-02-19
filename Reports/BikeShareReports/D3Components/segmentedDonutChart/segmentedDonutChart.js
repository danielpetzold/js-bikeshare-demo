define(['d3'], function(d3) {
    return function (instanceData) {
    
      //console.log(instanceData);
      //console.log(instanceData.series);
      //console.log(instanceData.series[0]);
      
      // Data Schema: 1 = Highlight (.segment-1), 0 = Shade (.segment-0)     
      
      function formatCurrency(val){
        var formatter = new Intl.NumberFormat('en-us', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumSignificantDigits: 2
        });

        return formatter.format(val);
      }
      
      var data = instanceData.series[0];
      var dataPoints = data.map(function(a) {return a.segmentState;});       
      var chartWidth = instanceData.width > 0 ? instanceData.width : 150;
      var chartHeight = instanceData.height > 0 ? instanceData.height : 150;      
      var donutWidth = instanceData.donutWidth ? instanceData.donutWidth : 11;
      var radius = chartWidth / 2;
      var arc = d3.arc().innerRadius(radius - donutWidth).outerRadius(radius).padAngle(.022);

      var svg = d3.select('#' + instanceData.id).append('svg')
      		.attr('id', instanceData.id + 'svg')
          .attr('width', chartWidth)
          .attr('height', chartHeight);

      var pie = d3.pie().value(function(d) { return 1; }).sort(null);

      var elemEnter = svg.append('g')
      .attr('transform',' translate(' + chartWidth / 2 + ',' + chartHeight / 2 + ')')
      .selectAll('path').data(pie(dataPoints))      
      .enter();
     
      var path = elemEnter.append('path')
      .attr('d', arc)
      .attr('data-segment-name', function(d) { return data[d.index].segmentName;})
      .attr('data-segment-value', function(d) { return data[d.index].segmentValue;})
      .attr('data-segment-index', function(d) { return d.index; })
      .attr('class', function(d) {
        return 'donutSegment segment-' + d.data;
      });
      
      path.on('click',function(d){
        document.getElementById('donutSegmentMonth').textContent = data[d.index].segmentName;
        document.getElementById('donutSegmentValue').textContent = formatCurrency(data[d.index].segmentValue);
        d3.event.stopPropagation();
      });
      
      svg.select('g')
      .append('text')
      .attr('dx', function(d){return -20})
      .attr('id', 'donutSegmentMonth')
      .text(function(d){ return data[0].segmentName});

      svg.select('g')
      .append('text')
      .attr('dx', function(d){return -30})
      .attr('dy', function(d){return 30})
      .attr('id', 'donutSegmentValue')
      .text(function(d){ return formatCurrency(data[0].segmentValue)});
    }
});


//
// test data
// (function() {
//   var data = [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0];
//   var chartWidth = 150;
//   var chartHeight = 150;
//   var radius = chartWidth / 2;
//   var donutWidth = 11;
//   var arc = d3.arc().innerRadius(radius - donutWidth).outerRadius(radius).padAngle(.022);
//
//   var svg = d3.select('#segmentedDonutChart').append('svg')
//         .attr('width', chartWidth)
//         .attr('height', chartHeight);
//
//   var pie = d3.pie().value(function(d) { return 1; }).sort(null);
//
//   var path = svg.append('g')
//   .attr('transform', `translate(${chartWidth/2},${chartHeight/2})`)
//   .selectAll('path').data(pie(data))
//   .enter()
//   .append('path')
//   .attr('d', arc)
//   .attr('fill', function(d) {
//     return d.data === 1 && '#00ff00' || '#cccccc';
//   });
// })();
