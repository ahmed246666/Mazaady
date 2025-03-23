"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  fetchMainCategories,
  fetchProperties,
  fetchSubCategories,
} from "@/services/api";
import { Category, Property, SubCategory, SubmittedData } from "@/types/types";
import SelectWithSearch from "@/components/ui/selectWithSearch";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TailSpin } from "react-loader-spinner";
import FormTable from "../Table/Table";

const CategoryForm: React.FC = () => {
  const [mainCategories, setMainCategories] = useState<Category[]>([]);
  const [selectedMainCategory, setSelectedMainCategory] = useState<
    number | null
  >(null);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(
    null
  );
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperties, setSelectedProperties] = useState<
    Record<
      number,
      {
        key_name: string;
        value: string;
        value_name: string;
        other_value?: string;
      }
    >
  >({});
  const [loading, setLoading] = useState({
    main: true,
    sub: false,
    properties: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<SubmittedData[]>([]);

  // Fetch main categories
  useEffect(() => {
    const loadMainCategories = async () => {
      setLoading((prev) => ({ ...prev, main: true }));
      setError(null);
      try {
        const categories = await fetchMainCategories();
        setMainCategories(categories || []);
      } catch (err) {
        console.log(err)
        setError("Failed to load main categories.");
      } finally {
        setLoading((prev) => ({ ...prev, main: false }));
      }
    };
    loadMainCategories();
  }, []);

  // Fetch subcategories when a main category is selected
  useEffect(() => {
    if (!selectedMainCategory) return;

    const loadSubCategories = async () => {
      setLoading((prev) => ({ ...prev, sub: true }));
      setError(null);
      try {
        const subCategories = await fetchSubCategories(selectedMainCategory);
        setSubCategories(subCategories || []);
      } catch (err) {
        console.log(err)
        setError("Failed to load subcategories.");
      } finally {
        setLoading((prev) => ({ ...prev, sub: false }));
      }
    };
    loadSubCategories();
  }, [selectedMainCategory]);

  // Fetch properties when a subcategory is selected
  useEffect(() => {
    if (!selectedSubCategory) return;

    const loadProperties = async () => {
      setLoading((prev) => ({ ...prev, properties: true }));
      setError(null);
      try {
        const properties = await fetchProperties(selectedSubCategory);
        setProperties(properties || []);
      } catch (err) {
        console.log(err)
        setError("Failed to load properties.");
      } finally {
        setLoading((prev) => ({ ...prev, properties: false }));
      }
    };
    loadProperties();
  }, [selectedSubCategory]);

  const handleMainCategoryChange = useCallback((value: string) => {
    const categoryId = Number(value);
    setSelectedMainCategory(categoryId);
    setSelectedSubCategory(null);
    setProperties([]);
    setSelectedProperties({});
  }, []);

  const handleSubCategoryChange = useCallback((value: string) => {
    const subCategoryId = Number(value);
    setSelectedSubCategory(subCategoryId);
    setSelectedProperties({});
  }, []);

  const handlePropertyChange = useCallback(
    (
      propertyId: number,
      propertyName: string,
      value: string,
      valueName: string,
      otherValue?: string
    ) => {
      setSelectedProperties((prev) => ({
        ...prev,
        [propertyId]: {
          key_name: propertyName,
          value,
          value_name: valueName,
          other_value: otherValue,
        },
      }));
    },
    []
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.entries(selectedProperties).map(
      ([key, { key_name, value, value_name, other_value }]) => ({
        key,
        key_name,
        value,
        value_name,
        other_value: other_value || "",
      })
    );
    setSubmittedData(data);
  };

  const renderLoader = () => (
    <div className="flex justify-center">
      <TailSpin
        visible={true}
        height="30"
        width="30"
        color="#d20653"
        ariaLabel="tail-spin-loading"
        radius={10}
      />
    </div>
  );

  const renderProperties = () => {
    if (loading.properties) return <div className="col-span-4">{renderLoader()}</div>;

    if (properties.length === 0) {
      return (
        <div className="flex justify-center items-center h-10 col-span-4">
          <p>No properties available for this subcategory.</p>
        </div>
      );
    }

    return properties.map((property) => (
      <div key={property.id} className="mb-4">
        <SelectWithSearch
          options={[
            ...property.options.map((option) => ({
              value: option.id.toString(),
              label: option.name,
            })),
            { value: "other", label: "Other" },
          ]}
          value={selectedProperties[property.id]?.value || ""}
          onChange={(value) => {
            const selectedOption = property.options.find(
              (option) => option.id === Number(value)
            );
            handlePropertyChange(
              property.id,
              property.name,
              value,
              selectedOption ? selectedOption.name : "Other"
            );
          }}
          placeholder="Select an option"
          label={property.name}
        />
        {selectedProperties[property.id]?.value === "other" && (
          <input
            type="text"
            placeholder="Enter custom value"
            value={selectedProperties[property.id]?.other_value || ""}
            onChange={(e) =>
              handlePropertyChange(
                property.id,
                property.name,
                "other",
                "Other",
                e.target.value
              )
            }
            className="mt-2 p-2 border rounded-md w-full"
          />
        )}
      </div>
    ));
  };

  return (
    <form onSubmit={handleSubmit} className="mainContainer space-y-4">
      <Card>
        <CardContent>
          {error && (
            <div className="p-2 text-center rounded-md text-red-500 bg-red-100">
              {error}
            </div>
          )}
          <div className="grid md:grid-cols-2 gap-5 items-center">
            {loading.main ? (
              renderLoader()
            ) : (
              <SelectWithSearch
                options={mainCategories.map((category) => ({
                  value: category.id.toString(),
                  label: category.name,
                }))}
                value={selectedMainCategory?.toString() || ""}
                onChange={handleMainCategoryChange}
                placeholder="Select a main category"
                label="Main Category"
              />
            )}
            {selectedMainCategory &&
              (loading.sub ? (
                renderLoader()
              ) : (
                <SelectWithSearch
                  options={subCategories.map((subCategory) => ({
                    value: subCategory.id.toString(),
                    label: subCategory.name,
                  }))}
                  value={selectedSubCategory?.toString() || ""}
                  onChange={handleSubCategoryChange}
                  placeholder="Select a subcategory"
                  label="Subcategory"
                />
              ))}
          </div>

          {selectedSubCategory && (
            <div className="mt-5">
              <div className="grid md:grid-cols-4 grid-cols-2 gap-5 border p-4 rounded-md">
                {renderProperties()}
              </div>
            </div>
          )}

          <Button type="submit" className="mt-5 max-sm:w-full" variant={"main"}>
            Submit
          </Button>
        </CardContent>
      </Card>

      {submittedData.length > 0 && <FormTable data={submittedData} />}
    </form>
  );
};

export default CategoryForm;
