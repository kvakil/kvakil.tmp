const spec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": "container",
  "height": 400,
  "description": "sleep over time",
  "title": "Sleep",
  "data": {
    "values": [
      {"date": "2022-03-24", "start": "00:13", "end": "09:11"},
      {"date": "2022-03-25", "start": "23:12", "end": "08:12"},
      {"date": "2022-03-26", "start": "23:07", "end": "07:14"},
      {"date": "2022-03-27", "start": "22:47", "end": "06:54"},
      {"date": "2022-03-28", "start": "00:23", "end": "09:30"},
      {"date": "2022-03-29", "start": "01:34", "end": "09:20"},
      {"date": "2022-03-30", "start": "00:30", "end": "06:30"}
    ]
  },
  "transform": [
    {
      "calculate": "timeParse(datum.start, '%H:%M')",
      "as": "start_datetime_possibly_wrong_day"
    },
    {
      "calculate": "datum.start > '12' ? datum.start_datetime_possibly_wrong_day : timeOffset('day', datum.start_datetime_possibly_wrong_day)",
      "as": "start_datetime"
    },
    {
      "calculate": "timeParse(datum.end, '%H:%M')",
      "as": "end_datetime_minus_day"
    },
    {
      "calculate": "timeOffset('day', datum.end_datetime_minus_day)",
      "as": "end_datetime"
    },
    {
      "calculate": "timeFormat(timeParse(datum.date, '%Y-%m-%d'), '%a')",
      "as": "date_date"
    }
  ],
  "mark": {"type": "bar"},
  "encoding": {
    "x": {
      "field": "date_date",
      "type": "nominal",
      "title": null,
      "sort": null,
      "axis": {"grid": true, "domainColor": "lightgray", "labelAngle": 0},
      "scale": {"padding": 0.2}
    },
    "y": {
      "field": "start_datetime",
      "type": "temporal",
      "sort": "descending",
      "axis": {
        "title": null,
        "format": "%I %p",
        "orient": "right",
        "domainColor": "lightgray"
      },
      "scale": {"type": "time", "nice": "hour"}
    },
    "y2": {"field": "end_datetime", "type": "temporal"},
    "color": {"value": "#89ecec"},
    "tooltip": [
      {"field": "date", "title": "Date"},
      {"field": "start", "title": "Sleep Start"},
      {"field": "end", "title": "Sleep End"}
    ]
  },
  "config": {}
};
vegaEmbed("#vis", spec, {mode: "vega-lite", actions: false}).then(console.log).catch(console.warn);
