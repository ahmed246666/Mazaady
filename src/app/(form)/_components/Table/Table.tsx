import React from "react";
import { TableProps } from "@/types/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
const FormTable: React.FC<TableProps> = ({ data }) => {
  return (
    <>
      <Card>
        <CardContent>
          <Table>
            <TableCaption>selected key-value pairs</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Key</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow  key={index}>
                  <TableCell>{item.key_name}</TableCell>
                  <TableCell>{item.other_value || item.value_name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default FormTable;
