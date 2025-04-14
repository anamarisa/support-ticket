const ProductTableHead = ({ columns }) => {
  return (
    <thead className="bg-gray-50 dark:bg-neutral-700">
      <tr>
        {columns.map((column) => (
          <th
            key={column.key}
            className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${
              column.align === "right" ? "text-right" : "text-left"
            } dark:text-gray-300`}
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

ProductTableHead.defaultProps = {
  columns: [
    // { key: "image", label: "Image", align: "left" },
    { key: "name", label: "Name", align: "left" },
    { key: "price", label: "Price", align: "left" },
    { key: "stock", label: "Stock", align: "left" },
    { key: "status", label: "Status", align: "left" },
    { key: "action", label: "Action", align: "right" },
  ],
};

export default ProductTableHead;
