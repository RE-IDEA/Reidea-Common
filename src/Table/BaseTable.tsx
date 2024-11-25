import React, { useState, useEffect, useContext, useRef } from 'react';
import Box from '@mui/material/Box';
import { InputAdornment, IconButton, Typography, Button, Modal, Stack, TextField, Card, Avatar, TableContainer, Table, TableHead, TableRow, TableCell, TableSortLabel, Paper, TableBody } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import Fade from '@mui/material/Fade';
import { BaseTableProps, CellProps, RowProps } from './interface/base';


export const BaseTable: React.FC<BaseTableProps> = (props) => {
  const [visibleRows, setVisibleRows] = useState<number[]>([]);

  useEffect(() => {
    // Animate each row with a delay
    props.bodies.forEach((_, index) => {
      setTimeout(() => {
        setVisibleRows((prev) => [...prev, index]);
      }, index * (props.enableAnimation === true ? props.animationDelay ?? 0.150 : 0)*1000); // 150ms delay between rows
    });
  }, [props.bodies]);

  return (
        <TableContainer style={{...props.tableCSS}} component={Paper}>
          <Table size='small'>
            {/* ヘッダー */}
            <TableHead sx={{ backgroundColor:"whitesmoke", position: "sticky", top: 0, zIndex: 1 }}>
              <TableRow style={{...props.head.rowCSS}}>
                {props.head.values.map((item: CellProps) => (
                  <TableCell align={item.align} style={{ whiteSpace: 'nowrap', width: item.width, height: item.height}}>
                    <TableSortLabel >
                      {item.value}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {/* ボディー */}
            <TableBody>
                {props.bodies.map((row: RowProps, index:number) => (
                  <TableRow style={{...row.rowCSS,  
                    opacity: props.enableAnimation === true  ? (visibleRows.includes(index) ? 1 : 0) : 1,
                    transition: props.enableAnimation === true ? `opacity ${props.animationDuration ?? 0.5}s ease` : undefined,
                  }}>
                    {row.values.map((item:CellProps) => (
                      <TableCell align={item.align} style={{ whiteSpace: 'nowrap', width: item.width, height: item.height,
                      }}>
                        {item.value}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

  );
};

