/**
 * Created by sam on 31/08/2014.
 */

// Angular services and factories
angular.module('app.services', [])

    .factory('Chart', function () {
        console.log('Chart Factory');
        var chartFactory = {};
        chartFactory.makeLineChart = function (elID, data) {
            Morris.Line({
                // ID of the element in which to draw the chart.
                element: elID,
                // Chart data records -- each entry in this array corresponds to a point on
                // the chart.
                data: data,
                // The name of the data record attribute that contains x-values.
                xkey: 'Score',
                // A list of names of data record attributes that contain y-values.
                ykeys: ['Unit'],
                // Labels for the ykeys -- will be displayed when you hover over the
                // chart.
                labels: ['Score'],
                ymax: 5,
                ymin: 1,
                smooth: false,
                goal: [1.0, -1.0]

            });
        }
        return chartFactory;
    })