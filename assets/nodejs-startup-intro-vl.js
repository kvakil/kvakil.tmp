(function () {
const visRuntime = document.getElementById("vis-runtime");
const spec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "data": {
    "url": visRuntime.dataset.filename,
    "format": {"type": "json", "property": "results"}
  },
  "transform": [
    {"flatten": ["times"]},
    {"calculate": "1000*datum.times", "as": "times"},
  ],
  "mark": {"type": "boxplot", "extent": "min-max"},
  "encoding": {
    "x": {
      "field": "parameters.node_version",
      "title": visRuntime.dataset.facet || "Node.js version",
      "type": "nominal",
      "sort": [],
      "axis": {"labelAngle": 0}
    },
    "y": {
      "field": "times",
      "type": "quantitative",
      "title": "Time (ms)"
    },
    "color": {
      "title": visRuntime.dataset.facet || "Node.js version",
      "field": "parameters.node_version",
      "type": "nominal",
      "sort": []
    }
  },
  "config": {"numberFormat": ".3"},
  "title": {"text": visRuntime.dataset.title},
  "width": "container", "height": 500
};
vegaEmbed(visRuntime, spec, {mode: "vega-lite", actions: false}).catch(console.warn);

const visMemory = document.getElementById("vis-memory");
const specMemory = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "data": {
    "url": visMemory.dataset.filename,
    "format": {"type": "json"}
  },
  "transform": [
    {"flatten": ["memory"]},
    {"calculate": "datum.memory/1024", "as": "memory"}
  ],
  "mark": {"type": "boxplot", "extent": "min-max"},
  "encoding": {
    "x": {
      "field": "node_version",
      "title": visMemory.dataset.facet || "Node.js version",
      "type": "nominal",
      "sort": [],
      "axis": {"labelAngle": 0}
    },
    "y": {
      "field": "memory",
      "type": "quantitative",
      "title": "Unique Set Size (MiB)"
    },
    "color": {
      "title": visMemory.dataset.facet || "Node.js version",
      "field": "node_version",
      "type": "nominal",
      "sort": []
    },
  },
  "config": {"numberFormat": ".3"},
  "title": {
    "text": visMemory.dataset.title
  },
  "width": "container",
  "height": 500
};
vegaEmbed(visMemory, specMemory, {mode: "vega-lite", actions: false}).catch(console.warn);

})();
