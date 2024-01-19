import { useEffect, useState, useRef } from "react";
import {
  MultipleFileInput,
  OutlineButton,
  SelectBoxSection,
  TextInput,
} from "../../components";
import { WrapperModals } from "../wrapper_modals";
import { useGetAllCategories, useGetAllSubCategories } from "../../api";
import { useFormik } from "formik";
import * as Yup from "yup";

export const AddEditModal = ({ onClose, onAdd, onEdit, product }) => {
  const [thumbnail, setThumbnail] = useState("");
  const [images, setImages] = useState([]);

  const isEditing = !!product;

  //start ckeditor
  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [editorLoaded, setEditorLoaded] = useState(false);

  const [data, setData] = useState(isEditing ? product.description : "");
  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
  }, []);
  //end ckeditor

  const validationSchema = Yup.object({
    name: Yup.string().trim().required("وارد کردن نام محصول الزامی است"),
    description: Yup.string().trim().required("وارد کردن توضیحات الزامی است"),
    brand: Yup.string().trim().required("وارد کردن برند الزامی است"),
    price: Yup.number()
      .min(0, "قیمت نمی‌تواند منفی باشد")
      .required("وارد کردن قیمت الزامی است"),
    quantity: Yup.number()
      .min(0, "موجودی نمی‌تواند منفی باشد")
      .required("وارد کردن موجودی الزامی است"),
    subcategory: Yup.string().required("وارد کردن زیردسته الزامی است"),
    category: Yup.string().required("وارد کردن دسته بندی الزامی است"),
  });

  const formik = useFormik({
    initialValues: {
      name: isEditing ? product.name : "",
      description: isEditing ? product.description : "",
      subcategory: isEditing ? product.subcategory : "",
      category: isEditing ? product.category : "",
      quantity: isEditing ? product.quantity : "",
      price: isEditing ? product.price : "",
      brand: isEditing ? product.brand : "",
    },
    validationSchema,
    onSubmit: (values) => {
      let form_data = new FormData();
      form_data.append(`name`, values.name);
      form_data.append(`brand`, values.brand);
      form_data.append(`price`, values.price);
      form_data.append(`category`, values.category);
      form_data.append(`subcategory`, values.subcategory);
      form_data.append(`description`, values.description);
      form_data.append(`quantity`, values.quantity);

      if (thumbnail) form_data.append("thumbnail", thumbnail);
      if (images)
        images.forEach((image) => {
          form_data.append("images", image);
        });

      if (isEditing) {
        onEdit(form_data);
      } else {
        onAdd(form_data);
      }

      formik.resetForm();
      onClose();
    },
  });

  const handleImageChange = (event) => {
    const fileList = event.target.files;

    const imagesArray = Array.from(fileList).filter((file) =>
      file.type.startsWith("image/")
    );
    setImages((prev) => [...prev, ...imagesArray]);
  };

  // subCategory and category select box...
  const categoryArray = [...useGetAllCategories()] || [];
  const subCategoryArray = [...useGetAllSubCategories()] || [];
  const subOfCategorySelected = subCategoryArray.filter(
    (sub) => sub.category === formik.values.category
  );

  // download image...
  const URL_BACKEND_IMAGES = "http://localhost:8000/images/products";

  const downloadImages = async (imageUrls) => {
    const filePromises = imageUrls.map(async (imageUrl) => {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        // Create a File object with a unique name
        const fileName = imageUrl.split("/").pop(); // Extract the filename from the URL
        const file = new File([blob], fileName, { type: blob.type });
        return file;
      } catch (error) {
        console.error(`Error downloading image from URL: ${imageUrl}`, error);
        return null; // Handle errors as needed
      }
    });

    const files = await Promise.all(filePromises);
    return files.filter((file) => file !== null); // Remove any null entries (failed downloads)
  };

  useEffect(() => {
    if (isEditing) {
      const imageUrls = product.images?.map(
        (image) => `${URL_BACKEND_IMAGES}/images/${image}`
      );
      downloadImages(imageUrls)
        .then((files) => {
          setImages(files);
        })
        .catch((error) => {
          console.error("Error downloading images:", error);
        });
      const ThumbnailUrl = [
        `${URL_BACKEND_IMAGES}/thumbnails/${product.thumbnail}`,
      ];
      downloadImages(ThumbnailUrl)
        .then((Thumbnail) => {
          setThumbnail(Thumbnail[0]);
        })
        .catch((error) => {
          console.error("Error downloading images:", error);
        });
    }
  }, [isEditing, product]);

  // remove thumbnail from modal
  const handleDeleteThumbnail = () => {
    setThumbnail("");
  };

  // remove image from modal
  const handleDeleteImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  return (
    <WrapperModals>
      <form
        dir="rtl"
        encType="multipart/form-data"
        onSubmit={formik.handleSubmit}
        className="inline-block w-[45rem] px-6 pt-2 pb-3 align-bottom  bg-neutral-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all  sm:align-middle"
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg leading-6 font-bold text-right text-green-500">
            افزودن / ویرایش محصول
          </h3>
          <div
            className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-600 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-col items-center w-11/12 mx-auto">
          <div className="flex justify-between flex-1 w-full gap-3 mb-4">
            <div className="flex flex-col flex-1">
              <MultipleFileInput
                multiple={true}
                label="تصویر کالا"
                name="images"
                id="images"
                filename={images}
                onChange={handleImageChange}
              />
              <div className="flex gap-3 overflow-x-scroll w-[20rem] max-w-[20rem] scrollbar-hide">
                {images.map((image, index) => (
                  <div
                    className="relative w-[65px] min-w-[65px] h-[40px]"
                    key={index}
                  >
                    <svg
                      onClick={() => handleDeleteImage(index)}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-red-600 cursor-pointer absolute -top-2 -right-[6px]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <img
                      src={URL.createObjectURL(image)}
                      alt="product"
                      className="object-cover rounded-full"
                      width={60}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col flex-1">
              <MultipleFileInput
                multiple={false}
                label="تصویر کوچک کالا"
                name="thumbnail"
                id="thumbnail"
                filename={thumbnail}
                onChange={(event) => setThumbnail(event.target.files[0])}
              />
              <div className="flex items-center justify-center">
                {thumbnail && (
                  <div className="relative h-[40px]">
                    <svg
                      onClick={handleDeleteThumbnail}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-red-600 cursor-pointer absolute -top-2 -right-[6px]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <img
                      src={URL.createObjectURL(thumbnail)}
                      alt="thumbnail"
                      className="object-cover rounded-full py-2 h-[50px]"
                      width={60}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between flex-1 w-full gap-3">
            <TextInput
              condition={formik.touched.name && formik.errors.name}
              error={formik.errors.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              label="نام محصول"
              name="name"
              id="name"
              type="text"
              className={`${
                formik.touched.name && formik.errors.name
                  ? "border-red-500 focus:outline-none focus:border-red-500"
                  : "focus:outline-none focus:border-blue-500"
              }`}
            />
            <TextInput
              condition={formik.touched.brand && formik.errors.brand}
              error={formik.errors.brand}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.brand}
              label="برند"
              name="brand"
              id="brand"
              type="text"
              className={`${
                formik.touched.brand && formik.errors.brand
                  ? "border-red-500 focus:outline-none focus:border-red-500"
                  : "focus:outline-none focus:border-blue-500"
              }`}
            />
          </div>

          <div className="flex items-center justify-between flex-1 w-full gap-3">
            <TextInput
              condition={formik.touched.price && formik.errors.price}
              error={formik.errors.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
              label="قیمت محصول"
              name="price"
              id="price"
              type="number"
              className={`${
                formik.touched.price && formik.errors.price
                  ? "border-red-500 focus:outline-none focus:border-red-500"
                  : "focus:outline-none focus:border-blue-500"
              }`}
            />
            <TextInput
              condition={formik.touched.quantity && formik.errors.quantity}
              error={formik.errors.quantity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.quantity}
              label="موجودی"
              name="quantity"
              id="quantity"
              type="number"
              className={`${
                formik.touched.quantity && formik.errors.quantity
                  ? "border-red-500 focus:outline-none focus:border-red-500"
                  : "focus:outline-none focus:border-blue-500"
              }`}
            />
          </div>
          <div className="flex items-center justify-between flex-1 w-full gap-3">
            <SelectBoxSection
              condition={formik.touched.category && formik.errors.category}
              error={formik.errors.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.category}
              name="category"
              id="category"
              defaultOption="دسته بندی را انتخاب کن"
              array={categoryArray}
              label="دسته بندی :"
              className={`${
                formik.touched.category && formik.errors.category
                  ? "border-red-500 focus:outline-none focus:border-red-500"
                  : "focus:outline-none focus:border-blue-500"
              }`}
            />
            <SelectBoxSection
              condition={
                formik.touched.subcategory && formik.errors.subcategory
              }
              error={formik.errors.subcategory}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.subcategory}
              defaultOption="زیردسته را انتخاب کن"
              array={subOfCategorySelected}
              label="زیردسته :"
              name="subcategory"
              id="subcategory"
              className={`${
                formik.touched.subcategory && formik.errors.subcategory
                  ? "border-red-500 focus:outline-none focus:border-red-500"
                  : "focus:outline-none focus:border-blue-500"
              }`}
            />
          </div>

          <div className="mb-5 w-full">
            <label className="block text-orange-300 text-sm font-bold text-right mb-2">
              <div className="flex items-center gap-4">
                توضیحات :
                {formik.touched.description && formik.errors.description && (
                  <div className="text-xs text-red-500">
                    {formik.errors.description}
                  </div>
                )}
              </div>
            </label>

            <div>
              {editorLoaded ? (
                <CKEditor
                  type="text"
                  name="description"
                  editor={ClassicEditor}
                  data={data}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setData(data);
                    formik.setFieldTouched("description");
                    formik.setFieldValue("description", data);
                  }}
                />
              ) : (
                <div>Editor loading</div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <OutlineButton
            bordercolorDark="border-green-700"
            bordercolorLight="border-green-600"
            textcolorDark="text-green-700"
            textcolorLight="text-green-600"
            type="submit"
            className="text-lg"
            onClick={formik.handleSubmit}
          >
            ذخیره
          </OutlineButton>
        </div>
      </form>
    </WrapperModals>
  );
};
