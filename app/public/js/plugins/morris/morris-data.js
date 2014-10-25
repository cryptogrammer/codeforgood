$(function() {

//    Morris.Area({
//        element: 'morris-area-chart',
//        data: [{
//            period: '2010 Q1',
//            iphone: 2666,
//            ipad: null,
//            itouch: 2647
//        }, {
//            period: '2010 Q2',
//            iphone: 9999,
//            ipad: 2294,
//            itouch: 2441
//        }, {
//            period: '2010 Q3',
//            iphone: 4912,
//            ipad: 1969,
//            itouch: 2501
//        }, {
//            period: '2010 Q4',
//            iphone: 3767,
//            ipad: 3597,
//            itouch: 5689
//        }, {
//            period: '2011 Q1',
//            iphone: 6810,
//            ipad: 1914,
//            itouch: 2293
//        }, {
//            period: '2011 Q2',
//            iphone: 5670,
//            ipad: 4293,
//            itouch: 1881
//        }, {
//            period: '2011 Q3',
//            iphone: 4820,
//            ipad: 3795,
//            itouch: 1588
//        }, {
//            period: '2011 Q4',
//            iphone: 15073,
//            ipad: 5967,
//            itouch: 5175
//        }, {
//            period: '2012 Q1',
//            iphone: 10687,
//            ipad: 4460,
//            itouch: 2028
//        }, {
//            period: '2012 Q2',
//            iphone: 8432,
//            ipad: 5713,
//            itouch: 1791
//        }],
//        xkey: 'period',
//        ykeys: ['iphone', 'ipad', 'itouch'],
//        labels: ['iPhone', 'iPad', 'iPod Touch'],
//        pointSize: 2,
//        hideHover: 'auto',
//        resize: true
//    }, {
//        element: 'morris-area-chart2',
//        data: [{
//            period: '2010 Q1',
//            iphone: 2666,
//            ipad: null,
//            itouch: 2647
//        }, {
//            period: '2010 Q2',
//            iphone: 9999,
//            ipad: 2294,
//            itouch: 2441
//        }, {
//            period: '2010 Q3',
//            iphone: 4912,
//            ipad: 1969,
//            itouch: 2501
//        }, {
//            period: '2010 Q4',
//            iphone: 3767,
//            ipad: 3597,
//            itouch: 5689
//        }, {
//            period: '2011 Q1',
//            iphone: 6810,
//            ipad: 1914,
//            itouch: 2293
//        }, {
//            period: '2011 Q2',
//            iphone: 5670,
//            ipad: 4293,
//            itouch: 1881
//        }, {
//            period: '2011 Q3',
//            iphone: 4820,
//            ipad: 3795,
//            itouch: 1588
//        }, {
//            period: '2011 Q4',
//            iphone: 15073,
//            ipad: 5967,
//            itouch: 5175
//        }, {
//            period: '2012 Q1',
//            iphone: 10687,
//            ipad: 4460,
//            itouch: 2028
//        }, {
//            period: '2012 Q2',
//            iphone: 8432,
//            ipad: 5713,
//            itouch: 1791
//        }],
//        xkey: 'period',
//        ykeys: ['iphone', 'ipad', 'itouch'],
//        labels: ['iPhone', 'iPad', 'iPod Touch'],
//        pointSize: 2,
//        hideHover: 'auto',
//        resize: true
//    });
//
////    Morris.Area();
//
//    Morris.Donut({
//        element: 'morris-donut-chart',
//        data: [{
//            label: "Download Sales",
//            value: 12
//        }, {
//            label: "In-Store Sales",
//            value: 30
//        }, {
//            label: "Mail-Order Sales",
//            value: 20
//        }],
//        resize: true
//    });
//
//    Morris.Bar({
//        element: 'morris-bar-chart',
//        data: [{
//            y: '2006',
//            a: 100,
//            b: 90
//        }, {
//            y: '2007',
//            a: 75,
//            b: 65
//        }, {
//            y: '2008',
//            a: 50,
//            b: 40
//        }, {
//            y: '2009',
//            a: 75,
//            b: 65
//        }, {
//            y: '2010',
//            a: 50,
//            b: 40
//        }, {
//            y: '2011',
//            a: 75,
//            b: 65
//        }, {
//            y: '2012',
//            a: 100,
//            b: 90
//        }],
//        xkey: 'y',
//        ykeys: ['a', 'b'],
//        labels: ['Series A', 'Series B'],
//        hideHover: 'auto',
//        resize: true
//    });

    Morris.Line({
        // ID of the element in which to draw the chart.
        element: 'line-chart',
        // Chart data records -- each entry in this array corresponds to a point on
        // the chart.
        data: [
            { year: '2008', value: 20 },
            { year: '2009', value: 10 },
            { year: '2010', value: 5 },
            { year: '2011', value: 5 },
            { year: '2012', value: 20 }
        ],
        // The name of the data record attribute that contains x-values.
        xkey: 'year',
        // A list of names of data record attributes that contain y-values.
        ykeys: ['value'],
        // Labels for the ykeys -- will be displayed when you hover over the
        // chart.
        labels: ['Value']
    });

//    Morris.Line({
//        // ID of the element in which to draw the chart.
//        element: 'line-chart-2',
//        // Chart data records -- each entry in this array corresponds to a point on
//        // the chart.
//        data: [
//            { year: '2008', value: 100},
//            { year: '2009', value: 10 },
//            { year: '2010', value: 5 },
//            { year: '2011', value: 5 },
//            { year: '2012', value: 20 }
//        ],
//        // The name of the data record attribute that contains x-values.
//        xkey: 'year',
//        // A list of names of data record attributes that contain y-values.
//        ykeys: ['value'],
//        // Labels for the ykeys -- will be displayed when you hover over the
//        // chart.
//        labels: ['Value']
//    });
    makeLineChart('line-chart-2', [
        { Score: '2008', Unit: 1},
        { Score: '2009', Unit: 5 },
        { Score: '2010', Unit: 4 },
        { Score: '2011', Unit: 3 },
        { Score: '2012', Unit: 3 },
        { Score: '2013', Unit: 5 },
        { Score: '2014', Unit: 4 },
        { Score: '2015', Unit: 1 }
    ]);

    function makeLineChart(elID, data) {
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
});
