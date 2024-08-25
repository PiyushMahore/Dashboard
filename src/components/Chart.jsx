import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({ prop }) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const randomColor = () => `rgba(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, 0.5)`;

    const data = {
        labels: prop?.labels?.map((label) => label),
        datasets: [
            {
                label: 'Dataset',
                data: prop?.datasets?.map((data) => (data.data))[0],
                backgroundColor: Array.from({ length: 5 }, randomColor),
            }
        ]
    };

    const config = {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            cutout: "65%",
            plugins: {
                legend: {
                    display: false,
                    position: 'top'
                },
                centerText: {
                    text: `${prop?.datasets?.map((data) => data.data.reduce((a, b) => Number(a) + Number(b)))} Total`,
                    color: '#000',
                    fontStyle: 'Arial',
                    sidePadding: 20,
                    minFontSize: 20,
                    lineHeight: 25
                }
            }
        },
        plugins: [{
            id: 'centerText',
            beforeDraw: function (chart) {
                const ctx = chart.ctx;
                const width = chart.width;
                const height = chart.height;
                const centerText = chart.config.options.plugins.centerText;
                const text = centerText.text;

                ctx.save();

                const fontSize = centerText.minFontSize || 10;

                ctx.font = `${fontSize}px ${centerText.fontStyle}`;
                ctx.fillStyle = centerText.color;

                const textHeight = fontSize;

                const centerX = width / 2;
                const centerY = height / 1.8;
                const textX = centerX;
                const textY = centerY - (textHeight / 2);

                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                ctx.fillText(text, textX, textY);

                ctx.restore();
            }
        }]
    };

    useEffect(() => {
        const ctx = chartRef?.current?.getContext('2d');
        chartInstanceRef.current = new Chart(ctx, config);

        return () => {
            chartInstanceRef.current.destroy();
        };
    }, [config.type]);

    return (
        <div className='h-44 mt-2 flex items-center justify-center'>
            {
                prop?.datasets ? <canvas className='h-[100%]' ref={chartRef}></canvas>
                    :
                    <div className='flex justify-center items-center flex-col'>
                        <img src='https://d2pi0n2fm836iz.cloudfront.net/546446/1221202317473765847a39c0b6d.jpg' width={100} />
                        <p>No Graph data available!</p>
                    </div>
            }
        </div>
    );
};

export default BarChart;
