import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";

import InputField from "../../components/common/Form/InputField";
import Label from "../../components/common/Form/Label";
import Select from "../../components/common/Form/Select";
import Button from "../../components/common/Button/Button";
import InputFile from "../../components/common/Form/InputFile";
import TextareaField from "../../components/common/Form/TextareaField";
import Form from "../../components/common/Form/Form";
import MainContent from "../../layout/MainContent";
import Heading from "../../layout/Heading";
import api from "../../services/api";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    img: null,
    status: "available",
  });

  // Fetch existing product details
  const { data, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await api.get(`/products/${id}`);
      console.log("Product details:", response.data.data);
      return response.data.data;
    },
  });

  useEffect(() => {
    if (data) {
      setForm({
        name: data.name || "",
        description: data.description || "",
        price: data.price || "",
        stock: data.stock || "",
        img: null,
        status: data.status || "available",
      });
    }
  }, [data]);

  const updateProduct = useMutation({
    mutationFn: async (formData) => {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          payload.append(key, value);
        }
      });

      for (let pair of payload.entries()) {
        console.log(pair[0] + ": ", pair[1]);
      }
      
  
      payload.append("_method", "PUT");
  
      await api.post(`/products/${id}/update`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      navigate("/");
    },
  });  

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
  
    if (type === "file") {
      console.log("Selected file:", files[0]);
    } else {
      console.log("Changed field:", name, value);
    }
  
    setForm((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct.mutate(form);
  };

  if (isLoading) return <div>Loading product data...</div>;

  return (
    <MainContent activeMenu="product">
      <Heading title="Update Product" subtitle="Update a product listing" />
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="name">Product Name</Label>
        <InputField
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <div className="flex gap-2 ">
          <div className="w-full">
            <Label htmlFor="price">Price</Label>
            <InputField
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-full">
            <Label htmlFor="stock">Stock</Label>
            <InputField
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <Label htmlFor="image">Image</Label>
        <InputFile label="Image" name="img" onChange={handleChange} />

        <Label htmlFor="description">Description</Label>
        <TextareaField
          name="description"
          value={form.description}
          onChange={handleChange}
        />

        <Label htmlFor="status">Status</Label>
        <Select
          name="status"
          value={form.status}
          onChange={handleChange}
          options={[
            { value: "available", label: "In-Stock" },
            { value: "unavailable", label: "Out of Stock" },
          ]}
        />

        <Button disabled={updateProduct.isPending}>
          {updateProduct.isPending ? "Updating..." : "Update"}
        </Button>
      </Form>
    </MainContent>
  );
};

export default EditProduct;
