import React from 'react'

import Grid from '@material-ui/core/Grid';
import { PieChart, Pie, Legend, Cell, Tooltip } from 'recharts';

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function StatisticsV2({ winCounterRandomX, winCounterRandomO, winCounterRandomTie, winCounterPvpX, winCounterPvpO, winCounterPvpTie, randomStatsHistPersonal, pvpStatsHistPersonal, pvpStatsHist, randomStatsHist }) {
  return (
    <div className="connect__four__description">      
      <Grid container spacing={1}>
        <Grid item sm={6}>
          {((winCounterRandomX + winCounterRandomO + winCounterRandomTie) > 0) && (
            <div>
              <h3 className="connect__four__stats__headline">Current Random Game Stats</h3>
              <PieChart width={280} height={320}>
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={[
                    { name: 'Wons by X', value: winCounterRandomX },
                    { name: 'Ties', value: winCounterRandomTie },
                    { name: 'Wons by O', value: winCounterRandomO },
                  ]}
                  cx={140}
                  cy={140}
                  outerRadius={130}
                  label={renderCustomizedLabel}
                  labelLine={false}
                >
                  <Cell fill={'#0088FE'} />)
                        <Cell fill={'#00C49F'} />)
                        <Cell fill={'#FFBB28'} />)
                      </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </div>
          )}
        </Grid>
        <Grid item sm={6}>
          {((winCounterPvpX + winCounterPvpO + winCounterPvpTie) > 0) && (
            <div>
              <h3 className="connect__four__stats__headline">Current PvP Game Stats</h3>
              <PieChart width={280} height={320}>
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={[
                    { name: 'Wons by X', value: winCounterPvpX },
                    { name: 'Ties', value: winCounterPvpTie },
                    { name: 'Wons by O', value: winCounterPvpO },
                  ]}
                  cx={140}
                  cy={140}
                  outerRadius={130}
                  label={renderCustomizedLabel}
                  labelLine={false}
                >
                  <Cell fill={'#0088FE'} />)
                        <Cell fill={'#00C49F'} />)
                        <Cell fill={'#FFBB28'} />)
                      </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </div>
          )}
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item sm={6}>
          {(randomStatsHistPersonal && randomStatsHistPersonal.length > 0) && (
            <div>
              <h3 className="connect__four__stats__headline">Personal Random Stats</h3>
              <PieChart width={280} height={320}>
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={[
                    { name: "Wons by X", value: randomStatsHistPersonal?.filter(element => element._id.includes("X"))[0]?.count + winCounterRandomX },
                    { name: "Ties", value: randomStatsHistPersonal?.filter(element => element._id.includes("Tie"))[0]?.count + winCounterRandomTie },
                    { name: "Wons by O", value: randomStatsHistPersonal?.filter(element => element._id.includes("O"))[0]?.count + winCounterRandomO },
                  ]}
                  cx={140}
                  cy={140}
                  outerRadius={130}
                  label={renderCustomizedLabel}
                  labelLine={false}

                >
                  <Cell fill={'#0088FE'} />)
                        <Cell fill={'#00C49F'} />)
                        <Cell fill={'#FFBB28'} />)
                      </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </div>
          )}
        </Grid>
        <Grid item sm={6}>
          {(pvpStatsHistPersonal && pvpStatsHistPersonal.length > 0) && (
            <div>
              <h3 className="connect__four__stats__headline">Personal PvP Stats</h3>
              <PieChart width={280} height={320}>
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={[
                    { name: "Wons by X", value: pvpStatsHistPersonal?.filter(element => element._id.includes("X"))[0]?.count + winCounterPvpX },
                    { name: "Ties", value: pvpStatsHistPersonal?.filter(element => element._id.includes("Tie"))[0]?.count + winCounterPvpTie },
                    { name: "Wons by O", value: pvpStatsHistPersonal?.filter(element => element._id.includes("O"))[0]?.count + winCounterPvpO },
                  ]}
                  cx={140}
                  cy={140}
                  outerRadius={130}
                  labelLine={false}
                  label={renderCustomizedLabel}
                >
                  <Cell fill={'#0088FE'} />)
                        <Cell fill={'#00C49F'} />)
                        <Cell fill={'#FFBB28'} />)
                      </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </div>
          )}
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item sm={6}>
          {(randomStatsHist && randomStatsHist.length > 0) && (
            <div>
              <h3 className="connect__four__stats__headline">Overall Random Stats</h3>
              <PieChart width={280} height={320}>
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={[
                    { name: "Wons by X", value: randomStatsHist?.filter(element => element._id.includes("X"))[0]?.count + winCounterRandomX },
                    { name: "Ties", value: randomStatsHist?.filter(element => element._id.includes("Tie"))[0]?.count + winCounterRandomTie },
                    { name: "Wons by O", value: randomStatsHist?.filter(element => element._id.includes("O"))[0]?.count + winCounterRandomO },
                  ]}
                  cx={140}
                  cy={140}
                  outerRadius={130}
                  labelLine={false}
                  label={renderCustomizedLabel}
                >
                  <Cell fill={'#0088FE'} />)
                        <Cell fill={'#00C49F'} />)
                        <Cell fill={'#FFBB28'} />)
                      </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </div>
          )}
        </Grid>
        <Grid item sm={6}>
          {(pvpStatsHist && pvpStatsHist.length > 0) && (
            <div>
              <h3 className="connect__four__stats__headline">Overall PvP Stats</h3>
              <PieChart width={280} height={320}>
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={[
                    { name: "Wons by X", value: pvpStatsHist?.filter(element => element._id.includes("X"))[0]?.count + winCounterPvpX },
                    { name: "Ties", value: pvpStatsHist?.filter(element => element._id.includes("Tie"))[0]?.count + winCounterPvpO },
                    { name: "Wons by O", value: pvpStatsHist?.filter(element => element._id.includes("O"))[0]?.count + winCounterPvpTie },
                  ]}
                  cx={140}
                  cy={140}
                  outerRadius={130}
                  labelLine={false}
                  label={renderCustomizedLabel}
                >
                  <Cell fill={'#0088FE'} />)
                        <Cell fill={'#00C49F'} />)
                        <Cell fill={'#FFBB28'} />)
                      </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  )
}

export default StatisticsV2
