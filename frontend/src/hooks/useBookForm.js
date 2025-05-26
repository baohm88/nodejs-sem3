import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    originPrice: yup.number()
        .required("Price is required")
        .min(0, "Price must be positive"),
    quantity: yup.number()
        .required("Quantity is required")
        .min(1, "Quantity must be at least 1")
        .integer("Quantity must be a whole number"),
    storeCode: yup.string().required("Store code is required"),
    imageUrl: yup.string().url("Must be a valid URL").nullable()
});

export default function useBookForm(initialValues, onSubmit) {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
        enableReinitialize: true,
    });

    return formik;
}