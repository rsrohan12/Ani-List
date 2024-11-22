import { Button } from "@/components/ui/button";
import { Table, 
  TableCaption, 
  TableHeader,
  TableCell,
  TableHead,
  TableRow,
  TableBody, } from "@/components/ui/table";
import {Trash2} from "lucide-react"
export default function page() {
  return (
    <div className="mt-10 min-h-screen">
      <h1 className="text-center text-2xl hover:text-muted-foreground">
        ADD ANIME
        <span className="text-blue-700 font-extrabold">
          /
        </span>
        MANGA IN YOUR LIST..
      </h1>
      <div className="container mx-auto mt-8">
        <Table className="text-blue-400">
          <TableCaption>Your added list.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">ANIME</TableHead>
              <TableHead>ADD</TableHead>
              <TableHead>VIEW</TableHead>
              <TableHead className="text-right">UPDATE</TableHead>
              <TableHead className="text-right">DELETE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">!!!!</TableCell>
              <TableCell>
                <Button className="text-red-600 ">X</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>

  )
}
