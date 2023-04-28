import * as Yup from "yup";

export const formSchema = Yup.object().shape({
	name: Yup.string().min(2, "name must be at least 2 characters"),
	size: Yup.string().required("Size is require"),
	specialText: Yup.string().required("must have special text"),
});
