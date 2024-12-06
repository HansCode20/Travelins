import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { isOpen, modalsData, isPost, isLoading } from "../../feature/action";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { transformText } from "../../utils/utils";

const Modals = ({ data, title, urlUpdate }) => {
  const [formData, setFormData] = useState(data || {});
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getLocalStorageToken = localStorage.getItem("token");
  const token = JSON.parse(getLocalStorageToken);

  const isOpens = useSelector((state) => state.feature.isOpen);
  const isPosts = useSelector((state) => state.feature.isPost);
  const bodyData = useSelector((state) => state.feature.CreatedData);

  const filteredData =
    data &&
    Object.entries(data).filter(
      ([key]) =>
        !["category", "id", "updatedAt", "createdAt", "role"].includes(key)
    );

  const filteredBodyData =
    bodyData &&
    Object.entries(bodyData.body).filter(([key]) => key !== "url");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue =
      name === "price" || name === "price_discount" || name === "rating"
        ? parseFloat(value)
        : value;

    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleFileChange = async (e) => {
    const fd = new FormData();
    fd.append("image", e.target.files[0]);

    await fetch(
      "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
      {
        body: fd,
        method: "POST",
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const { name } = e.target;
        setFormData((prevState) => ({
          ...prevState,
          [name]: name === "imageUrl" || name === "profilePictureUrl"
            ? data.url
            : [data.url],
        }));
      });
  };

  const postData = () => {
    axios
      .post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/${urlUpdate}${
          data.id ? `/${data.id}` : ""
        }`,
        formData,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        dispatch(isOpen());
        dispatch(isLoading(true));
      })
      .catch((error) => toast.warning(error.message));
  };

  const postNewItem = () => {
    axios
      .post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/${bodyData.url}`,
        formData,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        dispatch(isOpen());
        dispatch(isLoading(true));
        dispatch(isPost(false));
        dispatch(modalsData(null));
      })
      .catch((error) => toast.error(error.message));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    isPosts ? postNewItem() : postData();
  };

  const onClose = (e) => {
    e.preventDefault();
    dispatch(isPost(false));
    dispatch(modalsData(null));
    dispatch(isOpen());
  };

  const getCategoryId = () => {
    axios
      .get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => setCategories(res.data.data));
  };

  useEffect(() => {
    getCategoryId();
  }, []);

  return (
    <div className={isOpens ? "block" : "hidden"}>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800/70 z-10">
        <div className="z-20 grid h-full overflow-y-auto mx-auto">
          <Toaster position="top-center" richColors />
          <form
            className="bg-gray-800 rounded-md p-4  w-full"
            onSubmit={handleFormSubmit}
          >
            <div className="flex justify-between items-center mt-2">
              <h1 className="text-white font-bold text-2xl">
                {title} {isPosts ? "Post" : "Update"}
              </h1>
              <button
                onClick={onClose}
                className="h-[42px] w-[42px] py-2.5 px-2.5 text-sm font-bold text-black bg-white rounded-full border hover:bg-gray-100 hover:text-blue-700"
              >
                X
              </button>
            </div>
            {(isPosts ? filteredBodyData : filteredData)?.map(
              ([key, value]) => (
                <div className="grid gap-3 mt-2" key={key}>
                  <label className="text-white font-semibold">
                    {transformText(key)}
                  </label>
                  {key === "imageUrl" || key === "imageUrls" ? (
                    <input
                      className="bg-gray-50 border text-gray-900 text-sm rounded-lg p-2.5"
                      onChange={handleFileChange}
                      type="file"
                      name={key}
                      accept="image/*"
                    />
                  ) : key === "categoryId" ? (
                    <select
                      className="bg-gray-50 border text-gray-900 text-sm rounded-lg p-2.5"
                      name="categoryId"
                      onChange={handleInputChange}
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      className="bg-gray-50 border text-gray-900 text-sm rounded-lg p-2.5"
                      name={key}
                      defaultValue={value}
                      onChange={handleInputChange}
                    />
                  )}
                </div>
              )
            )}
            <div className="flex justify-end">
              <button
                type="submit"
                className="mt-4 text-white bg-green-700 hover:bg-green-800 rounded-lg text-sm font-semibold px-5 py-2.5"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modals;
