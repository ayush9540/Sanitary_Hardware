import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export default function Admin() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [existingImage, setExistingImage] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [inStock, setInStock] = useState(true);

  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editingCategoryName, setEditingCategoryName] = useState("");

  const { toast } = useToast();

  const loadProducts = () => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  };

  const loadCategories = () => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  };

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const resetProductForm = () => {
    setEditingId(null);
    setName("");
    setPrice("");
    setCategory("");
    setImage(null);
    setDescription("");
    setInStock(true);
    setExistingImage("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!name.trim() || !price.trim() || !category.trim()) {
      toast({
        title: "Missing required fields",
        description: "Name, price, and category are required",
        variant: "destructive",
      });
      return;
    }

    try {
      let imageUrl = existingImage;
      if (image) {
        const formData = new FormData();
        formData.append("image", image);
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        if (!uploadRes.ok) throw new Error("Image upload failed");
        const data = await uploadRes.json();
        imageUrl = data.imageUrl;
      }

      const res = await fetch(editingId ? `/api/products/${editingId}` : "/api/products", {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token") || "",
        },
        body: JSON.stringify({
          name,
          price,
          category,
          image: imageUrl,
          description,
          inStock: String(inStock),
        }),
      });
      if (!res.ok) throw new Error("Failed to save product");

      toast({
        title: editingId ? "Product updated" : "Product added",
        description: `${name} has been ${editingId ? "updated" : "added"} successfully.`,
      });

      resetProductForm();
      loadProducts();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const editProduct = (p: any) => {
    setEditingId(p.id);
    setName(p.name);
    setPrice(p.price);
    setCategory(p.category);
    setImage(null);
    setExistingImage(p.image);
    setDescription(p.description);
    setInStock(p.inStock === "true");
  };

  const deleteProduct = async (id: any) => {
    await fetch(`/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token") || ""
      }
    });
    loadProducts();
  };

  const addOrUpdateCategory = async (e: any) => {
    e.preventDefault();
    try {
      if (editingCategoryId) {
        await fetch(`/api/categories/${editingCategoryId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token") || "",
          },
          body: JSON.stringify({ name: editingCategoryName }),
        });
        toast({ title: "Category updated" });
      } else {
        const res = await fetch("/api/categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token") || "",
          },
          body: JSON.stringify({ name: newCategoryName }),
        });
        const created = await res.json();
        toast({ title: "Category added" });
      }

      setNewCategoryName("");
      setEditingCategoryId(null);
      setEditingCategoryName("");
      loadCategories();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const editCategory = (cat: any) => {
    setEditingCategoryId(cat.id);
    setEditingCategoryName(cat.name);
  };

  const deleteCategory = async (id: any) => {
    await fetch(`/api/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token") || "",
      },
    });
    loadCategories();
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto py-10 px-6">
      <h2 className="text-3xl font-bold mb-6">Admin Panel</h2>

      <Tabs defaultValue="products">
        <TabsList className="mb-6">
          <TabsTrigger value="products" className="cursor-pointer">Products</TabsTrigger>
          <TabsTrigger value="categories" className="cursor-pointer">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="categories">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-1 bg-muted">
              <CardHeader>
                <CardTitle>{editingCategoryId ? "Edit category" : "Add category"}</CardTitle>
                <CardDescription>
                  Manage product categories used in the store.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={addOrUpdateCategory} className="space-y-4">
                  <div>
                    <Label htmlFor="category-name">Category name</Label>
                    <Input
                      id="category-name"
                      value={editingCategoryId ? editingCategoryName : newCategoryName}
                      onChange={(e) =>
                        editingCategoryId
                          ? setEditingCategoryName(e.target.value)
                          : setNewCategoryName(e.target.value)
                      }
                      placeholder="Enter category name"
                      required
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Button type="submit" className="w-full sm:w-auto">
                      {editingCategoryId ? "Update category" : "Add category"}
                    </Button>
                    {editingCategoryId && (
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={() => {
                          setEditingCategoryId(null);
                          setEditingCategoryName("");
                        }}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Categories</CardTitle>
                  <CardDescription>All categories currently in the store.</CardDescription>
                </CardHeader>
                <CardContent>
                  {categories.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No categories yet. Add one using the form.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {categories.map((cat) => (
                        <div
                          key={cat.id}
                          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border rounded-lg bg-muted"
                        >
                          <div>
                            <p className="font-medium">{cat.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {products.filter((p) => p.category === cat.name).length} products
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => editCategory(cat)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => deleteCategory(cat.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

      <TabsContent value="products">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-1 bg-muted">
            <CardHeader>
              <CardTitle>{editingId ? "Edit product" : "Add product"}</CardTitle>
              <CardDescription>
                Add or update products here. Fields marked with * are required.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="product-name">Product name</Label>
                  <Input
                    id="product-name"
                    placeholder="e.g. Wireless Speaker"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="product-price">Price</Label>
                  <Input
                    id="product-price"
                    placeholder="e.g. 1999"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="product-category">Category</Label>
                  <select
                    id="product-category"
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-muted-foreground mt-1">
                    Add categories in the Categories tab.
                  </p>
                </div>

                <div>
                  <Label htmlFor="product-image">Product image</Label>
                  <Input
                    id="product-image" className="cursor-pointer"
                    type="file"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                  />
                  {editingId && existingImage && (
                    <img
                      src={existingImage}
                      className="mt-2 max-h-32 rounded-md"
                      alt="Existing product"
                    />
                  )}
                </div>

                <div>
                  <Label htmlFor="product-description">Description</Label>
                  <textarea
                    id="product-description"
                    className="min-h-[120px] w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    placeholder="Add a brief product description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    id="product-in-stock"
                    type="checkbox"
                    className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
                    checked={inStock}
                    onChange={(e) => setInStock(e.target.checked)}
                  />
                  <label htmlFor="product-in-stock" className="text-sm">
                    In stock
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <Button type="submit" className="w-full sm:w-auto">
                    {editingId ? "Update Product" : "Add Product"}
                  </Button>
                  {editingId && (
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto"
                      onClick={resetProductForm}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Products</CardTitle>
                <CardDescription>All products currently in the catalog.</CardDescription>
              </CardHeader>
              <CardContent>
                {products.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No products yet. Add one using the form.
                  </p>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {products.map((p: any) => (
                      <div
                        key={p.id}
                        className="flex flex-col gap-3 rounded-xl border border-border bg-muted p-4"
                      >
                        <div className="flex items-start gap-4">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="h-20 w-20 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold">{p.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {p.category}
                            </p>
                            <p className="mt-1 font-semibold">₹ {p.price}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => editProduct(p)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteProduct(p.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  </div>
</Layout>
  );
}
