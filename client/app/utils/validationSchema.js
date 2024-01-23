import * as yup from "yup";

const validationSchema = yup.object().shape({
    description: yup.string().required("Description is required"),
});

export default validationSchema;
