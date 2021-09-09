import React, { useEffect, useRef } from 'react';
import {Line, Bar} from 'react-chartjs-2';

export default function LineChartWDL(props) {
    const [stats, setStats] = React.useState(null);
    const [labels,setLabels] = React.useState(null);
    useEffect(() => {
        if(props.stats != null || props.stats !=undefined){
            setStats(makeData(props.stats))
            setLabels(makeLabels(props.stats));
        }
    }, []);
    
    const lose = (ctx, value) => ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;
    const draw = (ctx, value) => ctx.p0.parsed.y == ctx.p1.parsed.y ? value : undefined;

    const genericOptions = {
        fill: false,
        interaction: {
          intersect: false
        },
        radius: 0,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: "Stosunek wygranej, przegranej, remisu do kolejki"
            }
        },
        scales: {
            y: {
                title:{
                    display: true,
                    text:"Stosunek wygranej, przegranej, remisu",
                } 
            },
            x: {
                title:{
                    display: true,
                    text:"Kolejka",
                }  
            }
        }
      };

    const chartConfig = {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: ['Stosunek'],
                data: stats,
                borderColor: 'rgb(21, 235, 64)',
                segment: {
                    borderColor: ctx => lose(ctx, 'rgb(255, 0, 0)') || draw(ctx, 'rgb(105,105,105)'),
                }
            }]
        },
        options: genericOptions,   
    }
    const makeLabels = (statsLen) =>{
        var array = new Array();
        if(statsLen != undefined || statsLen != null){
            for(var i = 1; i<= statsLen.length; i++){
                array.push(i);
            }
        }
        return array;
    }

    const makeData = (data) =>{
        var dataArray = new Array();
        var globalPoints = 0;
        if(data != undefined || data != null){
            for(var i = 0; i < data.length; i++){
                if(data.charAt(i) === 'w'){
                    dataArray.push(globalPoints = globalPoints + 1)
                } else if(data.charAt(i) === 'd'){
                    dataArray.push(globalPoints)
                } else if(data.charAt(i) === 'l'){
                    dataArray.push(globalPoints = globalPoints - 1)
                }
            }
        }
        return dataArray;
    }

    return (
        <div>
            <Line
                data={chartConfig.data}
                labels={chartConfig.data}
                options={genericOptions}
                >
                
            </Line>
        </div>
      );
  }