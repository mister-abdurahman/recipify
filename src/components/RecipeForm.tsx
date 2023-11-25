import React, { useState } from "react";
import svg from "../assets/icons.svg";
import { nanoid } from "nanoid";
import { BASE_URL, KEY, useRecipe } from "../contexts/recipeContext";

interface ingredientType {
  quantity: number;
  unit: string;
  description: string;
}
interface formData {
  id?: string;
  title?: string;
  source_url?: string;
  image_url?: string;
  publisher?: string;
  cooking_time?: string;
  servings?: string;
  ingredients?: ingredientType[];
}

function RecipeForm({ setOpen }: any) {
  const { dispatch } = useRecipe();

  const [formData, setFormData] = useState<formData>({
    title: "",
    source_url: "",
    image_url: "",
    publisher: "",
    cooking_time: "",
    servings: "",
    ingredients: Array.from({ length: 6 }, () => ({
      description: "",
      unit: "",
      quantity: 0,
    })),
    id: nanoid(),
  });

  async function handleSubmitForm(e: React.FormEvent) {
    e.preventDefault();
    if (
      !formData.image_url ||
      !formData.ingredients ||
      !formData.cooking_time ||
      !formData.publisher ||
      !formData.servings ||
      !formData.title ||
      !formData.source_url
    )
      return;
    console.log("clicked submit btn");

    if (formData.image_url.length < 5) return;
    if (formData.source_url!.length < 5) return;
    if (formData.publisher.length < 5) return;

    const readyFormData = {
      ...formData,
      ingredients: formData.ingredients.filter((el) => el.description),
    };

    try {
      const response = await fetch(`${BASE_URL}?key=${KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(readyFormData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      dispatch({ type: "addToBookmarked", payload: data });
      setOpen(false);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  return (
    <form className="form-container">
      <div className="form-box absolute p-12 rounded-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fff] w-[75%]">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-8 right-8"
        >
          <svg className="w-10 h-10">
            <use xlinkHref={`${svg}#icon-cross`}></use>
          </svg>
        </button>
        <div>
          <h2 className="uppercase">Recipe data</h2>
          <div className="flex flex-col gap-8 mt-12">
            <div className="flex justify-between items-center gap-2">
              <label htmlFor="title">Title</label>
              <input
                className="rounded-md"
                id="title"
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => {
                    return { ...prev, title: e.target.value };
                  })
                }
              />
            </div>
            <div className="flex justify-between items-center gap-2 relative">
              <label htmlFor="title">URL</label>
              <input
                className="rounded-md"
                id="source_url"
                type="text"
                required
                value={formData.source_url}
                onChange={(e) =>
                  setFormData((prev) => {
                    return { ...prev, source_url: e.target.value };
                  })
                }
              />
              {formData.source_url! && formData.source_url!.length < 5 && (
                <p className="text-sm text-red-700 absolute -bottom-4 right-5">
                  Input value should be at least 5 letters long
                </p>
              )}
            </div>
            <div className="flex justify-between items-center gap-2 relative">
              <label htmlFor="image_url">Image URL</label>
              <input
                className="rounded-md"
                id="image_url"
                type="text"
                required
                value={formData.image_url}
                onChange={(e) =>
                  setFormData((prev) => {
                    return { ...prev, image_url: e.target.value };
                  })
                }
              />
              {formData.image_url && formData.image_url.length < 5 && (
                <p className="text-sm text-red-700 absolute -bottom-4 right-5">
                  Input value should be at least 5 letters long
                </p>
              )}
            </div>
            <div className="flex justify-between items-center gap-2 relative">
              <label htmlFor="publisher">Publisher</label>
              <input
                className="rounded-md"
                id="publisher"
                type="text"
                required
                value={formData.publisher}
                onChange={(e) =>
                  setFormData((prev) => {
                    return { ...prev, publisher: e.target.value };
                  })
                }
              />
              {formData.publisher && formData.publisher.length < 5 && (
                <p className="text-sm text-red-700 absolute -bottom-4 right-5">
                  Input value should be at least 5 letters long
                </p>
              )}
            </div>
            <div className="flex justify-between items-center gap-2">
              <label htmlFor="title">Prep Time</label>
              <input
                className="rounded-md"
                id="cooking_time"
                type="number"
                required
                value={formData.cooking_time}
                onChange={(e) =>
                  setFormData((prev: any) => {
                    return { ...prev, cooking_time: +e.target.value };
                  })
                }
              />
            </div>
            <div className="flex justify-between items-center gap-2">
              <label htmlFor="servings">Servings</label>
              <input
                className="rounded-md"
                id="servings"
                type="number"
                required
                value={formData.servings}
                onChange={(e) =>
                  setFormData((prev: any) => {
                    return { ...prev, servings: +e.target.value };
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="md:row-auto row-start-2 row-end-3">
          <h2 className="uppercase">Ingredients</h2>
          <div className="mt-6">
            {Array.from({ length: 6 }).map((_, i: any) => (
              <div key={i} className="flex gap-4 justify-between items-center">
                <div className="flex flex-col">
                  <label className="text-lg" htmlFor={`description-${i + 1}`}>
                    Description {i + 1}
                  </label>
                  <input
                    className="rounded-md w-full"
                    id={`description-${i + 1}`}
                    type="text"
                    value={formData.ingredients?.at(i)?.description}
                    onChange={(e) =>
                      setFormData((prev) => {
                        return {
                          ...prev,
                          ingredients: formData.ingredients?.map(
                            (el, index) => {
                              if (i === index)
                                return {
                                  description: e.target.value,
                                  quantity: el.quantity,
                                  unit: el.unit,
                                };
                              else return el;
                            }
                          ),
                        };
                      })
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-lg" htmlFor={`quantity-${i + 1}`}>
                    Quantity {i + 1}
                  </label>
                  <input
                    className="rounded-md w-full"
                    id={`quantity-${i + 1}`}
                    type="number"
                    value={formData.ingredients?.at(i)?.quantity}
                    onChange={(e) =>
                      setFormData((prev: any) => {
                        return {
                          ...prev,
                          ingredients: formData.ingredients?.map(
                            (el, index) => {
                              if (i === index)
                                return {
                                  description: el.description,
                                  quantity:
                                    +e.target.value > 0 ? +e.target.value : 0,
                                  unit: el.unit,
                                };
                              else return el;
                            }
                          ),
                        };
                      })
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-lg" htmlFor={`unit-${i + 1}`}>
                    Unit {i + 1}
                  </label>
                  <input
                    className="rounded-md w-full"
                    id={`unit-${i + 1}`}
                    type="text"
                    value={formData.ingredients?.at(i)?.unit}
                    onChange={(e) =>
                      setFormData((prev) => {
                        return {
                          ...prev,
                          ingredients: formData.ingredients?.map(
                            (el, index) => {
                              if (index === i)
                                return {
                                  description: el.description,
                                  quantity: el.quantity,
                                  unit: e.target.value,
                                };
                              else return el;
                            }
                          ),
                        };
                      })
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={handleSubmitForm}
          className="col-span-2 mt-10 bg-black text-white flex items-center gap-4 uppercase text-2xl py-4 px-10 rounded-full hover:-translate-y-1 active:translate-y-1 transition duration-500"
        >
          Upload{" "}
          <svg className="w-10 h-10">
            <use href={`${svg}#icon-upload-cloud`}></use>
          </svg>
        </button>
      </div>
    </form>
  );
}

export default RecipeForm;
