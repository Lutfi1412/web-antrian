import React, { FC, useState } from "react";
import { Table, Pagination } from "react-bootstrap";

interface CardHomeProps {
  columns: string[]; // Nama kolom tabel
  data: Array<{ [key: string]: any }>;
}

const CardTable: FC<CardHomeProps> = ({ columns, data }) => {
  const itemsPerPage = 5; // Jumlah data per halaman
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Menghitung data berdasarkan halaman
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Total halaman
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Fungsi untuk menangani perubahan halaman
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <Table responsive bordered striped hover>
          <thead>
            <tr>
              {columns
                .filter((column) => column !== "Status") // Hiding the "Status" column header
                .map((column, index) => (
                  <th key={index}>{column}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns
                  .filter((column) => column !== "Status") // Menyembunyikan kolom 'Status'
                  .map((column, colIndex) => (
                    <td key={colIndex}>
                      {row[column] || "-"}{" "}
                      {/* Menampilkan nilai kolom atau '-' jika kosong */}
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Pagination */}
        <Pagination className="justify-content-end">
          <Pagination.First onClick={() => handlePageChange(1)} />
          <Pagination.Prev
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages).keys()].map((number) => (
            <Pagination.Item
              key={number + 1}
              active={number + 1 === currentPage}
              onClick={() => handlePageChange(number + 1)}
              className={
                number + 1 === currentPage ? "bg-success text-white" : ""
              }
            >
              {number + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() =>
              handlePageChange(Math.min(currentPage + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          />
          <Pagination.Last onClick={() => handlePageChange(totalPages)} />
        </Pagination>
      </div>
    </div>
  );
};

export default CardTable;
