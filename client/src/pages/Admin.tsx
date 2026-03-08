import { useState, useEffect } from "react";

export default function Admin() {
  const [products, setProducts] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [inStock, setInStock] = useState(true);

  const loadProducts = () => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch(editingId ? `/api/products/${editingId}` : "/api/products", {
      method: editingId ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        price,
        category,
        image,
        description,
        inStock,
      }),
    });

    setEditingId(null);
    setName("");
    setPrice("");
    setCategory("");
    setImage("");
    setDescription("");
    setInStock(true);

    loadProducts();
  };

  const editProduct = (p: any) => {
    setEditingId(p.id);
    setName(p.name);
    setPrice(p.price);
    setCategory(p.category);
    setImage(p.image);
    setDescription(p.description);
    setInStock(p.inStock);
  };

  const deleteProduct = async (id: any) => {
    await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    loadProducts();
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
      <h2 className="text-3xl font-bold mb-6">Admin Panel</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow"
      >
        <input
          className="border rounded-md p-2"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border rounded-md p-2"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          className="border rounded-md p-2"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          className="border rounded-md p-2"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <textarea
          className="border rounded-md p-2 md:col-span-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
          />
          In Stock
        </label>

        <button
          type="submit"
          className="bg-black text-white rounded-md px-4 py-2 hover:bg-gray-800"
        >
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>

      <div className="mt-8 space-y-4">
        {products.map((p: any) => (
          <div
            key={p.id}
            className="flex items-center gap-4 p-4 border rounded-lg shadow-sm"
          >
            <img src={p.image} className="w-20 h-20 object-cover rounded-md" />

            <div className="flex-1">
              <h4 className="font-semibold">{p.name}</h4>
              <p className="text-sm text-gray-500">₹ {p.price}</p>
              <p className="text-xs text-gray-400">{p.category}</p>
            </div>

            <button
              onClick={() => editProduct(p)}
              className="px-3 py-1 border rounded-md hover:bg-gray-100"
            >
              Edit
            </button>

            <button
              onClick={() => deleteProduct(p.id)}
              className="px-3 py-1 border rounded-md text-red-500 hover:bg-red-50"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
