var width = 900,
  height = 900
var diameter = 600
var duration = 2000

d3.selectAll('input').on('change', change)

function change() {
  if (this.value === 'radialtree') transitionToRadialTree()
  else if (this.value === 'radialcluster') transitionToRadialCluster()
  else if (this.value === 'tree') transitionToTree()
  else transitionToCluster()
}

function transitionToRadialTree() {
  var nodes = radialTree.nodes(root), // recalculate layout
    links = radialTree.links(nodes)

  svg
    .transition()
    .duration(duration)
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
  // set appropriate translation (origin in middle of svg)

  link
    .data(links)
    .transition()
    .duration(duration)
    .style('stroke', '#fc8d62')
    .attr('d', radialDiagonal) //get the new radial path

  node
    .data(nodes)
    .transition()
    .duration(duration)
    .attr('transform', function(d) {
      return 'rotate(' + (d.x - 90) + ')translate(' + d.y + ')'
    })

  node
    .select('circle')
    .transition()
    .duration(duration)
    .style('stroke', '#984ea3')
}

function transitionToRadialCluster() {
  var nodes = radialCluster.nodes(root), // recalculate layout
    links = radialCluster.links(nodes)

  svg
    .transition()
    .duration(duration)
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
  // set appropriate translation (origin in middle of svg)

  link
    .data(links)
    .transition()
    .duration(duration)
    .style('stroke', '#66c2a5')
    .attr('d', radialDiagonal) //get the new radial path

  node
    .data(nodes)
    .transition()
    .duration(duration)
    .attr('transform', function(d) {
      return 'rotate(' + (d.x - 90) + ')translate(' + d.y + ')'
    })

  node
    .select('circle')
    .transition()
    .duration(duration)
    .style('stroke', '#4daf4a')
}

function transitionToTree() {
  var nodes = tree.nodes(root), //recalculate layout
    links = tree.links(nodes)

  svg
    .transition()
    .duration(duration)
    .attr('transform', 'translate(40,0)')

  link
    .data(links)
    .transition()
    .duration(duration)
    .style('stroke', '#e78ac3')
    .attr('d', diagonal) // get the new tree path

  node
    .data(nodes)
    .transition()
    .duration(duration)
    .attr('transform', function(d) {
      return 'translate(' + d.y + ',' + d.x + ')'
    })

  node
    .select('circle')
    .transition()
    .duration(duration)
    .style('stroke', '#377eb8')
}

function transitionToCluster() {
  var nodes = cluster.nodes(root), //recalculate layout
    links = cluster.links(nodes)

  svg
    .transition()
    .duration(duration)
    .attr('transform', 'translate(40,0)')

  link
    .data(links)
    .transition()
    .duration(duration)
    .style('stroke', '#8da0cb')
    .attr('d', diagonal) //get the new cluster path

  node
    .data(nodes)
    .transition()
    .duration(duration)
    .attr('transform', function(d) {
      return 'translate(' + d.y + ',' + d.x + ')'
    })

  node
    .select('circle')
    .transition()
    .duration(duration)
    .style('stroke', '#e41a1c')
}

var root // store data in a variable accessible by all functions

var tree = d3.layout.tree().size([height, width - 160])

var cluster = d3.layout.cluster().size([height, width - 160])

var diagonal = d3.svg.diagonal().projection(function(d) {
  return [d.y, d.x]
})

var radialTree = d3.layout
  .tree()
  .size([360, diameter / 2])
  .separation(function(a, b) {
    return (a.parent == b.parent ? 1 : 2) / a.depth
  })

var radialCluster = d3.layout
  .cluster()
  .size([360, diameter / 2])
  .separation(function(a, b) {
    return (a.parent == b.parent ? 1 : 2) / a.depth
  })

var radialDiagonal = d3.svg.diagonal.radial().projection(function(d) {
  return [d.y, d.x / 180 * Math.PI]
})

