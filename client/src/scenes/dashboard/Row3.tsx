
import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from "@/state/api";
import { Box, Typography, useTheme, Grid } from "@mui/material";
import { GridCellParams } from "@mui/x-data-grid";
import React, { useMemo } from "react";
import { Cell, Pie, PieChart } from "recharts";
type Props = {};

function Row3({ }: Props) {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[500]];

  const { data: kpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: transactionData } = useGetTransactionsQuery();

  const pieChartData = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses;
      return Object.entries(kpiData[0].expensesByCategory).map(
        ([key, value]) => {
          return [
            {
              name: key,
              value: value,
            },
            {
              name: `${key} of Total`,
              value: totalExpenses - value,
            },
          ];
        }
      );
    }
  }, [kpiData]);
  const productColumns = [
    {
      field: "_id",
      headerName: "Id",

    },

    {
      field: "expense",
      headerName: "Expense",
      flex: 0.2,
    },
  ];
  const transactionColumns = [

    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.2
    },

    {
      field: "amount",
      headerName: "Amount",
      flex: 1,


    },



  ];
  return (
    <>
      <DashboardBox gridArea="g">
        <BoxHeader
          title="List of Products"
          sideText={`${productData?.length} products`}
        />
        <Grid container>
          <Grid item xs={12}>
            <Grid container spacing={0} style={{ overflow: "auto", maxHeight: "180px" }}>
              {/* Header row */}
              <Grid item xs={12} style={{ position: "sticky", top: 0, backgroundColor: "#80c0ff", zIndex: 1 }}>
                <Grid container spacing={15}>
                  {productColumns.map((column) => (
                    <Grid item key={column.field} xs={column.flex}>
                      <Box fontWeight="bold" textAlign="left" padding="1px 65px" fontSize="12px">
                        {column.headerName}
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              {/* Data rows */}
              {productData?.map((row) => (
                <Grid item xs={12} key={row._id}>
                  <Grid container spacing={15}>
                    {productColumns.map((column) => (
                      <Grid item key={column.field} xs={column.flex}>
                        <Box textAlign="left" padding="4px 8px" fontSize="14px" color="#ccc">{row[column.field]}</Box>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </DashboardBox>

      <DashboardBox gridArea="h">
        <BoxHeader
          title="List of Transactions"
          sideText={`${transactionData?.length} transactions`}
        />
        <Grid container>
          <Grid item xs={12}>
            <Grid container spacing={0} style={{ overflow: "auto", maxHeight: "250px" }}>
              {/* Header row */}
              <Grid item xs={12} style={{ position: "sticky", top: 0, backgroundColor: "#80c0ff", zIndex: 1 }}>
                <Grid container spacing={25}>
                  {transactionColumns.map((column) => (
                    <Grid item key={column.field} xs={column.flex}>
                      <Box fontWeight="bold" textAlign="left" padding="1px 20px" fontSize="12px">
                        {column.headerName}
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              {/* Data rows */}
              {transactionData?.map((row) => (
                <Grid item xs={20} key={row._id}>
                  <Grid container spacing={25}>
                    {transactionColumns.map((column) => (
                      <Grid item key={column.field} xs={column.flex}>
                        <Box textAlign="left" padding="10px 20px" fontSize="14px" color="#ccc">{row[Integer.parseInt(column.field)]}</Box>

                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </DashboardBox>



      <DashboardBox gridArea="i">
        <BoxHeader title="Expense Breakdown By Category" sideText="+4%" />
        <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center">
          {pieChartData?.map((data, i) => (
            <Box key={`${data[0].name}-${i}`}>
              <PieChart width={110} height={70}>
                <Pie
                  stroke="none"
                  data={data}
                  innerRadius={18}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant="h5">{data[0].name}</Typography>
            </Box>
          ))}
        </FlexBetween>
      </DashboardBox>

      <DashboardBox gridArea="j">
        <BoxHeader
          title="Overall Summary and Explanation Data"
          sideText="+15%"
        />
        <Box
          height="15px"
          margin="1.25rem 1rem 0.4rem 1rem"
          bgcolor={palette.primary[800]}
          borderRadius="1rem"
        >
          <Box
            height="15px"
            bgcolor={palette.primary[600]}
            borderRadius="1rem"
            width="40%"
          ></Box>
        </Box>
        <Typography margin="0 1rem" variant="h6" >
          The revenue has increased by 15% compared to the previous month. The profit margin is 40% of the total expenses, indicating that the business is making a significant profit.
        </Typography>
      </DashboardBox>
    </>
  );
}

export default Row3;
