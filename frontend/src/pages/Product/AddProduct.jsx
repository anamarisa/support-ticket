import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../../services/api";

import Label from "../../components/common/Form/Label";
import Select from "../../components/common/Form/Select";
import InputField from "../../components/common/Form/InputField";
import InputFile from "../../components/common/Form/InputFile";
import TextareaField from "../../components/common/Form/TextareaField";
import Form from "../../components/common/Form/Form";
import MainContent from "../../layout/MainContent";
import Heading from "../../layout/Heading";
import Button from "../../components/common/Button/Button";

const AddProduct = () => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    img: null,
    status: "available",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData) => {
      const response = await api.post("/products/store", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Product added successfully!");
      setTimeout(() => navigate("/"), 1000);
    },
    onError: (error) => {
      console.error("Failed to add product:", error);

      if (error?.response?.data?.Validation_Error) {
        const errors = error.response.data.Validation_Error;
        Object.values(errors).forEach((msgs) => {
          msgs.forEach((msg) => toast.error(msg));
        });
      } else {
        toast.error("Failed to add product");
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("stock", form.stock);
    formData.append("status", form.status);

    if (form.img instanceof File) {
      formData.append("img", form.img);
    }

    // console.log("Selected file:", form.img);

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    mutate(formData);
  };

  return (
    <MainContent activeMenu="product">
      <Heading title="Add Product" subtitle="Create a new product listing" />
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="name">Product Name</Label>
        <InputField
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        {formErrors.name && (
          <p className="text-red-500 text-sm">{formErrors.name[0]}</p>
        )}

        <div className="flex gap-2 ">
          <div className="w-full">
            <Label htmlFor="price">Price</Label>
            <InputField
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
            />
            {formErrors.price && (
              <p className="text-red-500 text-sm">{formErrors.price[0]}</p>
            )}
          </div>

          <div className="w-full">
            <Label htmlFor="stock">Stock</Label>
            <InputField
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
            />
          </div>
          {formErrors.price && (
            <p className="text-red-500 text-sm">{formErrors.price[0]}</p>
          )}
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
        {formErrors.status && <p className="text-red-500 text-sm">{formErrors.status[0]}</p>}

        <Button disabled={isPending}>
          {isPending ? "Submitting..." : "Submit"}
        </Button>
      </Form>
    </MainContent>
  );
};

export default AddProduct;