var svg = d3
  .select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('transform', 'translate(40,0)')

var root = getData(),
  nodes = cluster.nodes(root),
  links = cluster.links(nodes)

var link = svg
  .selectAll('.link')
  .data(links)
  .enter()
  .append('path')
  .attr('class', 'link')
  .style('stroke', '#8da0cb')
  .attr('d', diagonal)

var node = svg
  .selectAll('.node')
  .data(nodes)
  .enter()
  .append('g')
  .attr('class', 'node')
  .attr('transform', function(d) {
    return 'translate(' + d.y + ',' + d.x + ')'
  })

node
  .append('circle')
  .attr('r', 4.5)
  .style('stroke', '#e41a1c')

node
  .append('text')
  .attr('dx', function(d) {
    return d.children ? -8 : 8
  })
  .attr('dy', 3)

  .style('text-anchor', function(d) {
    return d.children ? 'end' : 'start'
  })
  .text(function(d) {
    return d.name
  })

function getData() {
  return {
    name: 'Inicio',
    children: [
      {
        name: 'A',
        children: [
          {
            name: 'cluster',
            children: [],
          },
          {
            name: 'graph',
            children: [
              {
                name: 'BetweennessCentrality',
                size: 3534,
              },
              {
                name: 'LinkDistance',
                size: 5731,
              },
              {
                name: 'MaxFlowMinCut',
                size: 7840,
              },
              {
                name: 'ShortestPaths',
                size: 5914,
              },
              {
                name: 'SpanningTree',
                size: 3416,
              },
            ],
          },
          {
            name: 'optimization',
            children: [
              {
                name: 'AspectRatioBanker',
                size: 7074,
              },
            ],
          },
        ],
      },
      {
        name: 'B',
        children: [
          {
            name: 'interpolate',
            children: [
              {
                name: 'ArrayInterpolator',
                size: 1983,
              },
              {
                name: 'ColorInterpolator',
                size: 2047,
              },
              {
                name: 'DateInterpolator',
                size: 1375,
              },
              {
                name: 'Interpolator',
                size: 8746,
              },
              {
                name: 'MatrixInterpolator',
                size: 2202,
              },
              {
                name: 'NumberInterpolator',
                size: 1382,
              },
              {
                name: 'ObjectInterpolator',
                size: 1629,
              },
              {
                name: 'PointInterpolator',
                size: 1675,
              },
              {
                name: 'RectangleInterpolator',
                size: 2042,
              },
            ],
          },
          {
            name: 'ISchedulable',
            size: 1041,
          },
          {
            name: 'Parallel',
            size: 5176,
          },
          {
            name: 'Pause',
            size: 449,
          },
          {
            name: 'Scheduler',
            size: 5593,
          },
          {
            name: 'Sequence',
            size: 5534,
          },
          {
            name: 'Transition',
            size: 9201,
          },
          {
            name: 'Transitioner',
            size: 19975,
          },
          {
            name: 'TransitionEvent',
            size: 1116,
          },
          {
            name: 'Tween',
            size: 6006,
          },
        ],
      },
      {
        name: 'C',
        children: [
          {
            name: 'converters',
            children: [
              {
                name: 'Converters',
                size: 721,
              },
              {
                name: 'DelimitedTextConverter',
                size: 4294,
              },
              {
                name: 'GraphMLConverter',
                size: 9800,
              },
              {
                name: 'IDataConverter',
                size: 1314,
              },
              {
                name: 'JSONConverter',
                size: 2220,
              },
            ],
          },
          {
            name: 'DataField',
            size: 1759,
          },
          {
            name: 'DataSchema',
            size: 2165,
          },
          {
            name: 'DataSet',
            size: 586,
          },
          {
            name: 'DataSource',
            size: 3331,
          },
          {
            name: 'DataTable',
            size: 772,
          },
          {
            name: 'DataUtil',
            size: 3322,
          },
        ],
      },
    ],
  }
}
