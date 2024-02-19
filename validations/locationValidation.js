import yup from "yup"

const locationSchema = yup.object().shape({
    city: yup.string().required().trim().label("City"),
    state: yup.string().required().trim().label("state"),
  
});

export default locationSchema